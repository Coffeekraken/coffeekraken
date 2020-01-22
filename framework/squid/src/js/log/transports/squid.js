export default (message, type = 'info') => {
  return new Promise((resolve, reject) => {

    console.error(message);

    resolve();

  });
}
