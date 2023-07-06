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
        setInterval(() => {
            if (this._paused) {
                return;
            }
            this.next();
        }, 5000);
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