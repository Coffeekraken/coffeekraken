import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        default: {
            glob: '**/+(README|LICENSE|*.md)',
            inDir: '[config.storage.src.rootDir]',
            inPath: null,
            inRaw: null,
            outDir: '[config.storage.dist.rootDir]',
            outPath: null,
            save: true,
            target: 'markdown',
        },
        presets: {},
        transformers: {
            code: {
                match: /^```([a-zA-Z0-9]+)\n([\s\S]*?)```$/gm,
                markdown: __path.resolve(__dirname(), '../transformers/code/code.md'),
                html: __path.resolve(__dirname(), '../transformers/code/code.html'),
            },
        },
        helpers: {},
        partials: {
            's-code-example': {
                markdown: __path.resolve(__dirname(), '../partials/sCodeExample/sCodeExamplePartial.html'),
                html: __path.resolve(__dirname(), '../partials/sCodeExample/sCodeExamplePartial.html'),
            },
            license: {
                markdown: __path.resolve(__dirname(), '../partials/license/license.md'),
                html: __path.resolve(__dirname(), '../partials/license/license.md'),
            },
            'license-mit': {
                markdown: __path.resolve(__dirname(), '../partials/licenseMit/licenseMit.md'),
                html: __path.resolve(__dirname(), '../partials/licenseMit/licenseMit.md'),
            },
            'license-gpl': {
                markdown: __path.resolve(__dirname(), '../partials/licenseGpl/licenseGpl.md'),
                html: __path.resolve(__dirname(), '../partials/licenseGpl/licenseGpl.md'),
            },
            'license-lgpl': {
                markdown: __path.resolve(__dirname(), '../partials/licenseLgpl/licenseLgpl.md'),
                html: __path.resolve(__dirname(), '../partials/licenseLgpl/licenseLgpl.md'),
            },
            'license-epl-20': {
                markdown: __path.resolve(__dirname(), '../partials/licenseEpl20/licenseEpl20.md'),
                html: __path.resolve(__dirname(), '../partials/licenseEpl20/licenseEpl20.md'),
            },
            'license-mpl-20': {
                markdown: __path.resolve(__dirname(), '../partials/licenseMpl20/licenseMpl20.md'),
                html: __path.resolve(__dirname(), '../partials/licenseMpl20/licenseMpl20.md'),
            },
            'license-cddl-10': {
                markdown: __path.resolve(__dirname(), '../partials/licenseCddl10/licenseCddl10.md'),
                html: __path.resolve(__dirname(), '../partials/licenseCddl10/licenseCddl10.md'),
            },
            'license-apache-20': {
                markdown: __path.resolve(__dirname(), '../partials/licenseApache20/licenseApache20.md'),
                html: __path.resolve(__dirname(), '../partials/licenseApache20/licenseApache20.md'),
            },
            'license-bsd-2-clause': {
                markdown: __path.resolve(__dirname(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md'),
                html: __path.resolve(__dirname(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md'),
            },
            'license-bsd-3-clause': {
                markdown: __path.resolve(__dirname(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md'),
                html: __path.resolve(__dirname(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md'),
            },
            shields: {
                markdown: __path.resolve(__dirname(), '../partials/shields/shields.md'),
                html: __path.resolve(__dirname(), '../partials/shields/shields.md'),
                data: '[config.shieldsio]',
            },
            interface: {
                markdown: __path.resolve(__dirname(), '../partials/interface/interface.md'),
                html: __path.resolve(__dirname(), '../partials/interface/interface.html'),
            },
            configFiles: {
                markdown: __path.resolve(__dirname(), '../partials/configFiles/configFiles.md'),
                html: __path.resolve(__dirname(), '../partials/configFiles/configFiles.md'),
            },
            config: {
                markdown: __path.resolve(__dirname(), '../partials/config/config.md'),
                html: __path.resolve(__dirname(), '../partials/config/config.html'),
            },
            file: {
                markdown: __path.resolve(__dirname(), '../partials/file/file.md'),
                html: __path.resolve(__dirname(), '../partials/file/file.md'),
            },
            'doc-menu': {
                markdown: __path.resolve(__dirname(), '../partials/docMenu/docMenu.md'),
                html: __path.resolve(__dirname(), '../partials/docMenu/docMenu.md'),
            },
            'config-explorer': {
                markdown: __path.resolve(__dirname(), '../partials/configExplorer/configExplorer.md'),
                html: __path.resolve(__dirname(), '../partials/configExplorer/configExplorer.html'),
            },
            'recipes-list': {
                markdown: __path.resolve(__dirname(), '../partials/recipesList/recipesList.md'),
                html: __path.resolve(__dirname(), '../partials/recipesList/recipesList.md'),
            },
        },
        layouts: {
            doc: {
                markdown: __path.resolve(__dirname(), '../layouts/doc/docLayout.md'),
                html: __path.resolve(__dirname(), '../layouts/doc/docLayout.md'),
                data: '[config.doc.layout]',
            },
            readme: {
                markdown: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md'),
                html: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md'),
                data: '[config.readme.layout]',
            },
            license: {
                markdown: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md'),
                html: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md'),
                data: '[config.license.layout]',
            },
        },
        sections: {
            'readme-header': {
                markdown: __path.resolve(__dirname(), '../sections/readmeHeader/readmeHeaderSection.md'),
                html: __path.resolve(__dirname(), '../sections/readmeHeader/readmeHeaderSection.md'),
            },
            'doc-header': {
                markdown: __path.resolve(__dirname(), '../sections/docHeader/docHeaderSection.md'),
                html: __path.resolve(__dirname(), '../sections/docHeader/docHeaderSection.md'),
            },
            'doc-menu': {
                markdown: __path.resolve(__dirname(), '../sections/docMenu/docMenuSection.md'),
                html: __path.resolve(__dirname(), '../sections/docMenu/docMenuSection.md'),
            },
            description: {
                markdown: __path.resolve(__dirname(), '../sections/description/descriptionSection.md'),
                html: __path.resolve(__dirname(), '../sections/description/descriptionSection.md'),
            },
            install: {
                markdown: __path.resolve(__dirname(), '../sections/install/installSection.md'),
                html: __path.resolve(__dirname(), '../sections/install/installSection.md'),
            },
            license: {
                markdown: __path.resolve(__dirname(), '../sections/license/licenseSection.md'),
                html: __path.resolve(__dirname(), '../sections/license/licenseSection.md'),
            },
            contact: {
                markdown: __path.resolve(__dirname(), '../sections/contact/contactSection.md'),
                html: __path.resolve(__dirname(), '../sections/contact/contactSection.md'),
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLEtBQUssRUFBRSw4QkFBOEI7WUFDckMsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSwrQkFBK0I7WUFDdkMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxVQUFVO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFLEVBQUU7UUFDWCxZQUFZLEVBQUU7WUFDVixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLHNDQUFzQztnQkFDN0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ3BCLFNBQVMsRUFBRSxFQUNYLDhCQUE4QixDQUNqQztnQkFDRCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDaEIsU0FBUyxFQUFFLEVBQ1gsZ0NBQWdDLENBQ25DO2FBQ0o7U0FDSjtRQUNELE9BQU8sRUFBRSxFQUFFO1FBQ1gsUUFBUSxFQUFFO1lBQ04sZ0JBQWdCLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ3BCLFNBQVMsRUFBRSxFQUNYLG1EQUFtRCxDQUN0RDtnQkFDRCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDaEIsU0FBUyxFQUFFLEVBQ1gsbURBQW1ELENBQ3REO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0ws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