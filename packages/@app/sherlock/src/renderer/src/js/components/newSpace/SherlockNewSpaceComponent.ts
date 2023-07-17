import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SSherlockNewSpaceSpec } from '../../../../../shared/SherlockSpecs'

import __unwrapSpecsValues from '../../utils/unwrapSpecsValues'

@customElement('sherlock-new-space')
export class SherlockNewSpaceComponent extends LitElement {
    static styles = css``

    constructor() {
        super()
    }

    async _save(data: any): void {
        const space = __unwrapSpecsValues(data.values)
        const res = await window.sherlock.newSpace(space)

        console.log('RES?', res)
    }

    render() {
        return html`
            <ul class="sh-new-space">
                <s-specs-editor
                    uid="new-space"
                    .values=${{}}
                    features.delete="false"
                    i18n.save-button="Coco"
                    .specs=${SSherlockNewSpaceSpec}
                    @s-specs-editor.save=${(e) => {
                        this._save(e.detail)
                    }}
                ></s-specs-editor>
            </ul>
        `
    }

    createRenderRoot() {
        return this
    }
}
