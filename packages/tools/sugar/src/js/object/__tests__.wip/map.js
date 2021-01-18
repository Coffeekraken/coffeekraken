"use strict";
module.exports = function (__map) {
    describe('sugar.js.object.map', function () {
        it('Should be processed correctly using the map function', function (done) {
            var obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou'
                },
                plop: {
                    array: [0, 1, 2]
                }
            };
            expect(__map(obj1, function (value, prop) {
                return prop === 'plop' ? 'yeah' : value;
            })).toEqual({
                hello: {
                    world: 'hello world',
                    plop: 'youhou'
                },
                plop: 'yeah'
            });
            done();
        });
    });
};
//# sourceMappingURL=map.js.map