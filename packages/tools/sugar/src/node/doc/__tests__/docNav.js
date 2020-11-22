"use strict";
module.exports = (__docNav) => {
    describe('sugar.node.doc.docNav', () => {
        it('Should generate correctly an SNav instance using the generated docMap.json file', async (done) => {
            const docNav = __docNav(`${__dirname}/doc/docMap.json`);
            done();
        });
    });
};
