"use strict";
module.exports = function (__SWatch) {
    var obj = {
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
    var doneAssign, doneUpdating, doneUpdatingDeep, doneDeleting, doneAddIntoArray, doneGlobAction, doneGlobPattern;
    var hasUnwatchedObjectBeenWatched = false;
    var watchedObj = new __SWatch(obj);
    watchedObj.on('coco:set', function (update) {
        doneAssign();
    });
    watchedObj.on('a:*', function (update) {
        if (watchedObj.a === 'bonjours')
            doneUpdating();
    });
    watchedObj.on('b.bb:*', function (update) {
        if (watchedObj.b.bb === 'hola')
            doneUpdatingDeep();
    });
    watchedObj.on('*:delete', function (update) {
        if (!update.target)
            doneDeleting();
    });
    watchedObj.on('*.cool:*', function (update) {
        doneGlobPattern();
    });
    watchedObj.on('*.other:set', function (update) {
        doneGlobAction();
    });
    watchedObj.on('*:push', function (update) {
        expect(watchedObj.c.cc.ccc).toEqual(['hello', 'world', 'plop']);
        doneAddIntoArray();
    });
    watchedObj.on('b.plop:*', function (update) {
        if (watchedObj.b.plop === 'yop') {
            hasUnwatchedObjectBeenWatched = true;
        }
    });
    test('Assign a new value', function (done) {
        doneAssign = done;
        watchedObj.coco = 'plop';
    });
    test('Update an existing value', function (done) {
        doneUpdating = done;
        watchedObj.a = 'bonjours';
    });
    test('Update an existing deep value', function (done) {
        doneUpdatingDeep = done;
        watchedObj.b.bb = 'hola';
    });
    test('Deleting a deep value', function (done) {
        doneDeleting = done;
        delete watchedObj.b.bb;
    });
    test('Adding a value into an array using push', function (done) {
        doneAddIntoArray = done;
        watchedObj.c.cc.ccc.push('plop');
    });
    test('Adding a value to a deep variable to trigger the corresponding glob', function (done) {
        doneGlobPattern = done;
        watchedObj.glob.something.cool = 'hola';
    });
    test('Adding a value to a deep variable to trigger the corresponding glob action', function (done) {
        doneGlobAction = done;
        watchedObj.glob.something.other = 'plop';
    });
    test('Unwatch the watchedObject', function (done) {
        var obj = watchedObj.unwatch();
        obj.b.plop = 'yop';
        setTimeout(function () {
            expect(hasUnwatchedObjectBeenWatched).toBe(false);
            done();
        });
    });
};
//# sourceMappingURL=SWatch.js.map