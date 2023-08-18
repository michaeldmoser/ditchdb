import { Children, isValidElement, ReactElement } from "react";

/**
 * Returns the first child of a given type.
 */
export function findChild(
  children: ReactElement | ReactElement[],
  searchFor: ReactElement["type"],
) {
  return Children.toArray(children).filter(isValidElement).find(({ type }) =>
    type === searchFor
  );
}
