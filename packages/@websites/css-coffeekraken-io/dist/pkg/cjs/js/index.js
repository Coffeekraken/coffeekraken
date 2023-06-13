"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_pack_essentials_1 = __importDefault(require("@coffeekraken/s-pack-essentials"));
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
const CKMenu_1 = require("./components/CKMenu");
const s_code_example_component_1 = require("@coffeekraken/s-code-example-component");
const s_doc_1 = require("@coffeekraken/s-doc");
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const array_1 = require("@coffeekraken/sugar/array");
const dom_1 = require("@coffeekraken/sugar/dom");
// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
(() => __awaiter(void 0, void 0, void 0, function* () {
    s_feature_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    s_lit_component_1.default.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    s_lit_component_1.default.setDefaultProps(['s-code-example'], {
        scrollToSettings: {
            offset: 100,
        },
        responsive: {
            mobile: {
                lines: 5,
            },
        },
    });
    s_front_1.default.init();
    // essentials
    (0, s_pack_essentials_1.default)();
    // features
    // components
    (0, CKMenu_1.define)();
    (0, s_code_example_component_1.define)();
    (0, s_doc_1.define)({
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
            this._paused = false;
            this._$slider = $slider;
            this._$slides = Array.from($slider.children);
            this._$slides.forEach(($slide) => {
                (0, dom_1.__splitLetters)($slide);
                $slide._$letters = Array.from($slide.querySelectorAll('.s-split-letter'));
            });
            // handle the in-viewport
            const $viewportAware = (0, dom_1.__querySelectorUp)(this._$slider, '[viewport-aware]');
            if ($viewportAware) {
                $viewportAware.addEventListener('viewport.enter', () => {
                    this._paused = false;
                });
                $viewportAware.addEventListener('viewport.exit', () => {
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
            const $letter = (0, array_1.__pickRandom)((_a = this.getCurrentSlideLetters()) !== null && _a !== void 0 ? _a : []);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0ZBQWdFO0FBRWhFLG9FQUE2QztBQUU3QyxnREFBK0Q7QUFFL0QscUZBQWlHO0FBQ2pHLCtDQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsb0ZBQTREO0FBRTVELHFEQUF5RDtBQUV6RCxpREFBNEU7QUFFNUUsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELENBQUMsR0FBUyxFQUFFO0lBQ1IsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1FBQzVCLFNBQVMsRUFBRSxjQUFjO0tBQzVCLENBQUMsQ0FBQztJQUNILHlCQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUNqQyxTQUFTLEVBQUUsY0FBYztLQUM1QixDQUFDLENBQUM7SUFDSCx5QkFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDaEQsZ0JBQWdCLEVBQUU7WUFDZCxNQUFNLEVBQUUsR0FBRztTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxDQUFDO2FBQ1g7U0FDSjtLQUNKLENBQUMsQ0FBQztJQUVILGlCQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEIsYUFBYTtJQUNiLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztJQUVwQixXQUFXO0lBRVgsYUFBYTtJQUNiLElBQUEsZUFBYyxHQUFFLENBQUM7SUFDakIsSUFBQSxpQ0FBNkIsR0FBRSxDQUFDO0lBQ2hDLElBQUEsY0FBcUIsRUFBQztRQUNsQixTQUFTLEVBQUUsUUFBUTtRQUNuQixLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLGVBQWUsRUFBRSx5Q0FBeUM7WUFD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