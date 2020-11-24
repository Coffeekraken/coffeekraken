"use strict";
module.exports = (__request) => {
    if (process.env.GITHUB_WORKFLOW !== undefined) {
        test('Bypass these tests cause we are in Github actions env', (done) => {
            done();
        });
        return;
    }
    test('Making simple ajax request', async (done) => {
        try {
            const response = await __request({
                url: 'http://dummy.restapiexample.com/api/v1/employees',
                method: 'get'
            });
            expect(response.status).toBe(200);
            done();
        }
        catch (e) {
            done(e);
        }
    });
    test('Making an ajax request with multiple send count', async (done) => {
        try {
            const response = await __request({
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
    });
};
