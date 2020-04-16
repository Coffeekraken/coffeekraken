"use strict";

module.exports = __watch => {
  let obj = {
    a: 'hello',
    b: {
      bb: 'world'
    },
    c: {
      cc: {
        ccc: ['hello', 'world']
      }
    }
  };
  let doneAssign, doneUpdating, doneUpdatingDeep, doneDeleting, doneAddIntoArray;
  let hasUnwatchedObjectBeenWatched = false;

  const watchedObj = __watch(obj, '**', update => {
    if (update.action === 'Object.set' && update.path === 'coco' && watchedObj.coco === 'plop') {
      doneAssign();
    } else if (update.path === 'a' && watchedObj.a === 'bonjours') {
      doneUpdating();
    } else if (update.path === 'b.bb' && watchedObj.b.bb === 'hola') {
      doneUpdatingDeep();
    } else if (update.action === 'Object.delete' && !watchedObj.b.bb) {
      doneDeleting();
    } else if (update.action === 'Array.push') {
      expect(watchedObj.c.cc.ccc).toEqual(['hello', 'world', 'plop']);
      doneAddIntoArray();
    } else if (update.path === 'b.plop' && watchedObj.b.plop === 'yop') {
      hasUnwatchedObjectBeenWatched = true;
    }
  });

  test('Assign a new value', done => {
    doneAssign = done;
    watchedObj.coco = 'plop';
  });
  test('Update an existing value', done => {
    doneUpdating = done;
    watchedObj.a = 'bonjours';
  });
  test('Update an existing deep value', done => {
    doneUpdatingDeep = done;
    watchedObj.b.bb = 'hola';
  });
  test('Deleting a deep value', done => {
    doneDeleting = done;
    delete watchedObj.b.bb;
  });
  test('Adding a value into an array using push', done => {
    doneAddIntoArray = done;
    watchedObj.c.cc.ccc.push('plop');
  });
  test('Unwatch the watchedObject', done => {
    watchedObj.unwatch();
    watchedObj.b.plop = 'yop';
    setTimeout(() => {
      expect(hasUnwatchedObjectBeenWatched).toBe(false);
      done();
    });
  });
};