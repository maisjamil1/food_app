import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Pages from "./pages";
import Header from "./components/layoutComponents/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/layoutComponents/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Header />
          <Pages />
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
