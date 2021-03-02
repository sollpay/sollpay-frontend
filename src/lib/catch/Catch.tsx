import React from 'react';

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void;
type ErrorHandlingComponent<Props> = (
  props: Props,
  error?: Error,
) => React.ReactNode;

interface ErrorState {
  error?: Error;
}

export function Catch<Props extends unknown>(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler,
): React.ComponentType<Props> {
  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined,
    };

    static getDerivedStateFromError(error: Error) {
      return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render() {
      return component(this.props, this.state.error);
    }
  };
}
