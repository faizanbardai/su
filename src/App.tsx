import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import ShortURL from "./pages/ShortURL";
import "./app.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import History from "./pages/History";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function App() {
  const queryClient = new QueryClient();

  return (
    <HashRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <Container maxWidth={"sm"} disableGutters>
          <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar variant="dense">
              <Typography component="div" sx={{ flexGrow: 1 }}>
                Shorten URL
              </Typography>
              <Button color="inherit" href="#/">
                <AddCircleOutlineIcon />
              </Button>
              <Button color="inherit" href="#/history">
                <AccessTimeIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<ShortURL />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Container>
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
