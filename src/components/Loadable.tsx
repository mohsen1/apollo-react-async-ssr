import React from "react";
import ReactLoadable from "react-loadable";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { timeout as timedOut, TimeoutError } from "promise-timeout";

/**
 * Error boundary component
 */
class ErrorBoundary extends React.Component<
  { onError: (error: Error) => void },
  { error?: Error }
> {
  public readonly state: { error?: Error } = {};
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
 *
 * The options.loader prop is required, the rest is optional
 */
export default function Loadable<
  Props,
  Exports extends React.FunctionComponent<Props>
>(
  options: Partial<ReactLoadable.Options<Props, Exports>> &
    Pick<ReactLoadable.Options<Props, Exports>, "loader">
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
    public readonly state: { error?: Error } = {};

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
      const { delay = 200, timeout } = options;
      if (error) {
        if (error instanceof TimeoutError) {
          return (
            <Fallback
              error={undefined}
              isLoading={false}
              timedOut={true}
              pastDelay={false}
              retry={this.retry}
            />
          );
        }
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
            loadable(
              timedOut(
                pMinDelay(options.loader, delay === false ? 0 : delay),
                timeout === false ? 0 : timeout
              ),
              {
                fallback: (
                  <Fallback
                    isLoading
                    timedOut={false}
                    pastDelay={false}
                    retry={this.retry}
                    error={undefined}
                  />
                )
              }
            )
          )}
        </ErrorBoundary>
      );
    }
  }

  return InnerLoadable;
}
