import { BrowserRouter } from "react-router";
import AllRoutes from "./routes";
import ThemeProvider from "./contexts/ThemeContext";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <AllRoutes />
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
