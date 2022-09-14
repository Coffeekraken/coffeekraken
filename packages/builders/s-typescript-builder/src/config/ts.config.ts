import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';

export async function preprocess(api) {
    const config = (await __loadConfigFile('tsconfig.json')) ?? {};
    return __deepMerge(api.this, config);
}

export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        compilerOptions: {
            incremental: false,
            allowJs: true,
            strict: true,
            inlineSourceMap: true,
            traceResolution: false,
            esModuleInterop: true,
            skipLibCheck: true,
            declaration: true,
            experimentalDecorators: true,
            forceConsistentCasingInFileNames: false,
            noImplicitAny: false,
            noStrictGenericChecks: false,
            allowSyntheticDefaultImports: false,
        },
    };
}
