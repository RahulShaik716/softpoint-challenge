import React from "react";
import Error from "./Error";
interface ErrorBoundaryProps {
  children: React.ReactNode; // Define the props type for children
}
interface ErrorBoundaryState {
  hasError: boolean; // Track whether there was an error
  errorMessage: string; // Store the error message
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" }; // Initial state
  }

  static getDerivedStateFromError(error: Error) {
    console.log("trigger");
    return { hasError: true, errorMessage: error.message };
  }
  handleClose = () => {
    console.log("close called");
    this.setState({ hasError: false, errorMessage: "" });
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError)
      return (
        <Error
          message={this.state.errorMessage}
          handleClose={() => this.handleClose()}
        />
      );
    return this.props.children;
  }
}
export default ErrorBoundary;
