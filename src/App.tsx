import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "@mui/material";
import ShortURL from "./pages/shortURL";

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
