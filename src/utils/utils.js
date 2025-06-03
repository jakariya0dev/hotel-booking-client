function getImgUrl(path) {
  console.log(new URL(`../assets/image/${path}`, import.meta.url));

  return new URL(`../assets/image/${path}`, import.meta.url).href;
}

export { getImgUrl };
