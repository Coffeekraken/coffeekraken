module.exports = (__SWatch) => {
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
  const watchObj = new __SWatch(obj);

  let doneAssign,
    doneUpdating,
    doneUpdatingDeep,
    doneDeleting,
    doneAddIntoArray;

  const watchId = watchObj.watch('**', (obj) => {
    if (
      obj.action === 'Object.set' &&
      obj.path === 'coco' &&
      watchObj.coco === 'plop'
    ) {
      doneAssign();
    } else if (obj.path === 'a' && watchObj.a === 'bonjours') {
      doneUpdating();
    } else if (obj.path === 'b.bb' && watchObj.b.bb === 'hola') {
      doneUpdatingDeep();
    } else if (obj.action === 'Object.delete' && !watchObj.b.bb) {
      doneDeleting();
    } else if (obj.action === 'Array.push') {
      expect(watchObj.c.cc.ccc).toEqual(['hello', 'world', 'plop']);
      doneAddIntoArray();
    }
  });

  test('Assign a new value', (done) => {
    doneAssign = done;
    watchObj.coco = 'plop';
  });

  test('Update an existing value', (done) => {
    doneUpdating = done;
    watchObj.a = 'bonjours';
  });

  test('Update an existing deep value', (done) => {
    doneUpdatingDeep = done;
    watchObj.b.bb = 'hola';
  });

  test('Deleting a deep value', (done) => {
    doneDeleting = done;
    delete watchObj.b.bb;
  });

  test('Adding a value into an array using push', (done) => {
    doneAddIntoArray = done;
    watchObj.c.cc.ccc.push('plop');
  });
};
