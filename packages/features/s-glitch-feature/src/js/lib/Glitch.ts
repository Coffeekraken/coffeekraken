import __SPromise from '@coffeekraken/s-promise';
import { __deepMerge } from '@coffeekraken/sugar/object';
import 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js';

let windowW = 250;
let windowH = 250;
let _glitch;

export interface ISGlitchSettings {
    minDuration: number;
    maxDuration: number;
    minInterval: number;
    maxInterval: number;
}

export default class Glitch extends __SPromise {
    _channelLen = 4;
    _imgPath;
    _$node;
    _imgOrigin = null;
    _copyData = [];
    _flowLineImgs = [];
    _shiftLineImgs = [];
    _shiftRGBs = [];
    _scatImgs = [];
    _throughFlag = true;
    _p;
    _isLoaded = false;
    _mustDraw = false;
    _isStoped = true;

    _$canvas;
    _ctx;
    _timeout;

    constructor(
        imgPathOrImgElement: HTMLImageElement | String,
        $node: HTMLElement,
        settings?: Partial<ISGlitchSettings>,
    ) {
        super(
            __deepMerge(
                {
                    minDuration: 100,
                    maxDuration: 1000,
                    minInterval: 100,
                    maxInterval: 2000,
                },
                settings ?? {},
            ),
        );

        if (imgPathOrImgElement instanceof HTMLImageElement) {
            this._imgPath = imgPathOrImgElement.src;
        } else {
            this._imgPath = imgPathOrImgElement;
        }

        this._$node = $node;

        const _this = this;

        // @ts-ignore
        new window.p5((p) => {
            p.setup = function () {
                p.loadImage(_this._imgPath, function (img) {
                    _this._$canvas = p.createCanvas(
                        img.width,
                        img.height,
                    ).canvas;
                    _this._ctx = _this._$canvas.getContext('2d');
                    _this._imgOrigin = img;
                    _this._imgOrigin.loadPixels();
                    _this._copyData = new Uint8ClampedArray(
                        _this._imgOrigin.pixels,
                    );
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

    _handleTimeout(type: 'glitch' | 'pause' = 'glitch') {
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
        } else {
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

    _reseted = false;
    _draw() {
        // restore the original state
        this._replaceData(this._imgOrigin, this._copyData);

        if (!this._mustDraw) {
            if (!this._reseted) {
                this._p.push();
                this._p.translate(
                    (this._p.width - this._imgOrigin.width) / 2,
                    (this._p.height - this._imgOrigin.height) / 2,
                );
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
            } else {
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
        this._p.translate(
            (this._p.width - this._imgOrigin.width) / 2,
            (this._p.height - this._imgOrigin.height) / 2,
        );
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

    _pixelsA = {};
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
