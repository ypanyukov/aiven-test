export const get = (url) => fetch(url).then(response => response.json());
