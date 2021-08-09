export const checkIfImage = (string) => {
  return /^https?:\/\/([^/]+)\.s3\.amazonaws\.com\/(.+)$/.test(string);
};
