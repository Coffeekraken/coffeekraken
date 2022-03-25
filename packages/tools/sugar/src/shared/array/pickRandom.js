function pickRandom(array) {
  return array[Math.round(Math.random() * (array.length - 1))];
}
export {
  pickRandom as default
};
