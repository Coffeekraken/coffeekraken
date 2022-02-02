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
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
export default class CKFallingStars extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._starsCount = 0;
        this._maxCount = 10;
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
                ck-falling-stars .__star-${i} {
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
        $star.classList.add('__star');
        $star.classList.add(`__star-${starId}`);
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
        return html `
        `;
    }
}
export function define(props = {}, tagName = 'ck-falling-stars') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKFallingStars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tGYWxsaW5nU3RhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDa0ZhbGxpbmdTdGFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUUzQixNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxlQUFlO0lBQ3ZEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBR1AsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztJQUhmLENBQUM7SUFLSyxZQUFZOztZQUdkLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUVqQyxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFFdkMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkQsVUFBVSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7Z0JBQzlCLFVBQVUsQ0FBQyxTQUFTLEdBQUc7a0NBQ0QsQ0FBQzs7Ozs7Ozs7Ozs7bURBV2dCLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Ozs7MkNBSTFDLENBQUM7c0NBQ04sQ0FBQzs7YUFFMUIsQ0FBQztnQkFDRixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6QztZQUdELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNmLENBQUM7S0FBQTtJQUVELEdBQUc7UUFFQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFdEUsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFdEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDN0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXRELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFJRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7U0FDVixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsa0JBQWtCO0lBQ2hFLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ25ELENBQUMifQ==