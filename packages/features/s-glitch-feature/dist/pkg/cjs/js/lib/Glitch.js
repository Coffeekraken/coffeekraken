"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const object_1 = require("@coffeekraken/sugar/object");
require("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js");
let windowW = 250;
let windowH = 250;
let _glitch;
class Glitch extends s_promise_1.default {
    constructor(imgPathOrImgElement, $node, settings) {
        super((0, object_1.__deepMerge)({
            minDuration: 100,
            maxDuration: 1000,
            minInterval: 100,
            maxInterval: 2000,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._channelLen = 4;
        this._imgOrigin = null;
        this._copyData = [];
        this._flowLineImgs = [];
        this._shiftLineImgs = [];
        this._shiftRGBs = [];
        this._scatImgs = [];
        this._throughFlag = true;
        this._isLoaded = false;
        this._mustDraw = false;
        this._isStoped = true;
        this._reseted = false;
        this._pixelsA = {};
        if (imgPathOrImgElement instanceof HTMLImageElement) {
            this._imgPath = imgPathOrImgElement.src;
        }
        else {
            this._imgPath = imgPathOrImgElement;
        }
        this._$node = $node;
        const _this = this;
        // @ts-ignore
        new window.p5((p) => {
            p.setup = function () {
                p.loadImage(_this._imgPath, function (img) {
                    _this._$canvas = p.createCanvas(img.width, img.height).canvas;
                    _this._ctx = _this._$canvas.getContext('2d');
                    _this._imgOrigin = img;
                    _this._imgOrigin.loadPixels();
                    _this._copyData = new Uint8ClampedArray(_this._imgOrigin.pixels);
                    _this._isLoaded = true;
                });
            };
            p.draw = function () {
                p.clear();
                p.background(0);
                if (_this._isLoaded) {
                    _this._draw();
                    // _this._ctx.save();
                    // _this._ctx.globalCompositeOperation = 'destination-out';
                    // for (let x = 0; x < _this._imgOrigin.width; x++) {
                    //     for (let y = 0; y < _this._imgOrigin.height; y++) {
                    //         const pixel = _this._ctx.getImageData(x, y, 1, 1);
                    //         if (
                    //             !pixel.data[0] &&
                    //             !pixel.data[1] &&
                    //             !pixel.data[2]
                    //         ) {
                    //             _this._ctx.beginPath();
                    //             _this._ctx.rect(x, y, 1, 1);
                    //             _this._ctx.fill();
                    //             // console.log('remove', pixel);
                    //         }
                    //     }
                    // }
                    // _this._ctx.restore();
                }
            };
            this._p = p;
        }, $node);
        // flow line
        for (let i = 0; i < 1; i++) {
            let o = {
                pixels: null,
                t1: this._p.floor(this._p.random(0, 1000)),
                speed: this._p.floor(this._p.random(4, 24)),
                randX: this._p.floor(this._p.random(24, 80)),
            };
            this._flowLineImgs.push(o);
        }
        // shift line
        for (let i = 0; i < 6; i++) {
            let o = null;
            this._shiftLineImgs.push(o);
        }
        // shift RGB
        for (let i = 0; i < 1; i++) {
            let o = null;
            this._shiftRGBs.push(o);
        }
        // scat imgs
        for (let i = 0; i < 3; i++) {
            let scatImg = {
                img: null,
                x: 0,
                y: 0,
            };
            this._scatImgs.push(scatImg);
        }
    }
    _handleTimeout(type = 'glitch') {
        if (this._isStoped) {
            clearTimeout(this._timeout);
            return;
        }
        if (type === 'glitch') {
            // set the "reseted" flag to false to reset next time
            this._reseted = false;
            // emit event
            this.emit('start', {});
            // handle timeout
            this._timeout = setTimeout(() => {
                this._mustDraw = false;
                this._handleTimeout('pause');
            }, Math.round(Math.random() * (this.settings.maxDuration - this.settings.minDuration)));
        }
        else {
            // emit event
            this.emit('stop', {});
            // handle timeout
            this._timeout = setTimeout(() => {
                this._mustDraw = true;
                this._handleTimeout('glitch');
            }, Math.round(Math.random() * (this.settings.maxInterval - this.settings.minInterval)));
        }
    }
    start() {
        this._isStoped = false;
        this._handleTimeout('glitch');
    }
    stop() {
        this._isStoped = true;
        clearInterval(this._timeout);
    }
    _draw() {
        // restore the original state
        this._replaceData(this._imgOrigin, this._copyData);
        if (!this._mustDraw) {
            if (!this._reseted) {
                this._p.push();
                this._p.translate((this._p.width - this._imgOrigin.width) / 2, (this._p.height - this._imgOrigin.height) / 2);
                this._p.image(this._imgOrigin, 0, 0);
                this._p.pop();
                this._reseted = true;
            }
            return;
        }
        // // flow line
        // this._flowLineImgs.forEach((v, i, arr) => {
        //     arr[i].pixels = this._flowLine(this._imgOrigin, v);
        //     if (arr[i].pixels) {
        //         this._replaceData(this._imgOrigin, arr[i].pixels);
        //     }
        // });
        // shift line
        this._shiftLineImgs.forEach((v, i, arr) => {
            if (this._p.floor(this._p.random(100)) > 50) {
                arr[i] = this._shiftLine(this._imgOrigin);
                this._replaceData(this._imgOrigin, arr[i]);
            }
            else {
                if (arr[i]) {
                    this._replaceData(this._imgOrigin, arr[i]);
                }
            }
        });
        // // shift rgb
        // this._shiftRGBs.forEach((v, i, arr) => {
        //     if (this._p.floor(this._p.random(100)) > 65) {
        //         arr[i] = this._shiftRGB(this._imgOrigin);
        //         this._replaceData(this._imgOrigin, arr[i]);
        //     }
        // });
        this._p.push();
        this._p.translate((this._p.width - this._imgOrigin.width) / 2, (this._p.height - this._imgOrigin.height) / 2);
        this._p.image(this._imgOrigin, 0, 0);
        this._p.pop();
        // scat image
        // this._scatImgs.forEach((obj) => {
        //     this._p.push();
        //     this._p.translate(
        //         (this._p.width - this._imgOrigin.width) / 2,
        //         (this._p.height - this._imgOrigin.height) / 2,
        //     );
        //     if (this._p.floor(this._p.random(100)) > 80) {
        //         obj.x = this._p.floor(
        //             this._p.random(
        //                 -this._imgOrigin.width * 0.3,
        //                 this._imgOrigin.width * 0.7,
        //             ),
        //         );
        //         obj.y = this._p.floor(
        //             this._p.random(
        //                 -this._imgOrigin.height * 0.1,
        //                 this._imgOrigin.height,
        //             ),
        //         );
        //         obj.img = this._getRandomRectImg(this._imgOrigin);
        //     }
        //     if (obj.img) {
        //         this._p.image(obj.img, obj.x, obj.y);
        //     }
        //     this._p.pop();
        // });
    }
    _replaceData(destImg, srcPixels) {
        for (let y = 0; y < destImg.height; y++) {
            for (let x = 0; x < destImg.width; x++) {
                let r, g, b, a;
                let index;
                index = (y * destImg.width + x) * this._channelLen;
                r = index;
                g = index + 1;
                b = index + 2;
                a = index + 3;
                destImg.pixels[r] = srcPixels[r];
                destImg.pixels[g] = srcPixels[g];
                destImg.pixels[b] = srcPixels[b];
                destImg.pixels[a] = srcPixels[a];
            }
        }
        destImg.updatePixels();
    }
    _flowLine(srcImg, obj) {
        let destPixels, tempY;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        obj.t1 %= srcImg.height;
        obj.t1 += obj.speed;
        //tempY = this._p.floor(noise(obj.t1) * srcImg.height);
        tempY = this._p.floor(obj.t1);
        for (let y = 0; y < srcImg.height; y++) {
            if (tempY === y) {
                for (let x = 0; x < srcImg.width; x++) {
                    let r, g, b, a;
                    let index;
                    index = (y * srcImg.width + x) * this._channelLen;
                    r = index;
                    g = index + 1;
                    b = index + 2;
                    a = index + 3;
                    destPixels[r] = srcImg.pixels[r] + obj.randX;
                    destPixels[g] = srcImg.pixels[g] + obj.randX;
                    destPixels[b] = srcImg.pixels[b] + obj.randX;
                    destPixels[a] = srcImg.pixels[a];
                }
            }
        }
        return destPixels;
    }
    _shiftLine(srcImg) {
        let offsetX;
        let rangeMin, rangeMax;
        let destPixels;
        let rangeH;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        rangeH = srcImg.height;
        rangeMin = this._p.floor(this._p.random(0, rangeH));
        rangeMax =
            rangeMin + this._p.floor(this._p.random(1, rangeH - rangeMin));
        offsetX = this._channelLen * this._p.floor(this._p.random(-40, 40));
        for (let y = 0; y < srcImg.height; y++) {
            if (y > rangeMin && y < rangeMax) {
                for (let x = 0; x < srcImg.width; x++) {
                    let r, g, b, a;
                    let r2, g2, b2, a2;
                    let index;
                    index = (y * srcImg.width + x) * this._channelLen;
                    r = index;
                    g = index + 1;
                    b = index + 2;
                    a = index + 3;
                    r2 = r + offsetX;
                    g2 = g + offsetX;
                    b2 = b + offsetX;
                    destPixels[r] = srcImg.pixels[r2];
                    destPixels[g] = srcImg.pixels[g2];
                    destPixels[b] = srcImg.pixels[b2];
                    destPixels[a] = srcImg.pixels[a];
                }
            }
        }
        return destPixels;
    }
    _shiftRGB(srcImg) {
        let randR, randG, randB;
        let destPixels;
        let range;
        range = 16;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        randR =
            (this._p.floor(this._p.random(-range, range)) * srcImg.width +
                this._p.floor(this._p.random(-range, range))) *
                this._channelLen;
        randG =
            (this._p.floor(this._p.random(-range, range)) * srcImg.width +
                this._p.floor(this._p.random(-range, range))) *
                this._channelLen;
        randB =
            (this._p.floor(this._p.random(-range, range)) * srcImg.width +
                this._p.floor(this._p.random(-range, range))) *
                this._channelLen;
        for (let y = 0; y < srcImg.height; y++) {
            for (let x = 0; x < srcImg.width; x++) {
                let r, g, b, a;
                let r2, g2, b2, a2;
                let index;
                index = (y * srcImg.width + x) * this._channelLen;
                r = index;
                g = index + 1;
                b = index + 2;
                a = index + 3;
                r2 = (r + randR) % srcImg.pixels.length;
                g2 = (g + randG) % srcImg.pixels.length;
                b2 = (b + randB) % srcImg.pixels.length;
                destPixels[r] = srcImg.pixels[r2];
                destPixels[g] = srcImg.pixels[g2];
                destPixels[b] = srcImg.pixels[b2];
                destPixels[a] = srcImg.pixels[a];
            }
        }
        return destPixels;
    }
    _getRandomRectImg(srcImg) {
        let startX;
        let startY;
        let rectW;
        let rectH;
        let destImg;
        startX = this._p.floor(this._p.random(0, srcImg.width - 30));
        startY = this._p.floor(this._p.random(0, srcImg.height - 50));
        rectW = this._p.floor(this._p.random(30, srcImg.width - startX));
        rectH = this._p.floor(this._p.random(1, 50));
        destImg = srcImg.get(startX, startY, rectW, rectH);
        destImg.loadPixels();
        return destImg;
    }
}
exports.default = Glitch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELHVEQUF5RDtBQUN6RCxvRUFBa0U7QUFFbEUsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNsQixJQUFJLE9BQU8sQ0FBQztBQVNaLE1BQXFCLE1BQU8sU0FBUSxtQkFBVTtJQW9CMUMsWUFDSSxtQkFBOEMsRUFDOUMsS0FBa0IsRUFDbEIsUUFBb0M7UUFFcEMsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1NBQ3BCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFsQ04sZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFHaEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUEwSmpCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFxRmpCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUF4TlYsSUFBSSxtQkFBbUIsWUFBWSxnQkFBZ0IsRUFBRTtZQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztTQUMzQzth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