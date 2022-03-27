import { defineConfig } from 'tsup';

// @ts-ignore
export default defineConfig((options) => {
    return {
        external: [],
        injectStyle: 'true',
        bundle: false,
        outDir: 'packages',
        dts: false,
        banner: {
            js:
                options.format[0] === 'esm'
                    ? `import { createRequire as topLevelCreateRequire } from 'module';\n const require = topLevelCreateRequire(${'import-meta-url'.replace(
                          /-/g,
                          '.',
                      )});`
                    : '',
        },
    };
});
