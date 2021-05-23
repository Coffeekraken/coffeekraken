import __fs from 'fs';
import { format } from 'prettier';

describe('prettier-plugin-riotjs', () => {
  it('Should format a simple file correctly', (done) => {
    const code = __fs.readFileSync(
      `${__dirname}/samples/default/test.riot`,
      'utf8'
    );
    const actualOutput = format(code, {
      parser: 'riot' as any,
      plugins: [`${__dirname}/../../`],
      tabWidth: 4
      //   ...options
    });

    done();
  });
});
