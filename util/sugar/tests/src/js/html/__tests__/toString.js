module.exports = (__toString) => {

  describe('sugar.js.html.toString', () => {

    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
    document.body.innerHTML = html;

    const $elm = document.querySelector('bold');

    const res = __toString($elm);

    it('Should have transform the dom element to a string correctly', () => {
      expect(res).toBe('<bold>Hello world</bold>');
    });

  });

}