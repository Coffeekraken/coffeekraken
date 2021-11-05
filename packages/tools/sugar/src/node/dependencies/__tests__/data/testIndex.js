import __dirname from '../../../fs/dirname';

export function dependencies() {
    return {
        files: [`${__dirname()}/image2.png`],
        data: {
            hello: 'world',
        },
    };
}

export default function () {
    console.log('hello world');
}
