import __glob from 'glob';
import __fs from 'fs';

const files = __glob.sync('packages/*/*/src/**/*.ts');

files.forEach((file) => {
    const jsPath = file.replace(/\.ts$/, '.js');
    if (__fs.existsSync(jsPath)) {
        console.log('JS', jsPath);
        __fs.unlinkSync(jsPath);
    }
});
