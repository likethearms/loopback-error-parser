export const getErrorMessage = (error: any) => {
  let errorMessage = error.message;
  const res = error.response;
  if (res && typeof res.data !== 'string' && res.data.error.message)
    errorMessage = res.data.error.message;
  return errorMessage;
};
