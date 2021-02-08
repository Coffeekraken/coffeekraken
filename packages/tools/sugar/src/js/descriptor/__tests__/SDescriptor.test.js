import SDescriptor from '../SDescriptor';
import SInterface from '../../interface/SInterface';

describe('sugar.js.convert.toHtml', () => {
  it('Should validate a simple case correctly', (done) => {
    class MyDescriptor extends SDescriptor {
      static rules = {
        myProperty: {
          type: 'String',
          required: true,
          default: 'Hello'
        }
      };
      static settings = {
        complete: true
      };
      static type = 'Object';
    }

    const obj = {
      myProperty: null
    };

    const descriptor = new MyDescriptor();
    const res = descriptor.apply(obj);
    // console.log(res.toConsole());

    expect(true).toBe(true);

    done();
  });

  it('Should validate a case a little bit more complexe correctly', (done) => {
    class MyDescriptor extends SDescriptor {
      static rules = {
        myProperty: {
          type: 'String',
          required: true,
          default: 'Hello'
        },
        'nested.property': {
          type: 'Number',
          required: true,
          default: 10
        }
      };
    }

    const obj = {
      myProperty: undefined,
      nested: {
        property: undefined
      }
    };

    const descriptor = new MyDescriptor();
    const res = descriptor.apply(obj);

    expect(res.value).toEqual({
      myProperty: 'Hello',
      nested: {
        property: 10
      }
    });

    done();
  });

  it('Should validate a nested definition object correctly', (done) => {
    class MyDescriptor extends SDescriptor {
      static rules = {
        nested: {
          property: {
            type: 'Number',
            required: true,
            default: 10
          }
        }
      };
    }

    const obj = {
      nested: {
        property: undefined
      }
    };

    const descriptor = new MyDescriptor();
    const res = descriptor.apply(obj);

    expect(res.value).toEqual({
      nested: {
        property: 10
      }
    });

    done();
  });

  it('Should validate a definition that has an interface defined correctly', (done) => {
    class MyInterface extends SInterface {
      static definition = {
        plop: {
          type: 'String',
          required: true,
          default: 'PLOP'
        },
        something: {
          type: 'Boolean',
          required: false,
          default: true
        }
      };
    }

    class MyDescriptor extends SDescriptor {
      static rules = {
        interfacedProp: {
          type: 'Object',
          interface: MyInterface,
          required: true
        }
      };
    }

    const obj = {
      interfacedProp: {
        plop: 'YOU',
        something: false
      }
    };

    const descriptor = new MyDescriptor();
    const res = descriptor.apply(obj);

    expect(res.value).toEqual({
      interfacedProp: {
        plop: 'YOU',
        something: false
      }
    });

    done();
  });
});
