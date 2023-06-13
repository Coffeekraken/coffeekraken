import type { IWhenEntersViewportSettings } from './whenEntersViewport';
import type { IWhenInteractSettings } from './whenInteract';
import type { IWhenInViewportSettings } from './whenInViewport';
import type { IWhenNearViewportSettings } from './whenNearViewport';
import type { IWhenOutOfViewportSettings } from './whenOutOfViewport';
import type { IWhenStyleSheetsReadySettings } from './whenStylesheetsReady';
import type { IWhenVisibleSettings } from './whenVisible';

export interface IwhenSettings {
    whenInViewport?: IWhenInViewportSettings;
    whenNearViewport?: IWhenNearViewportSettings;
    whenEntersViewport?: IWhenEntersViewportSettings;
    whenOutOfViewport?: IWhenOutOfViewportSettings;
    whenInteract?: IWhenInteractSettings;
    whenVisible?: IWhenVisibleSettings;
    whenStylesheetsReady?: IWhenStyleSheetsReadySettings;
}
export type TWhenTrigger = 'direct' | 'directly' | 'inViewport' | 'nearViewport' | 'enterViewport' | 'outOfViewport' | 'interact' | 'visible' | 'domReady' | 'stylesheetsReady' | 'animationEnd' | 'lod:0' | 'lod:1' | 'lod:2' | 'lod:3' | 'lod:4';
export declare const WhenTriggers: string[];
export default function __when($elm: HTMLElement, trigger: TWhenTrigger[], settings?: IwhenSettings): Promise<any>;
