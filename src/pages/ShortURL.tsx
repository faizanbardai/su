import { useState, ChangeEvent, ClipboardEvent } from "react";
import {
  Alert,
  Container,
  Button,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useMutation } from "react-query";
import { create } from "../services/shortURL";
import isValidURL from "../utils/isValidURL";
import { Document, URL } from "../types";
import URLData from "../components/shortURL/URLData";
import addToHistory from "../utils/addToHistory";
import ShortURLAlert from "../components/common/ShortURLAlert";

function ShortURL() {
  const [longURL, setLongURL] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [shortURLs, setShortURLs] = useState<Document[]>([]);
  const [validURL, setValidURL] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [urlData, setUrlData] = useState<URL>({} as URL);

  const { mutate, isLoading } = useMutation(create, {
    onSuccess: (data) => {
      setShortURLs(data.documents);
      addToHistory(data);
      setUrlData(data.url);
      setError("");
      setAlias("");
    },
    onError: (error: any) => {
      setError(error.response.data.message || error.message);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLongURL(e.target.value);
    const valid = isValidURL(e.target.value);
    setValidURL(valid);
  };

  const handleSubmit = () => {
    const valid = isValidURL(longURL);
    setValidURL(valid);
    if (valid) {
      mutate({ longURL: longURL, alias });
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("Text");
    const valid = isValidURL(text);
    if (valid) {
      mutate({ longURL: text, alias });
    }
  };

  const handleChangeAlias = (e: ChangeEvent<HTMLInputElement>) => {
    // replace all non-alphanumeric characters with dash (-)
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "-");
    setAlias(e.target.value);
  };

  const handleUpdateAlias = (originalURL: string, alias: string) => {
    mutate({ longURL: originalURL, alias });
  };

  const showData = () => {
    return (
      <>
        {urlData?.host && <URLData urlData={urlData} />}
        <TextField
          fullWidth
          id="alias"
          margin="dense"
          label="Add Custom Alias"
          value={alias}
          onChange={handleChangeAlias}
          helperText="Only alphanumeric characters and dash (-) are allowed"
          InputProps={{
            endAdornment: (
              <Button
                variant="text"
                onClick={() =>
                  handleUpdateAlias(shortURLs[0].originalURL, alias)
                }
                disabled={!alias}
              >
                Send
              </Button>
            ),
          }}
        />
        {shortURLs.map((urlDocument) => (
          <ShortURLAlert url={urlDocument} key={urlDocument._id} />
        ))}
      </>
    );
  };

  return (
    <Container maxWidth="sm">
      {shortURLs.length > 0 ? (
        showData()
      ) : (
        <TextField
          fullWidth
          id="long-url"
          label="Long URL"
          multiline
          maxRows={4}
          minRows={4}
          autoFocus
          margin="dense"
          placeholder="https://www.example.com/very-long-url"
          variant="standard"
          value={longURL}
          onPaste={handlePaste}
          onChange={handleChange}
          error={!validURL}
          InputProps={{
            endAdornment: (
              <Button
                variant="text"
                onClick={handleSubmit}
                disabled={!validURL}
              >
                Send
              </Button>
            ),
          }}
        />
      )}

      {isLoading && <LinearProgress />}
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}

export default ShortURL;
