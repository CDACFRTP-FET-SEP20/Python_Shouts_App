import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }
  render() {
    const hasError = !!this.state.error;
    return hasError ? (
      <h1>{this.state.error.message} This the Error Message</h1>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
