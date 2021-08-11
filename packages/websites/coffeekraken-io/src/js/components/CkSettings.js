var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { html, LitElement } from 'lit-element';
import { getCurrentVersion, setState, getState } from '../state/state';
export default class CkSettings extends LitElement {
    constructor() {
        super();
        this._settings = {
            darkMode: true,
            colors: {
                accent: undefined,
                complementary: undefined
            }
        };
        (() => __awaiter(this, void 0, void 0, function* () {
            this._currentVersion = yield getCurrentVersion();
        }))();
        this._restoreState();
    }
    _restoreState() {
        const state = getState();
        this.setDarkMode(state.darkMode);
    }
    _saveState() {
        setState(Object.assign({}, this._settings));
    }
    setDarkMode(mode) {
        this._settings.darkMode = mode;
        if (mode) {
            document.body.classList.add('s-theme--dark');
        }
        else {
            document.body.classList.remove('s-theme--dark');
        }
        this._saveState();
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
            <div class="s-p:10">
                <ul class="__settings s-bg:odd">
                    <li class="s-flex s-bg:main-surface s-p:20">
                        <label class="s-flex-item:grow" for="theme-switcher">
                            Dark mode
                        </label>
                        <label for="theme-switcher" class="s-switch:accent">
                            <input type="checkbox" id="theme-switcher" ?checked="${this._settings.darkMode}" @change="${(e) => {
            this.setDarkMode(e.target.checked);
        }}" />
                            <div class="s-switch-handler"></div>
                            <script>
                            </script>
                        </label>
                    </li>
                    <li class="s-flex s-bg:main-surface s-p:20">
                        <label class="s-flex-item:grow" for="setting-accent-color">
                            Accent color
                        </label>
                        <label for="setting-accent-color">
                            <s-color-picker color="#ff0000" />
                        </label>
                    </li>
                </ul>
            </div>
        `;
    }
}
export function webcomponent(tagName = 'ck-settings') {
    customElements.define(tagName, CkSettings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNrU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQVksTUFBTSxhQUFhLENBQUM7QUFHekQsT0FBTyxFQUFjLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxVQUFVO0lBVTlDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFUWixjQUFTLEdBQUc7WUFDUixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsU0FBUztnQkFDakIsYUFBYSxFQUFFLFNBQVM7YUFDM0I7U0FDSixDQUFDO1FBSUUsQ0FBQyxHQUFTLEVBQUU7WUFDUixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0saUJBQWlCLEVBQUUsQ0FBQztRQUNyRCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7UUFFTCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFFekIsQ0FBQztJQUVELGFBQWE7UUFDVCxNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsVUFBVTtRQUNOLFFBQVEsbUJBQ0QsSUFBSSxDQUFDLFNBQVMsRUFDbkIsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSTtRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLElBQUksRUFBRTtZQUNOLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7Ozs7OzttRkFRZ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGNBQWUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvRixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBRTs7Ozs7Ozs7Ozs7Ozs7OztTQWdCckIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWE7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsQ0FBQyJ9