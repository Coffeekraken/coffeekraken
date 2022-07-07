import __fs from 'fs';
import __glob from 'glob';

const files = __glob.sync('packages/*/*/src/**/*.test.js', {
    exclude: ['**/node_modules/**'],
});

files.forEach((file) => {
    __fs.renameSync(file, file.replace('.test.js', '.test.review.js'));
});
