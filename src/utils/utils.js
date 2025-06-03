function getImgUrl(path) {
  return new URL(`../assets/image/${path}`, import.meta.url).href;
}

export { getImgUrl };
