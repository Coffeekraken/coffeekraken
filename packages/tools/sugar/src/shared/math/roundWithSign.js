function roundWithSign(number) {
  return Math.sign(number) * Math.round(Math.abs(number));
}
export {
  roundWithSign as default
};
