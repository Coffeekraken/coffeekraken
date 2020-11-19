module.exports = (__SUrl) => {

  describe('sugar.js.url.SUrl', () => {

    it('Should build a simple url and parse it', async done => {
      const url = new __SUrl('https://coffeekraken.io:9999/something/cool?item1=hello&item2=world#toMake');
      expect(url.protocol).toBe('https:');
      expect(url.hash).toBe('#toMake');
      expect(url.query).toEqual({
        item1: 'hello',
        item2: 'world'
      });
      expect(url.pathname).toBe('/something/cool');
      expect(url.port).toBe(9999);
      expect(url.hostname).toBe('coffeekraken.io');
      done();
    });


    it('Should nuild a complexe url with a schema and parse it', async done => {
      const url = new __SUrl('https://coffeekraken.io:9999/something/cool/2?item1=hello&item2=world#toMake', {
        schema: '{param1:string}/{param2}/{?param3:number}'
      });
      expect(url.schema.params).toEqual({
        param1: {
          optional: false,
          raw: '{param1:string}',
          type: 'string',
          value: 'something'
        },
        param2: {
          optional: false,
          raw: '{param2}',
          type: null,
          value: 'cool'
        },
        param3: {
          optional: true,
          raw: '{?param3:number}',
          type: 'number',
          value: 2
        }
      });

      url.pathname = 'some/other';
      expect(url.schema.params).toEqual({
        param1: {
          optional: false,
          raw: '{param1:string}',
          type: 'string',
          value: 'some'
        },
        param2: {
          optional: false,
          raw: '{param2}',
          type: null,
          value: 'other'
        },
        param3: {
          optional: true,
          raw: '{?param3:number}',
          type: 'number',
          value: null
        }
      });

      url.pathname = '3/other/3';
      expect(url.schema.params).toEqual({
        param1: {
          error: {
            description: `This param "param1" has to be a "string" but he's a "number"...`,
            type: "type",
            passed: "number",
            requested: "string",
          },
          optional: false,
          raw: '{param1:string}',
          type: 'string',
          value: 3
        },
        param2: {
          optional: false,
          raw: '{param2}',
          type: null,
          value: 'other'
        },
        param3: {
          optional: true,
          raw: '{?param3:number}',
          type: 'number',
          value: 3
        }
      });

      done();
    });

  });

}