export const encodeURL = (url: string) =>
  encodeURIComponent(JSON.stringify(url));

export const decodeURL = (url: string) => JSON.parse(decodeURIComponent(url));
