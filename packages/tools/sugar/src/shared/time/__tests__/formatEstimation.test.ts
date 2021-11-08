import __formatEstimation from '../formatEstimation';

describe('sugar.shared.time.formatEstimation', () => {
    it('Should format an estimation under 1s correctly', () => {
        const res = __formatEstimation(600);
        expect(res).toBe('600ms');
    });
    it('Should format an estimation under 1m correctly', () => {
        const res = __formatEstimation(1000 * 25);
        expect(res).toBe('25s');
    });
    it('Should format an estimation under 1m with ms correctly', () => {
        const res = __formatEstimation(1000 * 25 + 345);
        expect(res).toBe('25s 345ms');
    });
    it('Should format an estimation under 1h correctly', () => {
        const res = __formatEstimation(1000 * 60 * 45);
        expect(res).toBe('45m');
    });
    it('Should format an estimation under 1h with some seconds correctly', () => {
        const res = __formatEstimation(1000 * 60 * 45 + 1000 * 35);
        expect(res).toBe('45m 35s');
    });
    it('Should format an estimation above 1h correctly', () => {
        const res = __formatEstimation(1000 * 60 * 60 * 3);
        expect(res).toBe('3h');
    });
    it('Should format an estimation above 1h with some minutes correctly', () => {
        const res = __formatEstimation(1000 * 60 * 60 * 3 + 1000 * 60 * 32);
        expect(res).toBe('3h 32m');
    });
});
