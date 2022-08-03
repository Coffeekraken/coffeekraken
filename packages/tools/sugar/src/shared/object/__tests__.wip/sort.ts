module.exports = (__sort) => {
    describe('sugar.shared.object.sort', () => {
        it('Should sort the object correctly', (done) => {
            const res = __sort(
                {
                    coco: { weight: 10 },
                    lolo: { weight: 2 },
                    plop: { weight: 5 },
                },
                (a, b) => {
                    return a.weight - b.weight;
                },
            );

            expect(res).toEqual({
                lolo: { weight: 2 },
                plop: { weight: 5 },
                coco: { weight: 10 },
            });

            done();
        });
    });
};
