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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLEtBQUssRUFBRSw4QkFBOEI7WUFDckMsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSwrQkFBK0I7WUFDdkMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxVQUFVO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUU7WUFDTCxlQUFlLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxpQ0FBaUMsQ0FBQztZQUMvRSxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQztZQUNuRSxhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSwrQkFBK0IsQ0FBQztTQUM5RTtRQUNELFFBQVEsRUFBRTtZQUNOLGdCQUFnQixFQUFFO2dCQUNkLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLG1EQUFtRCxDQUFDO2dCQUMxRixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxtREFBbUQsQ0FBQzthQUN6RjtZQUNELE9BQU8sRUFBRTtnQkFDTCxRQUFRLEVB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