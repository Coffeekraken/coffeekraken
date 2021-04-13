import __SView from '../SView';

describe('s-view.blade', () => {
  it('Should compile the passed blade view correctly', async (done) => {
    const view = new __SView('default', {
      view: {
        rootDirs: [`${__dirname}/views`]
      }
    });

    const res = await view.render({});

    console.log(res);

    // const result = await view.render(
    //   'default',
    //   {
    //     title: 'Hello world',
    //     settings: {}
    //   },
    //   {
    //     rootDir: __dirname + '/views'
    //   }
    // );

    // expect(result.length).toBe(256);
    done();
  });
});
