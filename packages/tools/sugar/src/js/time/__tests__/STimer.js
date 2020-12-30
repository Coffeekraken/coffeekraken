"use strict";
module.exports = function (__STimer) {
    var doneComplete;
    var tickCount = 0;
    var timer = new __STimer(1000, {
        tickInterval: '100ms'
    })
        .on('tick', function () {
        tickCount++;
    })
        .on('complete', function () {
        doneComplete();
    });
    timer.start();
    it('The timer remaining time has to be around 500', function (done) {
        setTimeout(function () {
            expect(timer.remaining).toBeLessThan(600);
            expect(timer.remaining).toBeGreaterThan(100);
            done();
        }, 500);
    });
    it('The timer has to tick 10 times', function (done) {
        doneComplete = done;
        setTimeout(function () {
            expect(tickCount).toBe(10);
        }, 600);
    });
};
//# sourceMappingURL=STimer.js.map