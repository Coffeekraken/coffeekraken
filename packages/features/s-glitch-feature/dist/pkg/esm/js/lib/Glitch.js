import __SPromise from '@coffeekraken/s-promise';
import { __deepMerge } from '@coffeekraken/sugar/object';
import 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js';
let windowW = 250;
let windowH = 250;
let _glitch;
export default class Glitch extends __SPromise {
    constructor(imgPathOrImgElement, $node, settings) {
        super(__deepMerge({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLDBEQUEwRCxDQUFDO0FBRWxFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNsQixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDbEIsSUFBSSxPQUFPLENBQUM7QUFTWixNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxVQUFVO0lBb0IxQyxZQUNJLG1CQUE4QyxFQUM5QyxLQUFrQixFQUNsQixRQUFvQztRQUVwQyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksV0FBVyxFQUFFLEdBQUc7WUFDaEIsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLEdBQUc7WUFDaEIsV0FBVyxFQUFFLElBQUk7U0FDcEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWxDTixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUdoQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUVwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLElBQUksQ0FBQztRQTBKakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQXFGakIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQXhOVixJQUFJLG1CQUFtQixZQUFZLGdCQUFn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R0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3BCLHVEQUF1RDtRQUN2RCxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2YsSUFBSSxLQUFLLENBQUM7b0JBQ1YsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDVixDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDZCxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDZCxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDZCxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUM3QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUM3QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUM3QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7YUFDSjtTQUNKO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFNO1FBQ2IsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDdkIsSUFBSSxVQUFVLENBQUM7UUFDZixJQUFJLE1BQU0sQ0FBQztRQUVYLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2QixRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEQsUUFBUTtZQUNKLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkUsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksQ0FBQyxHQUFHLFFBQVEsRUFBRTtnQkFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNmLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO29CQUNuQixJQUFJLEtBQUssQ0FBQztvQkFFVixLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUNsRCxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUNWLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNkLEVBQUUsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUNqQixFQUFFLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQkFDakIsRUFBRSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7b0JBQ2pCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2xDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQU07UUFDWixJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQ3hCLElBQUksVUFBVSxDQUFDO1FBQ2YsSUFBSSxLQUFLLENBQUM7UUFFVixLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxELEtBQUs7WUFDRCxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUs7Z0JBQ3hELElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckIsS0FBSztZQUNELENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSztnQkFDeEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQixLQUFLO1lBQ0QsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLO2dCQUN4RCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXJCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDZixJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxLQUFLLENBQUM7Z0JBRVYsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDbEQsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDVixDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZCxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZCxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZCxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDeEMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLE1BQU07UUFDcEIsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxLQUFLLENBQUM7UUFDVixJQUFJLE9BQU8sQ0FBQztRQUNaLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdELE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlELEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckIsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKIn0=