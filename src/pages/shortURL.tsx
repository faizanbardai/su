import { useState, ChangeEvent } from "react";
import { Alert, Box, Button, LinearProgress, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { create } from "../services/shortURL";
import isValidURL from "../utils/isValidURL";
import { Document, URL } from "../types";
import URLData from "../components/shortURL/URLData";

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
      setUrlData(data.url);
      setError("");
      setAlias("");
    },
    onError: (error: any) => {
      setError(error.response.data.message || error.message);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongURL(e.target.value);
    const valid = isValidURL(e.target.value);
    setValidURL(valid);
    if (valid) {
      mutate({ longURL: e.target.value, alias });
    }
  };

  const handleCopy = (shortURL: string) => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_BACKEND_URL}${shortURL}`
    );
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

  const ShortURLAlert = (props: { url: Document }) => {
    const { url } = props;
    return (
      <Alert
        key={url._id}
        severity="success"
        sx={{ mb: 1 }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => handleCopy(url.shortURL)}
            disabled={!url}
          >
            COPY
          </Button>
        }
      >
        {url.shortURL}
      </Alert>
    );
  };

  return (
    <Box>
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
          onChange={handleChange}
          error={!validURL}
        />
      )}

      {isLoading && <LinearProgress />}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}

export default ShortURL;
