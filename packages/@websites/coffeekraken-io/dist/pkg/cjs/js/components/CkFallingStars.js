"use strict";
// @ts-nocheck
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
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
class CKFallingStars extends s_lit_component_1.default {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._starsCount = 0;
        this._maxCount = 10;
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._maxCount; i++) {
                const left = `${Math.random() * 100}%`;
                const $starStyle = document.createElement('style');
                $starStyle.rel = 'stylesheet';
                $starStyle.innerHTML = `
                @keyframes star-${i} {
                    0% {
                        top: -50px;
                        left: var(--left);
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        left: calc(var(--left) - ${10 + Math.round(Math.random() * 0)}%);
                        opacity: 0;
                    }
                }
                ck-falling-stars ._star-${i} {
                    animation: star-${i} var(--falling-time, 1s) ease-in forwards;
                }
            `;
                document.head.appendChild($starStyle);
            }
            this.new();
        });
    }
    new() {
        this._starsCount++;
        const starId = Math.round(Math.random() * this._maxCount);
        const $star = document.createElement('div');
        $star.classList.add('_star');
        $star.classList.add(`_star-${starId}`);
        $star.classList.add(Math.random() < 0.5 ? 'accent' : 'complementary');
        const speed = 1 + Math.random() * 1.5;
        $star.style.setProperty('--left', `${Math.random() * 100}%`);
        $star.style.setProperty('--falling-time', `${speed}s`);
        $star.style.setProperty('--speed', speed);
        $star.style.setProperty('--scale', Math.random() * 2);
        setTimeout(() => {
            $star.remove();
        }, 5000);
        this.appendChild($star);
        setTimeout(this.new.bind(this), Math.random() * 3500);
    }
    render() {
        return (0, lit_1.html) ``;
    }
}
exports.default = CKFallingStars;
function define(props = {}, tagName = 'ck-falling-stars') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, CKFallingStars);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBRTNCLE1BQXFCLGNBQWUsU0FBUSx5QkFBZTtJQUt2RDtRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUdQLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxFQUFFLENBQUM7SUFIZixDQUFDO0lBVkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDckQsQ0FBQztJQWFLLFlBQVk7O1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUV2QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRCxVQUFVLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztnQkFDOUIsVUFBVSxDQUFDLFNBQVMsR0FBRztrQ0FDRCxDQUFDOzs7Ozs7Ozs7OzttREFZUCxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUNyQzs7OzswQ0FJa0IsQ0FBQztzQ0FDTCxDQUFDOzthQUUxQixDQUFDO2dCQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBRUQsR0FBRztRQUNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV0RSxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUV0QyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM3RCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdkQsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFdEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUEvRUQsaUNBK0VDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxrQkFBa0I7SUFDaEUseUJBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFIRCx3QkFHQyJ9