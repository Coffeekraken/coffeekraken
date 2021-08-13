import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
export default function (env, config) {
    if (env.platform !== 'node')
        return {};
    return {
        default: {
            glob: '**/+(README|LICENSE|*.md)',
            inDir: '[config.storage.src.rootDir]',
            inPath: undefined,
            inRaw: undefined,
            outDir: '[config.storage.dist.rootDir]',
            save: true,
            target: 'markdown',
        },
        presets: {},
        helpers: {
            isSectionWanted: __path.resolve(__dirname(), '../node/helpers/isSectionWanted'),
            isLicense: __path.resolve(__dirname(), '../node/helpers/isLicense'),
            sanitizeValue: __path.resolve(__dirname(), '../node/helpers/sanitizeValue'),
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUV2QyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQyxLQUFLLEVBQUUsOEJBQThCO1lBQ3JDLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE1BQU0sRUFBRSwrQkFBK0I7WUFDdkMsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsVUFBVTtTQUNyQjtRQUNELE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFO1lBQ0wsZUFBZSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsaUNBQWlDLENBQUM7WUFDL0UsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsMkJBQTJCLENBQUM7WUFDbkUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsK0JBQStCLENBQUM7U0FDOUU7UUFDRCxRQUFRLEVBQUU7WUFDTixnQkFBZ0IsRUFBRTtnQkFDZCxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxtREFBbUQsQ0FBQztnQkFDMUYsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsbURBQW1ELENBQUM7YUFDekY7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLE1BQU0s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