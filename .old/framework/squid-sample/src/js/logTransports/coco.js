export default (message, type = 'info') => {
  return new Promise((resolve, reject) => {

    console.warn('coco', message);

    resolve();

  });
}
