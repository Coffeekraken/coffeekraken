import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginWireframeImageMixinInterface extends __SInterface {
    static get _definition() {
        return {
            type: {
                type: 'String',
                values: ['image', 'map'],
                description: 'Specify the image type you want to display',
                default: 'image',
            },
        };
    }
}
export { SSugarcssPluginWireframeImageMixinInterface as interface };

export interface SSugarcssPluginWireframeImageMixinParams {
    type: 'image' | 'map';
}

/**
 * @name           image
 * @as              @s.wireframe.image
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin gives you back the wireframe image statement that depend on you themeWireframe config
 *
 * @snippet         @s.wireframe.image
 * @s.wireframe.image;
 *
 * @example        css
 * .myCoolItem {
 *  @s.wireframe.image;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<SSugarcssPluginWireframeImageMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <SSugarcssPluginWireframeImageMixinParams>{
        type: 'image',
        ...(params ?? {}),
    };

    const vars: string[] = [];
    vars.push(`
        
        position: relative;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: 50%;
        @s.wireframe.background;
        
        & > * {
            display: block !important;
        }

        &:after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            @s.wireframe.border;
            @s.border.radius;
        }

    `);

    switch (finalParams.type) {
        case 'map':
            vars.push(`
                background-image: url("data:image/svg+xml,%3Csvg width='800' height='709' viewBox='0 0 800 709' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M382.26 454.668C387.332 459.129 393.665 461.365 400.003 461.365C406.341 461.365 412.676 459.129 417.745 454.668C424.17 449.009 575.028 314.544 575.028 175.09C575.028 78.5457 496.515 0 400.005 0C303.493 0 224.977 78.5457 224.977 175.09C224.972 314.544 375.835 449.009 382.26 454.668ZM400.003 129.342C425.059 129.342 445.376 149.819 445.376 175.09C445.376 200.359 425.059 220.838 400.003 220.838C374.939 220.838 354.623 200.356 354.623 175.09C354.623 149.819 374.939 129.342 400.003 129.342Z' fill='%23E7E7E7'/%3E%3Cpath d='M736.316 454.59L716.041 383.541C712.75 372.009 702.215 364.061 690.228 364.061H545.53C540.299 371.837 534.78 379.643 528.943 387.492C488.385 441.984 447.154 478.843 442.583 482.873C430.812 493.238 415.693 498.946 400.003 498.946C384.323 498.946 369.204 493.243 357.416 482.868C352.851 478.843 311.614 441.979 271.059 387.492C265.222 379.643 259.703 371.834 254.472 364.061H109.771C97.7846 364.061 87.2499 372.009 83.9583 383.541L59.7939 468.217L599.941 567.153L736.316 454.59Z' fill='%23E7E7E7'/%3E%3Cpath d='M798.97 674.168L747.171 492.629L490.168 708.382H773.159C781.582 708.382 789.515 704.43 794.587 697.707C799.659 690.981 801.278 682.265 798.97 674.168Z' fill='%23E7E7E7'/%3E%3Cpath d='M131.428 519.547L49.4342 504.527L1.02995 674.168C-1.27848 682.265 0.340384 690.982 5.41515 697.705C10.4872 704.428 18.4199 708.38 26.8428 708.38H131.428V519.547Z' fill='%23E7E7E7'/%3E%3Cpath d='M169.012 526.434V708.379H431.712L562.578 598.52L169.012 526.434Z' fill='%23E7E7E7'/%3E%3C/svg%3E%0A");
            `);
            break;
        case 'image':
        default:
            vars.push(`
                background-image: url("data:image/svg+xml,%3Csvg width='257' height='226' viewBox='0 0 257 226' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M65.8381 57H210.701L201.063 22.9177C200.462 20.7919 198.251 19.556 196.126 20.1571L65.8381 57ZM231.485 57L220.308 17.4755C216.702 4.72081 203.438 -2.69502 190.683 0.911767L17.4755 49.8918C4.72081 53.4986 -2.69502 66.7621 0.911766 79.5168L29 178.845V202C29 215.255 39.7452 226 53 226H233C246.255 226 257 215.255 257 202V81C257 67.7452 246.255 57 233 57H231.485ZM29 105.346V81C29 75.2817 30.9999 70.0304 34.3384 65.9075L22.9177 69.1371C20.7919 69.7382 19.556 71.9488 20.1571 74.0746L29 105.346ZM53 77H233C235.209 77 237 78.7909 237 81V202C237 204.209 235.209 206 233 206H53C50.7909 206 49 204.209 49 202V81C49 78.7909 50.7909 77 53 77Z' fill='%23E7E7E7'/%3E%3Cpath d='M205.607 183.007L86.9502 182.552C82.8292 182.536 80.4956 177.821 82.9821 174.535L125.089 118.882C126.926 116.454 130.489 116.218 132.63 118.383L154.551 140.539C156.537 142.547 159.79 142.512 161.733 140.464L168.456 133.377C170.531 131.19 174.056 131.323 175.96 133.661L209.503 174.85C212.169 178.123 209.829 183.023 205.607 183.007Z' fill='%23E7E7E7'/%3E%3Ccircle cx='202.073' cy='108.213' r='14' fill='%23E7E7E7'/%3E%3C/svg%3E%0A");
            `);
            break;
    }

    return vars;
}
