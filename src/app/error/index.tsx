import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import React, { type ReactNode } from "react";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [state, setState] = React.useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
    errorInfo: null,
  });

  const errorInfoRef = React.useRef<React.ErrorInfo | null>(null);

  // This inner class is only to use componentDidCatch and getDerivedStateFromError
  class InnerErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = state;
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      errorInfoRef.current = errorInfo;
      setState({ hasError: true, error, errorInfo });
      // You can also log the error to an error reporting service here
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="h-screen w-screen flex items-center justify-center bg-background container mx-auto">
            <Alert className="bg-destructive/10 dark:bg-destructive/20 border-none max-w-2xl">
              <AlertCircleIcon className="size-6 !text-destructive" />
              <AlertTitle className="text-destructive font-bold">
                {this.state.error?.name}: {this.state.error?.message}
              </AlertTitle>
              <AlertDescription className="text-destructive font-mono max-h-96 overflow-y-auto bg-background rounded-md p-2">
                {errorInfoRef.current?.componentStack}
              </AlertDescription>
            </Alert>
          </div>
        );
      }
      return this.props.children ?? null;
    }
  }

  return <InnerErrorBoundary>{children}</InnerErrorBoundary>;
}

export default ErrorBoundary;
