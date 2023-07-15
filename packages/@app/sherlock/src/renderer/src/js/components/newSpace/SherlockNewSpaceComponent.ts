import { SDobbyGunJsAdapterSettingsSpecs } from '@coffeekraken/s-dobby'
import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('sherlock-new-space')
export class SherlockNewSpaceComponent extends LitElement {
    static styles = css``

    constructor() {
        super()
    }

    render() {
        return html`
            <ul class="sh-new-space">
                <s-specs-editor
                    uid="new-space"
                    .values=${{}}
                    .specs=${SDobbyGunJsAdapterSettingsSpecs}
                ></s-specs-editor>
            </ul>
        `
    }

    createRenderRoot() {
        return this
    }
}
