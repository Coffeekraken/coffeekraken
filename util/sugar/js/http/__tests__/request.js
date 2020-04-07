"use strict";

module.exports = __request => {
  test('Making simple ajax request', async done => {
    try {
      const response = await __request({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'get'
      });
      expect(response.status).toBe(200);
      done();
    } catch (e) {
      done(e);
    }
  });
  test('Making an ajax request with multiple send count', async done => {
    try {
      const response = await __request({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'get',
        sendCount: 5
      });
      expect(response.length).toBe(5);
      done();
    } catch (e) {
      done(e);
    }
  });
};