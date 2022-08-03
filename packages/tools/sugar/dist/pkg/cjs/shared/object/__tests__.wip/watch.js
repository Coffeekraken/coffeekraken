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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDM0IsSUFBSSxHQUFHLEdBQUc7UUFDUixDQUFDLEVBQUUsT0FBTztRQUNWLENBQUMsRUFBRTtZQUNELEVBQUUsRUFBRSxPQUFPO1NBQ1o7UUFDRCxJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLEtBQUs7YUFDYjtTQUNGO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsRUFBRSxFQUFFO2dCQUNGLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDeEI7U0FDRjtLQUNGLENBQUM7SUFFRixJQUFJLFVBQVUsRUFDWixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGVBQWUsQ0FBQztJQUVsQixJQUFJLDZCQUE2QixHQUFHLEtBQUssQ0FBQztJQUUxQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNuQyxVQUFVLEVBQUUsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM5QixJQUFJLFVBQVUsQ0FBQyxDQUFDLEtBQUssVUFBVTtZQUFFLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNqQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLE1BQU07WUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDckMsZUFBZSxFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxVQUFVLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3RDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLGdCQUFnQixFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDSCxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ25DLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQy9CLDZCQUE2QixHQUFHLElBQUksQ0FBQztTQUN0QztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0dBQWdHO0lBRWhHLG1FQUFtRTtJQUVuRSxxRUFBcUU7SUFFckUsc0VBQXNFO0lBQ3RFLCtDQUErQztJQUMvQyx3RUFBd0U7SUFDeEUsMENBQTBDO0lBQzFDLElBQUk7SUFDSixNQUFNO0lBRU4sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbEMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM3QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHlDQUF5QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDdkQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMscUVBQXFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuRixlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsNEVBQTRFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxRixjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN6QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=