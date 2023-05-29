var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
import __SFront from '@coffeekraken/s-front';
import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
import __SFeature from '@coffeekraken/s-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __splitLetters } from '@coffeekraken/sugar/dom';
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
(() => __awaiter(void 0, void 0, void 0, function* () {
    __SFeature.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps(['s-code-example'], {
        scrollToSettings: {
            offset: 100,
        },
        responsive: {
            mobile: {
                lines: 5,
            },
        },
    });
    __SFront.init({});
    // essentials
    __SPackEssentials();
    // features
    // components
    __SCodeExampleComponentDefine();
    __SDocComponentDefine({
        mountWhen: 'direct',
        icons: {
            file: '<i class="s-icon:file"></i>',
            enterFullscreen: '<i class="s-icon:enter-fullscreen"></i>',
            exitFullscreen: '<i class="s-icon:exit-fullscreen"></i>',
        },
    });
    class WelcomeSlider {
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
            this._$slider = $slider;
            this._$slides = Array.from($slider.children);
            this._$slides.forEach(($slide) => {
                __splitLetters($slide);
                $slide._$letters = Array.from($slide.querySelectorAll('.s-split-letter'));
            });
            this.goTo(this._slideIdx);
            setInterval(() => {
                this.next();
            }, 5000);
        }
        getSlideByIdx(idx) {
            return this._$slides[idx];
        }
        next() {
            const newSlideIdx = this._slideIdx + 1 >= this._$slides.length
                ? 0
                : this._slideIdx + 1;
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
    new WelcomeSlider(document.querySelector('[welcome-slider]'));
    // Website specific
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELENBQUMsR0FBUyxFQUFFO0lBQ1IsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsU0FBUyxFQUFFLGNBQWM7S0FDNUIsQ0FBQyxDQUFDO0lBQ0gsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDakMsU0FBUyxFQUFFLGNBQWM7S0FDNUIsQ0FBQyxDQUFDO0lBQ0gsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDaEQsZ0JBQWdCLEVBQUU7WUFDZCxNQUFNLEVBQUUsR0FBRztTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxDQUFDO2FBQ1g7U0FDSjtLQUNKLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEIsYUFBYTtJQUNiLGlCQUFpQixFQUFFLENBQUM7SUFFcEIsV0FBVztJQUVY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