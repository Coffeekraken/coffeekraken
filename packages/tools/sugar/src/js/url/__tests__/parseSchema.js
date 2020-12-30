"use strict";
module.exports = function (__parseSchema) {
    describe('sugar.js.url.parseSchema', function () {
        it('Should correctly parse the passed url using the passed schema', function () {
            var res = __parseSchema('https://github.com/myApp/master/3', '{project:string}/{?branch:string}/{?idx:number}');
            expect(res).toEqual({
                match: true,
                errors: null,
                params: {
                    project: {
                        optional: false,
                        raw: '{project:string}',
                        type: 'string',
                        value: 'myApp'
                    },
                    branch: {
                        optional: true,
                        raw: '{?branch:string}',
                        type: 'string',
                        value: 'master'
                    },
                    idx: {
                        optional: true,
                        raw: '{?idx:number}',
                        type: 'number',
                        value: 3
                    }
                },
                schema: '{project:string}/{?branch:string}/{?idx:number}',
                url: 'https://github.com/myApp/master/3'
            });
        });
    });
};
//# sourceMappingURL=parseSchema.js.map