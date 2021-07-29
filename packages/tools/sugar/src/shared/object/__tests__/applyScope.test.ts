import __applyScope from '../applyScope';

describe('sugar.shared.object.applyScope', () => {
  it('Should apply a simple scope correctly', (done) => {
    
    const myObj = {
        myValue: 'Hello',
        'env:dev': {
            myValue: 'World'
        },
        'something:cool': {
            plop: 'yop'
        }
    };

    const applied = __applyScope(myObj, {
        env: 'dev'
    });
    const notApplied = __applyScope(myObj, {
        env: 'prod'
    });

    expect(applied).toEqual({
        myValue: 'World'
    });
    expect(notApplied).toEqual({
        myValue: 'Hello'
    });

    done();
  });

  it('Should apply a simple scope on a nested object correctly', (done) => {
    
    const myObj = {
        myValue: 'Hello',
        'env:dev': {
            myValue: 'World',
            else: 'coco',
            'env:prod': {
                else: 'else'
            }
        },
        'something:cool': {
            plop: 'yop'
        }
    };

    const applied = __applyScope(myObj, {
        env: ['dev','prod']
    });

    const notApplied = __applyScope(myObj, {
        env: 'prod',
        something: '*'
    });

    expect(applied).toEqual({
        myValue: 'World',
        else: 'else'
    });
    expect(notApplied).toEqual({
        myValue: 'Hello',
        plop: 'yop'
    });

    done();
  });

});
