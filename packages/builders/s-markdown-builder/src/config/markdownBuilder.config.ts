export default {
    default: {
        glob: undefined,
        inDir: undefined,
        inPath: undefined,
        inRaw: undefined,
        outDir: undefined,
        save: true,
        target: 'markdown',
    },
    presets: {
        readme: {
            glob: 'README',
            inDir: '[config.storage.src.rootDir]',
            outDir: '[config.storage.package.rootDir]'
        },
        doc: {
            glob: '**/*.md',
            inDir: '[config.storage.src.docDir]',
            outDir: '[config.storage.dist.docDir]',
        }
    }
}