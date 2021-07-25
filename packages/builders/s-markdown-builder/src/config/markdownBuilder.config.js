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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNYLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLFNBQVM7UUFDakIsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsVUFBVTtLQUNyQjtJQUNELE9BQU8sRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLDhCQUE4QjtZQUNyQyxNQUFNLEVBQUUsa0NBQWtDO1NBQzdDO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsNkJBQTZCO1lBQ3BDLE1BQU0sRUFBRSw4QkFBOEI7U0FDekM7S0FDSjtDQUNKLENBQUEifQ==