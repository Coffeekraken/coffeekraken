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
            html: __path.resolve(__dirname(), '../partials/shields/shields.md')
        }
    },
    layouts: {
        doc: {
            markdown: __path.resolve(__dirname(), '../layouts/doc/docLayout.md'),
            html: __path.resolve(__dirname(), '../layouts/doc/docLayout.md')
        },
        readme: {
            markdown: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md'),
            html: __path.resolve(__dirname(), '../layouts/readme/readmeLayout.md')
        },
        license: {
            markdown: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md'),
            html: __path.resolve(__dirname(), '../layouts/license/licenseLayout.md')
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
    
},
