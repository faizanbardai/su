import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "@mui/material";
import ShortURL from "./pages/ShortURL";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="md">
        <ShortURL />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
