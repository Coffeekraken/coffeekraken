"use strict";
module.exports = function (__SActionsStream) {
    describe('sugar.js.stream.SActionsStream', function () {
        var stepsCalled = 0, action1StepCalled = 0, startCalled = 0, errorCalled = 0;
        var stream = new __SActionsStream({
            action1: function (settings) {
                if (settings === void 0) { settings = {}; }
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        settings.action1 = 'hello';
                        resolve(settings);
                    }, 1000);
                });
            },
            action2: function (settings) {
                if (settings === void 0) { settings = {}; }
                return new Promise(function (resolve, reject) {
                    settings.action2 = 'world';
                    setTimeout(function () {
                        resolve(settings);
                    }, 300);
                });
            }
        });
        stream.on('step', function (streamObj) {
            stepsCalled++;
        });
        stream.on('action1.step', function (res) {
            action1StepCalled++;
        });
        stream.on('start', function (r) {
            startCalled++;
        });
        stream.on('error', function (r) {
            errorCalled++;
        });
        it('Should run the actions stream correctly', function (done) {
            var streamPromise = stream
                .start({
                something: 'yopyop'
            })
                .on('cancel,finally', function (result) {
                expect(stepsCalled).toBe(2);
                expect(action1StepCalled).toBe(1);
                expect(startCalled).toBe(2);
                expect(errorCalled).toBe(0);
                expect(Object.keys(result.actions).length).toBe(2);
                expect(typeof result.actions.action1.start).toBe('number');
                expect(typeof result.actions.action1.end).toBe('number');
                expect(typeof result.actions.action1.duration).toBe('number');
                expect(Array.isArray(result.actions.action1.streamObjArray)).toBe(true);
                expect(typeof result.actions.action1.action).toBe('string');
                expect(typeof result.start).toBe('number');
                expect(typeof result.end).toBe('number');
                expect(typeof result.duration).toBe('number');
                expect(result.streamObjArray[0].something).toBe('yopyop');
                expect(result.streamObjArray[0].action1).toBe('hello');
                expect(result.streamObjArray[0].action2).toBe('world');
                done();
            });
        });
    });
};
//# sourceMappingURL=SActionsStream.js.map