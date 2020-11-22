module.exports = (__SWatch) => {
  let obj = {
    a: 'hello',
    b: {
      bb: 'world'
    },
    glob: {
      something: {
        cool: 'Hello',
        other: 'Yop'
      }
    },
    c: {
      cc: {
        ccc: ['hello', 'world']
      }
    }
  };

  let doneAssign,
    doneUpdating,
    doneUpdatingDeep,
    doneDeleting,
    doneAddIntoArray,
    doneGlobAction,
    doneGlobPattern;

  let hasUnwatchedObjectBeenWatched = false;

  const watchedObj = new __SWatch(obj);

  watchedObj.on('coco:set', (update) => {
    doneAssign();
  });
  watchedObj.on('a:*', (update) => {
    if (watchedObj.a === 'bonjours') doneUpdating();
  });
  watchedObj.on('b.bb:*', (update) => {
    if (watchedObj.b.bb === 'hola') doneUpdatingDeep();
  });
  watchedObj.on('*:delete', (update) => {
    if (!update.target) doneDeleting();
  });
  watchedObj.on('*.cool:*', (update) => {
    doneGlobPattern();
  });
  watchedObj.on('*.other:set', (update) => {
    doneGlobAction();
  });
  watchedObj.on('*:push', (update) => {
    expect(watchedObj.c.cc.ccc).toEqual(['hello', 'world', 'plop']);
    doneAddIntoArray();
  });
  watchedObj.on('b.plop:*', (update) => {
    if (watchedObj.b.plop === 'yop') {
      hasUnwatchedObjectBeenWatched = true;
    }
  });

  test('Assign a new value', (done) => {
    doneAssign = done;
    watchedObj.coco = 'plop';
  });

  test('Update an existing value', (done) => {
    doneUpdating = done;
    watchedObj.a = 'bonjours';
  });

  test('Update an existing deep value', (done) => {
    doneUpdatingDeep = done;
    watchedObj.b.bb = 'hola';
  });

  test('Deleting a deep value', (done) => {
    doneDeleting = done;
    delete watchedObj.b.bb;
  });

  test('Adding a value into an array using push', (done) => {
    doneAddIntoArray = done;
    watchedObj.c.cc.ccc.push('plop');
  });

  test('Adding a value to a deep variable to trigger the corresponding glob', (done) => {
    doneGlobPattern = done;
    watchedObj.glob.something.cool = 'hola';
  });

  test('Adding a value to a deep variable to trigger the corresponding glob action', (done) => {
    doneGlobAction = done;
    watchedObj.glob.something.other = 'plop';
  });

  test('Unwatch the watchedObject', (done) => {
    const obj = watchedObj.unwatch();
    obj.b.plop = 'yop';
    setTimeout(() => {
      expect(hasUnwatchedObjectBeenWatched).toBe(false);
      done();
    });
  });
};
