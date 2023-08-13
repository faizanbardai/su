import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ShortURL from "./pages/ShortURL";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import History from "./pages/History";

function App() {
  const queryClient = new QueryClient();

  return (
    <HashRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <Container maxWidth="md">
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
