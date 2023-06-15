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
import { define as __CKMenuDefine } from './components/CKMenu';
import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
import __SFeature from '@coffeekraken/s-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __pickRandom } from '@coffeekraken/sugar/array';
import { __querySelectorUp, __splitLetters } from '@coffeekraken/sugar/dom';
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
    __SFront.init();
    // essentials
    __SPackEssentials();
    // features
    // components
    __CKMenuDefine();
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
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFNUUsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELENBQUMsR0FBUyxFQUFFO0lBQ1IsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDNUIsU0FBUyxFQUFFLGNBQWM7S0FDNUIsQ0FBQyxDQUFDO0lBQ0gsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDakMsU0FBUyxFQUFFLGNBQWM7S0FDNUIsQ0FBQyxDQUFDO0lBQ0gsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDaEQsZ0JBQWdCLEVBQUU7WUFDZCxNQUFNLEVBQUUsR0FBRztTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxDQUFDO2FBQ1g7U0FDSjtLQUNKLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVoQixhQUFhO0lBQ2IsaUJBQWlCLEVBQUUsQ0FBQztJQUVwQixXQUFXO0lBRVgsYUFBYTtJQUNiLGNBQWMsRUFBRSxDQUFDO0lBQ2pCLDZCQUE2QixFQUFFLENBQUM7SUFDaEMscUJBQXFCLENBQUM7UUFDbEIsU0FBUyxFQUFFLFFBQVE7UUFDbkIsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLDZCQUE2QjtZQUNuQyxlQUFlLEVBQUUseUNBQXlDO1lBQzFELGNBQWMsRUFBRSx3Q0FBd0M7U0FDM0Q7S0FDSixDQUFDLENBQUM7SUFFSCxNQUFNLGFBQWE7UUFrQmYsWUFBWSxPQUFPO1lBZG5CLGNBQVMsR0FBRztnQkFDUixNQUFNLEVBQUUsMENBQTBDO2dCQUNsRCxRQUFRLEVBQUUsR0FBRztnQkFDYixXQUFXLEVBQUUsR0FBRztnQkFDaEIsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLFlBQVksRUFBRSxHQUFHO2dCQUNqQixnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQixnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQixjQUFjLEVBQUUsQ0FBQzthQUNwQixDQUFDO1lBRUYsY0FBUyxHQUFHLENBQUMsQ0FBQztZQUNkLFlBQU8sR0FBRyxLQUFLLENBQUM7WUFHWixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUV4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQzdCLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUN6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FDN0MsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBRUgseUJBQXlCO1lBQ3pCLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUNwQyxJQUFJLENBQUMsUUFBUSxFQUNiLGtCQUFrQixDQUNyQixDQUFDO1lBQ0YsSUFBSSxjQUFjLEVBQUU7Z0JBQ2hCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7b0JBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQztnQkFDSCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtvQkFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUVILDBCQUEwQjtZQUUxQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFNUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDYixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2QsT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUVELGVBQWU7O1lBQ1gsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQUEsSUFBSSxDQUFDLHNCQUFzQixFQUFFLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUU7Z0JBQ2xDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMzQixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixPQUFPO2FBQ1Y7WUFDRCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMzQixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsYUFBYSxDQUFDLEdBQVc7WUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxlQUFlO1lBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBRUQsc0JBQXNCO1lBQ2xCLGFBQWE7WUFDYixPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDNUMsQ0FBQztRQUVELElBQUk7WUFDQSxNQUFNLFdBQVcsR0FDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxRQUFRO1lBQ0osTUFBTSxXQUFXLEdBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBZ0I7WUFDakIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDakM7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFekIsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlCLENBQUM7UUFFRCxnQkFBZ0I7WUFDWixNQUFNLENBQUMsR0FDQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FDTixJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUNsRCxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQ25DLENBQUMsR0FDRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FDTixJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUNsRCxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQ25DLFFBQVEsR0FDSixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FDTixJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUNqRCxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUNqQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUNyRCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBRXBELE9BQU87Z0JBQ0gsQ0FBQztnQkFDRCxDQUFDO2dCQUNELFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixLQUFLO2FBQ1IsQ0FBQztRQUNOLENBQUM7UUFFRCx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsT0FBTztZQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLFlBQVksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDO1lBQzNHLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsWUFBWSxDQUFDLENBQUMsT0FBTyxZQUFZLENBQUMsQ0FBQyxlQUFlLFlBQVksQ0FBQyxRQUFRLE1BQU0sQ0FBQztRQUN6SCxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQW1CO1lBQ3pCLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDMUIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQzdDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3ZEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsUUFBUSxDQUFDLE1BQW1CO1lBQ3hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFFN0MsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUMxQixJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNwRCxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG1DQUFtQyxDQUFDO3dCQUM5RCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7b0JBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDWjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUNKO0lBRUQsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxPQUFPLElBQUksSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdEMsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLDBDQUEwQztJQUMxQyxvQ0FBb0M7SUFDcEMsd0NBQXdDO0lBQ3hDLGFBQWE7SUFDYiw0Q0FBNEM7SUFDNUMsU0FBUztJQUNULE1BQU07QUFDVixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==