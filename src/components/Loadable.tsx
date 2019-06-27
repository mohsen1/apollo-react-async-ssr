import React from "react";
import ReactLoadable from "react-loadable";
import loadable from "@loadable/component";

/**
 * Error boundary component
 */
class ErrorBoundary extends React.Component<
  { onError: (error: Error) => void },
  { error?: Error }
> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError(error);
  }

  render() {
    if (this.state.error) {
      return null;
    }

    return this.props.children;
  }
}

/**
 * react-loadable compatibility layer
 */
export default function Loadable<
  Props,
  Exports extends React.FunctionComponent<Props>
>(
  options: ReactLoadable.Options<Props, Exports>
): React.ComponentType<Props> & ReactLoadable.LoadableComponent {
  /**
   * General component for handling errors and loading state
   */
  const Fallback: React.FC<ReactLoadable.LoadingComponentProps> = props => {
    if (options.loading) {
      return React.createElement(options.loading, props);
    }
    return null;
  };

  /**
   * Component we return
   */
  class InnerLoadable extends React.Component<
    Props & ReactLoadable.LoadableComponent,
    { error?: Error }
  > {
    static preload() {
      // not implemented
    }

    onError = error => {
      this.setState({ error });
    };

    retry = () => {
      this.setState({ error: undefined }, () => this.forceUpdate());
    };

    render() {
      const { error } = this.state;
      if (error) {
        return (
          <Fallback
            error={error}
            isLoading={false}
            timedOut={false}
            pastDelay={false}
            retry={this.retry}
          />
        );
      }
      return (
        <ErrorBoundary onError={this.onError}>
          {React.createElement(
            loadable(options.loader, {
              fallback: (
                <Fallback
                  isLoading
                  timedOut={false}
                  pastDelay={false}
                  retry={this.retry}
                  error={undefined}
                />
              )
            })
          )}
        </ErrorBoundary>
      );
    }
  }

  return InnerLoadable;
}
