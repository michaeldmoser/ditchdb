import { useEffect, useState } from "react";
import { isDjangoError, isNotFound } from "@/utils/guards";
import { UseQueryResult } from "@tanstack/react-query";

/**
 * Display and error message from react-query if one exists, otherwise display the content when loading is completed, otherwise display a loading message.
 * @param children The content to display when loading is completed. This must be a render function.
 * @param error The error from react-query
 * @param isLoading The loading state from react-query
 * @param data The data from react-query
 * @param ErrorComponent A component to display when an error occurs. This must be a render function.
 */
export function ContentLoading<Tdata = any, Terror = DjangoError>(
  { error, children, isLoading, data, errorComponent, notFoundComponent }:
    & UseQueryResult<Tdata, Terror>
    & {
      children: (data: Tdata) => React.ReactNode;
      errorComponent?: (error: Terror) => React.ReactNode;
      notFoundComponent?: (error: Terror) => React.ReactNode;
    },
) {
  const displayLoader = useDelayDisplayLoader(isLoading);

  if (error) {
    return (
      <DisplayError
        error={error}
        errorComponent={errorComponent}
        notFoundComponent={notFoundComponent}
      />
    );
  }

  if (displayLoader) {
    return <Loading />;
  }

  if (!data) return null;

  return <>{children(data)}</>;
}

export function Loading() {
  return (
    <div className="flex animate-pulse">
      <div className="ml-4 mt-2 w-full">
        <h3
          className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
          style={{ width: "40%" }}
        >
        </h3>

        <ul className="mt-5 space-y-3">
          <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
          </li>
          <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
          </li>
          <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
          </li>
          <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
          </li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Display a loading message after a delay.
 */
function useDelayDisplayLoader(isLoading: boolean) {
  const [displayLoader, setDisplayLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setDisplayLoader(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
    setDisplayLoader(false);
  }, [isLoading]);

  return displayLoader && isLoading;
}

/**
 * Display a a notFoundComponent if the error is a 404, otherwise display the errorComponent if it exists, otherwise display the error message.
 *
 * @param error The error from react-query
 * @param errorComponent A component to display when an error occurs. This must be a render function.
 * @param notFoundComponent A component to display when a 404 occurs. This must be a render function.
 */
function DisplayError<Terror>(
  { error, errorComponent, notFoundComponent }:
    & { error: Terror }
    & {
      errorComponent?: (error: Terror) => React.ReactNode;
      notFoundComponent?: (error: Terror) => React.ReactNode;
    },
) {
  if (isDjangoError(error) && isNotFound(error)) {
    return (
      <>{notFoundComponent ? notFoundComponent(error) : <div>Not Found</div>}</>
    );
  }

  if (isDjangoError(error)) {
    return (
      <>{errorComponent ? errorComponent(error) : <div>{error.message}</div>}</>
    );
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  throw new Error("Unhandled error");
}
