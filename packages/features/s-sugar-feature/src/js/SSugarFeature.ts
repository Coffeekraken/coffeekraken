import __SFeature, { ISFeature } from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';

export interface ISSugarFeatureProps {
    scrolled: boolean;
    scrolledDelta: number;
    vhvar: boolean;
}

export default class SSugarFeature extends __SFeature implements ISFeature {
    _matrix;
    _originalTransform;

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SSugarFeatureInterface,
                    },
                    feature: {},
                },
                settings ?? {},
            ),
        );
    }
    mount() {
        // scrolled
        if (this.componentUtils.props.scrolled) this._scrolled();
        // vhvar
        if (this.componentUtils.props.vhvar) this._vhvar();
    }
    _scrolled() {
        document.addEventListener('scroll', (e) => {
            if (window.scrollY >= this.componentUtils.props.scrolledDelta) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        });
    }
    _vhvar() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
}

export function define(
    props: Partial<ISSugarFeatureProps> = {},
    name = 's-sugar',
) {
    __SFeature.defineFeature(name, SSugarFeature, props);
}
