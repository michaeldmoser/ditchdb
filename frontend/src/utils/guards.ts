/**
 * Guard function to check if an error is a isDjangoError
 */
export function isDjangoError(error: any): error is DjangoError {
  return error && error.isAxiosError;
}

export function isNotFound(error: any) {
  return error.response?.status === 404;
}

export function isString(value: any): value is string {
  return typeof value === "string";
}

export function assertIsString(value: any): asserts value is string {
  assert(
    isString(value),
    "value must be a string but was passed a " + typeof value,
  );
}
