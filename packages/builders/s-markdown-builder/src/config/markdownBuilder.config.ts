import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';

export default function (env, config) {
    if (env.platform !== 'node') return;

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
                markdown: __path.resolve(
                    __dirname(),
                    '../transformers/code/code.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../transformers/code/code.html',
                ),
            },
        },
        helpers: {
            isSectionWanted: __path.resolve(
                __dirname(),
                '../node/helpers/isSectionWanted',
            ),
            isLicense: __path.resolve(__dirname(), '../node/helpers/isLicense'),
            sanitizeValue: __path.resolve(
                __dirname(),
                '../node/helpers/sanitizeValue',
            ),
        },
        partials: {
            's-code-example': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/sCodeExample/sCodeExamplePartial.html',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/sCodeExample/sCodeExamplePartial.html',
                ),
            },
            license: {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/license/license.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/license/license.md',
                ),
            },
            'license-mit': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseMit/licenseMit.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseMit/licenseMit.md',
                ),
            },
            'license-gpl': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseGpl/licenseGpl.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseGpl/licenseGpl.md',
                ),
            },
            'license-lgpl': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseLgpl/licenseLgpl.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseLgpl/licenseLgpl.md',
                ),
            },
            'license-epl-20': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseEpl20/licenseEpl20.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseEpl20/licenseEpl20.md',
                ),
            },
            'license-mpl-20': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseMpl20/licenseMpl20.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseMpl20/licenseMpl20.md',
                ),
            },
            'license-cddl-10': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseCddl10/licenseCddl10.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseCddl10/licenseCddl10.md',
                ),
            },
            'license-apache-20': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseApache20/licenseApache20.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseApache20/licenseApache20.md',
                ),
            },
            'license-bsd-2-clause': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseBsd2Clause/licenseBsd2Clause.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseBsd2Clause/licenseBsd2Clause.md',
                ),
            },
            'license-bsd-3-clause': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/licenseBsd3Clause/licenseBsd3Clause.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/licenseBsd3Clause/licenseBsd3Clause.md',
                ),
            },
            shields: {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/shields/shields.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/shields/shields.md',
                ),
                data: '[config.shieldsio]',
            },
            'doc-menu': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/docMenu/docMenu.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/docMenu/docMenu.md',
                ),
            },
            'config-explorer': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/configExplorer/configExplorer.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/configExplorer/configExplorer.html',
                ),
            },
            'recipes-list': {
                markdown: __path.resolve(
                    __dirname(),
                    '../partials/recipesList/recipesList.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../partials/recipesList/recipesList.md',
                ),
            },
        },
        layouts: {
            doc: {
                markdown: __path.resolve(
                    __dirname(),
                    '../layouts/doc/docLayout.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../layouts/doc/docLayout.md',
                ),
                data: '[config.doc.layout]',
            },
            readme: {
                markdown: __path.resolve(
                    __dirname(),
                    '../layouts/readme/readmeLayout.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../layouts/readme/readmeLayout.md',
                ),
                data: '[config.readme.layout]',
            },
            license: {
                markdown: __path.resolve(
                    __dirname(),
                    '../layouts/license/licenseLayout.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../layouts/license/licenseLayout.md',
                ),
                data: '[config.license.layout]',
            },
        },
        sections: {
            'readme-header': {
                markdown: __path.resolve(
                    __dirname(),
                    '../sections/readmeHeader/readmeHeaderSection.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../sections/readmeHeader/readmeHeaderSection.md',
                ),
            },
            'doc-header': {
                markdown: __path.resolve(
                    __dirname(),
                    '../sections/docHeader/docHeaderSection.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../sections/docHeader/docHeaderSection.md',
                ),
            },
            'doc-menu': {
                markdown: __path.resolve(
                    __dirname(),
                    '../sections/docMenu/docMenuSection.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../sections/docMenu/docMenuSection.md',
                ),
            },
            description: {
                markdown: __path.resolve(
                    __dirname(),
                    '../sections/description/descriptionSection.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../sections/description/descriptionSection.md',
                ),
            },
            install: {
                markdown: __path.resolve(
                    __dirname(),
                    '../sections/install/installSection.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../sections/install/installSection.md',
                ),
            },
            license: {
                markdown: __path.resolve(
                    __dirname(),
                    '../sections/license/licenseSection.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../sections/license/licenseSection.md',
                ),
            },
            contact: {
                markdown: __path.resolve(
                    __dirname(),
                    '../sections/contact/contactSection.md',
                ),
                html: __path.resolve(
                    __dirname(),
                    '../sections/contact/contactSection.md',
                ),
            },
        },
    };
}
