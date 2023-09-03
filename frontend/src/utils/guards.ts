/**
 * Guard function to check if an error is a isDjangoError
 */
export function isDjangoError(error: any): error is DjangoError {
  return error && error.isAxiosError;
}

export function isNotFound(error: any) {
  return error.response?.status === 404;
}
