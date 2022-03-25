function isTerminal() {
  if (process && process.stdout && process.stdout.isTTY)
    return true;
  return false;
}
export {
  isTerminal as default
};
