"use strict";
module.exports = function (__env) {
    describe('sugar.js.dev.env', function () {
        it('Should get the environment variable correctly', function () {
            expect(__env('node_env')).toBe('test');
        });
        it('Should set the environment variable "youhou" correctly', function () {
            expect(__env('youhou', 'Hello world')).toBe('Hello world');
        });
        it('Should delete the environment variable "youhou" correctly', function () {
            expect(__env('youhou', null)).toBe(undefined);
        });
    });
};
//# sourceMappingURL=env.js.map