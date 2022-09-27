import { Component, ViewChild, ElementRef, Input } from "@angular/core";

// src/components/MyComponent.lite.tsx

/**
 * @name                SInlineComponent
 * @as                  Inline
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SInlineComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-inline
 * @platform            html
 * @status              beta
 *
 * This component represent the inline component that allows you to inline svgs for example.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-inline-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-inline-component/webcomponent';
 * define();
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
type Props = {
  src: string;
};

import "../../../../../src/css/s-inline.css";
import __SInlineComponentInterface from "../../../../../src/js/interface/SInlineComponentInterface";
const DEFAULT_PROPS = __SInlineComponentInterface.defaults();

@Component({
  selector: "s-inline",
  template: `
    <div class="s-inline" [status]="status" [loaded]="loaded">
      <ng-container *ngIf="status === 'mounted'">
        <div #container></div>
      </ng-container>
    </div>
  `,
})
export default class SInline {
  @Input() src: Props["src"];

  @ViewChild("container") container: ElementRef;

  status = "idle";
  loaded = false;
  svgCode = null;
  load() {
    (async () => {
      const r = await fetch(this.src);
      const text = await r.text();
      const parser = new DOMParser();
      const svg = parser.parseFromString(text, "text/html").body.innerHTML;
      this.svgCode = svg;
      this.loaded = true;
      this.container.nativeElement.innerHTML = svg;
    })();
  }

  ngOnInit() {
    __SInlineComponentInterface;
    this.status = "mounted";
    this.load();
  }
}
