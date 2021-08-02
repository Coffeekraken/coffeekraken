import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
export default {
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
        isLicense: __path.resolve(__dirname(), '../node/helpers/isLicense')
    },
    partials: {
        's-code-example': {
            markdown: __path.resolve(__dirname(), '../partials/sCodeExample/sCodeExamplePartial.html'),
            html: __path.resolve(__dirname(), '../partials/sCodeExample/sCodeExamplePartial.html')
        },
        license: {
            markdown: __path.resolve(__dirname(), '../partials/license/license.md'),
            html: __path.resolve(__dirname(), '../partials/license/license.md')
        },
        'license-mit': {
            markdown: __path.resolve(__dirname(), '../partials/licenseMit/licenseMit.md'),
            html: __path.resolve(__dirname(), '../partials/licenseMit/licenseMit.md')
        },
        'license-gpl': {
            markdown: __path.resolve(__dirname(), '../partials/licenseGpl/licenseGpl.md'),
            html: __path.resolve(__dirname(), '../partials/licenseGpl/licenseGpl.md')
        },
        'license-lgpl': {
            markdown: __path.resolve(__dirname(), '../partials/licenseLgpl/licenseLgpl.md'),
            html: __path.resolve(__dirname(), '../partials/licenseLgpl/licenseLgpl.md')
        },
        'license-epl-20': {
            markdown: __path.resolve(__dirname(), '../partials/licenseEpl20/licenseEpl20.md'),
            html: __path.resolve(__dirname(), '../partials/licenseEpl20/licenseEpl20.md')
        },
        'license-mpl-20': {
            markdown: __path.resolve(__dirname(), '../partials/licenseMpl20/licenseMpl20.md'),
            html: __path.resolve(__dirname(), '../partials/licenseMpl20/licenseMpl20.md')
        },
        'license-cddl-10': {
            markdown: __path.resolve(__dirname(), '../partials/licenseCddl10/licenseCddl10.md'),
            html: __path.resolve(__dirname(), '../partials/licenseCddl10/licenseCddl10.md')
        },
        'license-apache-20': {
            markdown: __path.resolve(__dirname(), '../partials/licenseApache20/licenseApache20.md'),
            html: __path.resolve(__dirname(), '../partials/licenseApache20/licenseApache20.md')
        },
        'license-bsd-2-clause': {
            markdown: __path.resolve(__dirname(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md'),
            html: __path.resolve(__dirname(), '../partials/licenseBsd2Clause/licenseBsd2Clause.md')
        },
        'license-bsd-3-clause': {
            markdown: __path.resolve(__dirname(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md'),
            html: __path.resolve(__dirname(), '../partials/licenseBsd3Clause/licenseBsd3Clause.md')
        },
        shields: {
            markdown: __path.resolve(__dirname(), '../partials/shields/shields.md'),
            html: __path.resolve(__dirname(), '../partials/shields/shields.md'),
            data: '[config.shieldsio]'
        },
        'doc-menu': {
            markdown: __path.resolve(__dirname(), '../partials/docMenu/docMenu.md'),
            html: __path.resolve(__dirname(), '../partials/docMenu/docMenu.md')
        },
        'recipes-list': {
            markdown: __path.resolve(__dirname(), '../partials/recipesList/recipesList.md'),
            html: __path.resolve(__dirname(), '../partials/recipesList/recipesList.md')
        },
    },
    layouts: {
        doc: {
            markdown: __path.resolve(__dirname(), '../layouts/doc/docLayout.md'),
            html: __path.resolve(__dirname(), '../layouts/doc/docLayout.md'),
            data: '[config.doc.layout]'
        },
        readme: {
            markdown: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md'),
            html: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md'),
            data: '[config.readme.layout]'
        },
        license: {
            markdown: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md'),
            html: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md'),
            data: '[config.license.layout]'
        }
    },
    sections: {
        'readme-header': {
            markdown: __path.resolve(__dirname(), '../sections/readmeHeader/readmeHeaderSection.md'),
            html: __path.resolve(__dirname(), '../sections/readmeHeader/readmeHeaderSection.md')
        },
        'doc-header': {
            markdown: __path.resolve(__dirname(), '../sections/docHeader/docHeaderSection.md'),
            html: __path.resolve(__dirname(), '../sections/docHeader/docHeaderSection.md')
        },
        'doc-menu': {
            markdown: __path.resolve(__dirname(), '../sections/docMenu/docMenuSection.md'),
            html: __path.resolve(__dirname(), '../sections/docMenu/docMenuSection.md')
        },
        description: {
            markdown: __path.resolve(__dirname(), '../sections/description/descriptionSection.md'),
            html: __path.resolve(__dirname(), '../sections/description/descriptionSection.md')
        },
        install: {
            markdown: __path.resolve(__dirname(), '../sections/install/installSection.md'),
            html: __path.resolve(__dirname(), '../sections/install/installSection.md')
        },
        license: {
            markdown: __path.resolve(__dirname(), '../sections/license/licenseSection.md'),
            html: __path.resolve(__dirname(), '../sections/license/licenseSection.md')
        },
        contact: {
            markdown: __path.resolve(__dirname(), '../sections/contact/contactSection.md'),
            html: __path.resolve(__dirname(), '../sections/contact/contactSection.md')
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd25CdWlsZGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtkb3duQnVpbGRlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLGVBQWU7SUFDWCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsMkJBQTJCO1FBQ2pDLEtBQUssRUFBRSw4QkFBOEI7UUFDckMsTUFBTSxFQUFFLFNBQVM7UUFDakIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLCtCQUErQjtRQUN2QyxJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxVQUFVO0tBQ3JCO0lBQ0QsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUU7UUFDTCxlQUFlLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxpQ0FBaUMsQ0FBQztRQUMvRSxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQztLQUN0RTtJQUNELFFBQVEsRUFBRTtRQUNOLGdCQUFnQixFQUFFO1lBQ2QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsbURBQW1ELENBQUM7WUFDMUYsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsbURBQW1ELENBQUM7U0FDekY7UUFDRCxPQUFPLEVBQUU7WUFDTCxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxnQ0FBZ0MsQ0FBQztZQUN2RSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxnQ0FBZ0MsQ0FBQztTQUN0RTtRQUNELGFBQWEsRUFBRTtZQUNYLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNB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