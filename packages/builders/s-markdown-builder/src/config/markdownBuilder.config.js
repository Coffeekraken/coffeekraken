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
                match: /```[a-z]+(.*)```/gm,
                markdown: __path.resolve(__dirname(), '../transformers/code/code.md'),
                html: __path.resolve(__dirname(), '../transformers/code/code.html'),
            },
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLEtBQUssRUFBRSw4QkFBOEI7WUFDckMsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSwrQkFBK0I7WUFDdkMsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxVQUFVO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFLEVBQUU7UUFDWCxZQUFZLEVBQUU7WUFDVixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLG9CQUFvQjtnQkFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ3BCLFNBQVMsRUFBRSxFQUNYLDhCQUE4QixDQUNqQztnQkFDRCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDaEIsU0FBUyxFQUFFLEVBQ1gsZ0NBQWdDLENBQ25DO2FBQ0o7U0FDSjtRQUNELE9BQU8sRUFBRTtZQUNMLGVBQWUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUMzQixTQUFTLEVBQUUsRUFDWCxpQ0FBaUMsQ0FDcEM7WUFDRCxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQztZQUNuRSxhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDekIsU0FBUyxFQUFFLEVBQ1gsK0JBQStCLENBQ2xDO1NB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