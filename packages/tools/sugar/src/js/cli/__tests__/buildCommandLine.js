(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    module.exports = function (__buildCommandLine) {
        describe('sugar.js.cli.buildCommandLine', function () {
            it('Should build the command line correctly', function (done) {
                var command = __buildCommandLine('php [hostname]:[port] [rootDir] [arguments]', {
                    hostname: {
                        type: 'String',
                        description: 'Server hostname',
                        default: 'localhost'
                    },
                    port: {
                        type: 'Number',
                        description: 'Server port',
                        default: 8080
                    },
                    rootDir: {
                        type: 'String',
                        description: 'Root directory',
                        default: '.'
                    },
                    arg1: {
                        type: 'Boolean',
                        alias: 'a',
                        description: 'Argument 1',
                        default: true
                    }
                }, {
                    port: 8888
                });
                expect(command).toBe('php localhost:8888 . -a');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map