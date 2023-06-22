import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import __SFront from '@coffeekraken/s-front';

import { __define as __CKMenuDefine } from './components/CKMenu';

import { __define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { __define as __SDocComponentDefine } from '@coffeekraken/s-doc';
import __SFeature from '@coffeekraken/s-feature';
import { __define as __SHotkeysListComponentDefine } from '@coffeekraken/s-hotkeys-list-component';
import __SLitComponent from '@coffeekraken/s-lit-component';

import { __pickRandom } from '@coffeekraken/sugar/array';

import { __querySelectorUp, __splitLetters } from '@coffeekraken/sugar/dom';

// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');

(async () => {
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

    __SFront.init();

    // essentials
    __SPackEssentials();

    // features

    // components
    __CKMenuDefine();
    __SHotkeysListComponentDefine();
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
        _$slider;
        _$slides;

        _settings = {
            easing: 'cubic-bezier(0.755, 0.000, 0.195, 0.985)',
            maxDelay: 0.3,
            maxDuration: 0.3,
            maxRotation: 360,
            maxTranslate: 100,
            translateXFactor: 1,
            translateYFactor: 0,
            rotationFactor: 0,
        };

        _slideIdx = 0;
        _paused = false;

        constructor($slider) {
            this._$slider = $slider;

            this._$slides = Array.from($slider.children);

            this._$slides.forEach(($slide) => {
                __splitLetters($slide);
                $slide._$letters = Array.from(
                    $slide.querySelectorAll('.s-split-letter'),
                );
            });

            // handle the in-viewport
            const $viewportAware = __querySelectorUp(
                this._$slider,
                '[viewport-aware]',
            );
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

            return;

            setInterval(() => {
                if (this._paused) {
                    return;
                }
                this.next();
            }, 5000);
        }

        highlightLetter(): void {
            const $letter = __pickRandom(this.getCurrentSlideLetters() ?? []);
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

        getSlideByIdx(idx: number): HTMLElement {
            return this._$slides[idx];
        }

        getCurrentSlide(): HTMLElement {
            return this._$slides[this._slideIdx];
        }

        getCurrentSlideLetters(): HTMLElement[] {
            // @ts-ignore
            return this.getCurrentSlide()._$letters;
        }

        next(): void {
            const newSlideIdx =
                this._slideIdx + 1 >= this._$slides.length
                    ? 0
                    : this._slideIdx + 1;
            this.goTo(newSlideIdx);
        }

        previous() {
            const newSlideIdx =
                this._slideIdx - 1 < 0
                    ? this._$slides.length - 1
                    : this._slideIdx - 1;
            this.goTo(newSlideIdx);
        }

        goTo(slideIdx: number) {
            const $currentSlide = this.getSlideByIdx(this._slideIdx);
            if ($currentSlide) {
                $currentSlide.classList.remove('active');
                this._slideOut($currentSlide);
            }

            const $newSlide = this.getSlideByIdx(slideIdx);
            $newSlide?.classList.add('active');
            this._slideIn($newSlide);

            // set the new slide idx
            this._slideIdx = slideIdx;
        }

        _getTransformObj() {
            const y =
                    (this._settings.maxTranslate * -1 +
                        Math.round(
                            Math.random() * this._settings.maxTranslate * 2,
                        )) *
                    this._settings.translateYFactor,
                x =
                    (this._settings.maxTranslate * -1 +
                        Math.round(
                            Math.random() * this._settings.maxTranslate * 2,
                        )) *
                    this._settings.translateXFactor,
                rotation =
                    (this._settings.maxRotation * -1 +
                        Math.round(
                            Math.random() * this._settings.maxRotation * 2,
                        )) *
                    this._settings.rotationFactor,
                duration = Math.random() * this._settings.maxDuration,
                delay = Math.random() * this._settings.maxDelay;

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

        _slideOut($slide: HTMLElement): void {
            $slide._$letters.forEach(($letter) => {
                if ($letter.innerHTML.trim()) {
                    const transformObj = this._getTransformObj();
                    this._applyTransformToLetter(transformObj, $letter);
                }
            });
        }

        _slideIn($slide: HTMLElement): void {
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

    // Website specific
    const $slider = document.querySelector('[welcome-slider]');
    $slider && new WelcomeSlider($slider);

    // // dashboard
    // new __SDashboard({
    //     layout: [
    //         [
    //             's-dashboard-browserstack',
    //             's-dashboard-google',
    //             's-dashboard-web-vitals',
    //         ],
    //         ['s-dashboard-frontend-checker'],
    //     ],
    // });
})();
