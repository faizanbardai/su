import React from "react";
import { Alert, Button, LinearProgress, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { useState } from "react";
import { create } from "../services/shortURL";
import isValidURL from "../utils/isValidURL";

function ShortURL() {
  const [longURL, setLongURL] = useState<string>("");
  const [shortURL, setShortURL] = useState<string>("");
  const [validURL, setValidURL] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation(create, {
    onSuccess: (data) => {
      setShortURL(data.shortURL);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongURL(e.target.value);
    const valid = isValidURL(e.target.value);
    setValidURL(valid);
    if (valid) {
      mutate(e.target.value);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_BACKEND_URL}${shortURL}`
    );
  };
  return (
    <div>
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
      {shortURL && (
        <Alert
          severity="success"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleCopy}
              disabled={!shortURL}
            >
              COPY
            </Button>
          }
        >
          {shortURL}
        </Alert>
      )}
      {isLoading && <LinearProgress />}
    </div>
  );
}

export default ShortURL;
