import __parseArgs from '../parseArgs';

describe('sugar.shared.cli.parseArgs', () => {
  // it('Should parse a simple string correctly', () => {
  //   const res = __parseArgs('--something cool -e true');
  //   expect(res).toEqual({
  //     something: 'cool',
  //     e: true
  //   });
  // });

  // it('Should parse a simple string with a none ending argument correctly', () => {
  //   const res = __parseArgs('--something cool -e');
  //   expect(res).toEqual({
  //     something: 'cool',
  //     e: true
  //   });
  // });

  // it('Should parse a simple string with multiple none value arguments one after the other', () => {
  //   const res = __parseArgs('--something cool -e --plop -i');
  //   expect(res).toEqual({
  //     something: 'cool',
  //     e: true,
  //     plop: true,
  //     i: true
  //   });
  // });

  // it('Should parse correctly an object value passed in the string using the valueQuote setting "', () => {
  //   const res = __parseArgs(
  //     `-o "{'hello': 'world', '__plop': true}" --something World`,
  //     {
  //       valueQuote: '"'
  //     }
  //   );
  //   expect(res).toEqual({
  //     o: {
  //       hello: 'world',
  //       __plop: true
  //     },
  //     something: 'World'
  //   });
  // });

  // it("Should parse correctly an object value passed in the string using the valueQuote setting '", () => {
  //   const res = __parseArgs(
  //     `-o '{"hello": "world", "__plop": true}' --something World`,
  //     {
  //       valueQuote: "'"
  //     }
  //   );
  //   expect(res).toEqual({
  //     o: {
  //       hello: 'world',
  //       __plop: true
  //     },
  //     something: 'World'
  //   });
  // });

  // it('Should parse correctly an object value passed in the string using the valueQuote setting `', () => {
  //   const res = __parseArgs(
  //     "-o `{'hello': 'world', '__plop': true}` --something World",
  //     {
  //       valueQuote: '`'
  //     }
  //   );
  //   expect(res).toEqual({
  //     o: {
  //       hello: 'world',
  //       __plop: true
  //     },
  //     something: 'World'
  //   });
  // });

  it('Should parse correctly an array value passed in the string correctly', () => {
    const res = __parseArgs("-o `['plop', 'coco']` --something World", {
      valueQuote: '`'
    });

    expect(res).toEqual({
      o: ['plop', 'coco'],
      something: 'World'
    });
  });

  it('Should parse correctly a function style arguments with variable names specifies', () => {
    const res = __parseArgs("($coco: true, $plop: 'hello world')", {
      valueQuote: "'"
    });
    expect(res).toEqual({
      coco: true,
      plop: 'hello world'
    });
  });

  it('Should parse correctly a function style arguments with variable names specifies and nested functions calls', () => {
    const res = __parseArgs(
      `(
          $start: default,
          $end: sugar.color(default, --darken 10%),
          $type: var(--s-gradient-type-inline, linear),
          $angle: var(--s-gradient-angle-inline, 45)
      )`,
      {
        // valueQuote: "'"
      }
    );

    expect(res).toEqual({
      start: 'default',
      end: 'sugar.color(default, --darken 10%)',
      type: 'var(--s-gradient-type-inline, linear)',
      angle: 'var(--s-gradient-angle-inline, 45)'
    });
  });
});
