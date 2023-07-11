import { __pickRandom } from '@coffeekraken/sugar/array';
import { __querySelectorUp, __splitLetters } from '@coffeekraken/sugar/dom';
export default class WelcomeSlider {
    constructor($slider) {
        this._settings = {
            easing: 'cubic-bezier(0.755, 0.000, 0.195, 0.985)',
            maxDelay: 0.3,
            maxDuration: 0.3,
            maxRotation: 360,
            maxTranslate: 100,
            translateXFactor: 1,
            translateYFactor: 0,
            rotationFactor: 0,
        };
        this._slideIdx = 0;
        this._paused = false;
        this._$slider = $slider;
        this._$slides = Array.from($slider.children);
        this._$slides.forEach(($slide) => {
            __splitLetters($slide);
            $slide._$letters = Array.from($slide.querySelectorAll('.s-split-letter'));
        });
        // handle the in-viewport
        const $viewportAware = __querySelectorUp(this._$slider, '[viewport-aware]');
        if ($viewportAware) {
            $viewportAware.addEventListener('viewport.in', () => {
                this._paused = false;
            });
            $viewportAware.addEventListener('viewport.out', () => {
                this._paused = true;
            });
        }
        this.goTo(this._slideIdx);
        $slider.addEventListener('pointerover', (e) => {
            this._paused = true;
        });
        $slider.addEventListener('pointerout', (e) => {
            this._paused = false;
        });
        // this.highlightLetter();
        this._$slider.setAttribute('ready', 'true');
        // setInterval(() => {
        //     if (this._paused) {
        //         return;
        //     }
        //     this.next();
        // }, 5000);
    }
    highlightLetter() {
        var _a;
        const $letter = __pickRandom((_a = this.getCurrentSlideLetters()) !== null && _a !== void 0 ? _a : []);
        if ($letter.innerHTML.trim() !== '░') {
            setTimeout(() => {
                this.highlightLetter();
            }, Math.random() * 500);
            return;
        }
        setTimeout(() => {
            this.highlightLetter();
        }, Math.random() * 500);
        $letter.classList.add('active');
        setTimeout(() => {
            $letter.classList.remove('active');
        }, Math.random() * 1000);
    }
    getSlideByIdx(idx) {
        return this._$slides[idx];
    }
    getCurrentSlide() {
        return this._$slides[this._slideIdx];
    }
    getCurrentSlideLetters() {
        // @ts-ignore
        return this.getCurrentSlide()._$letters;
    }
    next() {
        const newSlideIdx = this._slideIdx + 1 >= this._$slides.length ? 0 : this._slideIdx + 1;
        this.goTo(newSlideIdx);
    }
    previous() {
        const newSlideIdx = this._slideIdx - 1 < 0
            ? this._$slides.length - 1
            : this._slideIdx - 1;
        this.goTo(newSlideIdx);
    }
    goTo(slideIdx) {
        const $currentSlide = this.getSlideByIdx(this._slideIdx);
        if ($currentSlide) {
            $currentSlide.classList.remove('active');
            this._slideOut($currentSlide);
        }
        const $newSlide = this.getSlideByIdx(slideIdx);
        $newSlide === null || $newSlide === void 0 ? void 0 : $newSlide.classList.add('active');
        this._slideIn($newSlide);
        // set the new slide idx
        this._slideIdx = slideIdx;
    }
    _getTransformObj() {
        const y = (this._settings.maxTranslate * -1 +
            Math.round(Math.random() * this._settings.maxTranslate * 2)) *
            this._settings.translateYFactor, x = (this._settings.maxTranslate * -1 +
            Math.round(Math.random() * this._settings.maxTranslate * 2)) *
            this._settings.translateXFactor, rotation = (this._settings.maxRotation * -1 +
            Math.round(Math.random() * this._settings.maxRotation * 2)) *
            this._settings.rotationFactor, duration = Math.random() * this._settings.maxDuration, delay = Math.random() * this._settings.maxDelay;
        return {
            x,
            y,
            rotation,
            duration,
            delay,
        };
    }
    _applyTransformToLetter(transformObj, $letter) {
        $letter.style.display = 'inline-block';
        $letter.style.opacity = 0;
        $letter.style.transformOrigin = '50% 50%';
        $letter.style.transition = `all ${transformObj.duration}s ${this._settings.easing} ${transformObj.delay}s`;
        $letter.style.transform = `translate(${transformObj.x}px, ${transformObj.y}px) rotateZ(${transformObj.rotation}deg)`;
    }
    _slideOut($slide) {
        $slide._$letters.forEach(($letter) => {
            if ($letter.innerHTML.trim()) {
                const transformObj = this._getTransformObj();
                this._applyTransformToLetter(transformObj, $letter);
            }
        });
    }
    _slideIn($slide) {
        $slide._$letters.forEach(($letter, i) => {
            const transformObj = this._getTransformObj();
            if ($letter.innerHTML.trim()) {
                this._applyTransformToLetter(transformObj, $letter);
                setTimeout(() => {
                    $letter.style.transform = `translate(0px, 0px) rotateZ(0deg)`;
                    $letter.style.opacity = 1;
                }, 1000);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFNUUsTUFBTSxDQUFDLE9BQU8sT0FBTyxhQUFhO0lBa0I5QixZQUFZLE9BQU87UUFkbkIsY0FBUyxHQUFHO1lBQ1IsTUFBTSxFQUFFLDBDQUEwQztZQUNsRCxRQUFRLEVBQUUsR0FBRztZQUNiLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFlBQVksRUFBRSxHQUFHO1lBQ2pCLGdCQUFnQixFQUFFLENBQUM7WUFDbkIsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixjQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDO1FBRUYsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHWixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDN0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FDekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQzdDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILHlCQUF5QjtRQUN6QixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FDcEMsSUFBSSxDQUFDLFFBQVEsRUFDYixrQkFBa0IsQ0FDckIsQ0FBQztRQUNGLElBQUksY0FBYyxFQUFFO1lB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