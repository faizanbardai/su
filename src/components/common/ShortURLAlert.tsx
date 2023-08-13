import { Alert, Button } from "@mui/material";
import { Document } from "../../types";

const ShortURLAlert = (props: { url: Document }) => {
  const { url } = props;

  const handleCopy = (shortURL: string) => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_BACKEND_URL}${shortURL}`
    );
  };
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

export default ShortURLAlert;
