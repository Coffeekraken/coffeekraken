"use strict";
module.exports = (__watch) => {
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
    let doneAssign, doneUpdating, doneUpdatingDeep, doneDeleting, doneAddIntoArray, doneGlobAction, doneGlobPattern;
    let hasUnwatchedObjectBeenWatched = false;
    const watchedObj = __watch(obj);
    watchedObj.on('coco:set', (update) => {
        doneAssign();
    });
    watchedObj.on('a:*', (update) => {
        if (watchedObj.a === 'bonjours')
            doneUpdating();
    });
    watchedObj.on('b.bb:*', (update) => {
        if (watchedObj.b.bb === 'hola')
            doneUpdatingDeep();
    });
    watchedObj.on('*:delete', (update) => {
        if (!update.target)
            doneDeleting();
    });
    watchedObj.on('*.cool:set', (update) => {
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
    // if (update.action === 'Object.set' && update.path === 'coco' && watchedObj.coco === 'plop') {
    // } else if (update.path === 'a' && watchedObj.a === 'bonjours') {
    // } else if (update.path === 'b.bb' && watchedObj.b.bb === 'hola') {
    // } else if (update.action === 'Object.delete' && !watchedObj.b.bb) {
    // } else if (update.action === 'Array.push') {
    // } else if (update.path === 'b.plop' && watchedObj.b.plop === 'yop') {
    //   hasUnwatchedObjectBeenWatched = true;
    // }
    // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzNCLElBQUksR0FBRyxHQUFHO1FBQ1IsQ0FBQyxFQUFFLE9BQU87UUFDVixDQUFDLEVBQUU7WUFDRCxFQUFFLEVBQUUsT0FBTztTQUNaO1FBQ0QsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxLQUFLO2FBQ2I7U0FDRjtRQUNELENBQUMsRUFBRTtZQUNELEVBQUUsRUFBRTtnQkFDRixHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQ3hCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsSUFBSSxVQUFVLEVBQ1osWUFBWSxFQUNaLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxlQUFlLENBQUM7SUFFbEIsSUFBSSw2QkFBNkIsR0FBRyxLQUFLLENBQUM7SUFFMUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDbkMsVUFBVSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxVQUFVLENBQUMsQ0FBQyxLQUFLLFVBQVU7WUFBRSxZQUFZLEVBQUUsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDakMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxNQUFNO1lBQUUsZ0JBQWdC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