import { BrowserRouter } from "react-router";
import AllRoutes from "./routes";
import ThemeProvider from "./contexts/ThemeContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { ProjectProvider } from "./contexts/ProjectContext";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster position="top-center" />
        <TooltipProvider>
          <ProjectProvider>
            <AllRoutes />
          </ProjectProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
