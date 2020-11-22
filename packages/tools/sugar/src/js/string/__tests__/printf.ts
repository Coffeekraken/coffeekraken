module.exports = (__printf) => {

  describe('sugar.js.string.printf', () => {

    it('Should process the passed string correctly', done => {

      const res1 = __printf('Hello %s', 'world'); // => Hello world
      const res2 = __printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
      const res4 = __printf('Hello %(first)s, I\'m %(name)s', { first: 'world', name: 'John Doe' }); // Hello world, I'm John Doe


      expect(res1).toBe('Hello world');
      expect(res2).toBe("Hello world, I'm John Doe");
      expect(res4).toBe("Hello world, I'm John Doe");


      done();
    });

  });

}