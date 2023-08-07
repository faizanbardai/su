import { TextField } from "@mui/material";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <TextField
        fullWidth
        id="long-url"
        label="Long URL"
        multiline
        maxRows={4}
        minRows={4}
        autoFocus
        helperText="Enter a long URL to shorten"
        margin="dense"
        placeholder="https://www.example.com/very-long-url"
        variant="filled"
      />
    </Container>
  );
}

export default App;
