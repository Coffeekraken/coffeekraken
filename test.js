(async () => {
  const pro = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('yeo');
    }, 2000);
  }).catch((e) => {
    console.log('first');
  });

  pro.catch((e) => {
    console.log('ERROR', e);
  });

  setTimeout(() => {}, 200);

  const res = await pro;
  console.log('res', res);
})();
