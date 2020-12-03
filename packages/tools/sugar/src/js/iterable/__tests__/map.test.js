const __map = require('../map');
describe('sugar.js.iterable.map', () => {
  it('Should iterate over an Array correctly', (done) => {
    const ar = ['hello', 'world'];
    __map(ar, (key, value) => {
      return `${value} - ${key}`;
    });
    expect(ar).toEqual(['hello - 0', 'world - 1']);
    done();
  });
  it('Should iterate over an Object correctly', (done) => {
    const obj = {
      key1: 'hello',
      key2: 'world'
    };
    __map(obj, (key, value) => {
      return `${value} - ${key}`;
    });
    expect(obj).toEqual({
      key1: 'hello - key1',
      key2: 'world - key2'
    });
    done();
  });
  it('Should iterate over a Map correctly', (done) => {
    const map = new Map();
    map.set('key1', 'hello');
    map.set('key2', 'world');
    __map(map, (key, value) => {
      return `${value} - ${key}`;
    });
    const map1 = new Map();
    map1.set('key1', 'hello - key1');
    map1.set('key2', 'world - key2');
    expect(map).toEqual(map1);
    done();
  });
  it('Should iterate over a Set correctly', (done) => {
    const set = new Set();
    set.add('hello');
    set.add('world');
    const newSet = __map(set, (key, value, i) => {
      return `${value} - ${i}`;
    });
    const setRes = new Set();
    setRes.add('hello - 0');
    setRes.add('world - 1');
    expect(newSet).toEqual(setRes);
    done();
  });
  it('Should iterate over a Number correctly', (done) => {
    const array = __map(2, (key, value, i) => {
      return `${key} - ${value} - ${i}`;
    });
    expect(array).toEqual(['0 - 0 - 0', '1 - 1 - 1']);
    done();
  });
  it('Should iterate over a String correctly', (done) => {
    const string = __map('hello world', (key, value, i) => {
      return `-${value}-`;
    });
    expect(string).toEqual('-h--e--l--l--o-- --w--o--r--l--d-');
    done();
  });
});
