async function read() {
  return navigator.clipboard.readText();
}
export {
  read as default
};
