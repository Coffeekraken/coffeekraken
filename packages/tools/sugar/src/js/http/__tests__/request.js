"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = (__request) => {
    if (process.env.GITHUB_WORKFLOW !== undefined) {
        test('Bypass these tests cause we are in Github actions env', (done) => {
            done();
        });
        return;
    }
    test('Making simple ajax request', (done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield __request({
                url: 'http://dummy.restapiexample.com/api/v1/employees',
                method: 'get'
            });
            expect(response.status).toBe(200);
            done();
        }
        catch (e) {
            done(e);
        }
    }));
    test('Making an ajax request with multiple send count', (done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield __request({
                url: 'http://dummy.restapiexample.com/api/v1/employees',
                method: 'get',
                sendCount: 2
            });
            expect(response.length).toBe(2);
            done();
        }
        catch (e) {
            done(e);
        }
    }));
};
