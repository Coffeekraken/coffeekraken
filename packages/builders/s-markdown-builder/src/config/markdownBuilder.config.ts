export default {
    default: {
        glob: 'README',
        inDir: '[config.storage.src.rootDir]',
        outDir: '[config.storage.package.rootDir]',
        save: true,
        target: 'markdown',
    },
    presets: {
        readme: {},
        doc: {
            glob: '**/*.md',
            inDir: '[config.storage.src.docDir]',
            outDir: '[config.storage.dist.docDir]',
        }
    }
}