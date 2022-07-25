import __pickRandom from '../pickRandom';

const ar = [
    'hello 1',
    'hello 2',
    'hello 3',
    'hello 4'
]

const obj = {
    plop: true
}
const arObj = [
    obj, obj, obj, obj
];


describe('sugar.shared.array.pickRandom', () => {
    it('Should pick 1 random item correctly', () => {
        const item = __pickRandom(ar, 1);
        expect(item.slice(0,5)).toBe('hello');
    });
    it('Should pick 3 random items correctly', () => {
        const items = __pickRandom(ar, 3);
        expect(items.length).toBe(3);
    });
    it('Should return the complete array if asked items is greater than the array lenght', () => {
        const items = __pickRandom(ar, 10);
        expect(items.length).toBe(4);
    });
    it('Should not fall in an infinite loop if all array items are the same object', () => {
        const items = __pickRandom(arObj, 2);
        expect(items.length).toBe(1);
    });
});