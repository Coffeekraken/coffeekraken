import { __ensureDirSync } from '@coffeekraken/sugar/fs';

import __fs from 'fs';

export default function store({ express, settings, config }) {
    return new Promise(async (resolve) => {
        // listen for requesting the global data like specs by sources, etc...
        express.get(`/store/:id`, async (req, res) => {
            let potentialPath = `${settings.rootDir}/${req.params.id}.json`;
            if (__fs.existsSync(potentialPath)) {
                const json = __fs.readFileSync(potentialPath, 'utf-8');
                res.status(200);
                res.type('application/json');
                res.send(json);
            }
        });

        // register the "upload" post handler
        express.post('/store', async (req, res) => {
            // ensure we have the "upload" director yin the package tmp one
            __ensureDirSync(settings.rootDir);

            // check if it's a json payload
            if (!req.files || Object.keys(req.files).length === 0) {
                if (!req.body.id && !req.body.uid) {
                    console.error(
                        `To save a json into the store, it MUST have a proper "(u)id"`,
                    );
                }

                __fs.writeFileSync(
                    `${settings.rootDir}/${req.body.uid || req.body.id}.json`,
                    JSON.stringify(req.body, null, 4),
                );

                // log
                console.log(
                    `[SFrontendServer] File "<yellow>${
                        req.body.uid ?? req.body.id
                    }.json</yellow>" stored <green>successfully</green> and available at url "<cyan>/store/${
                        req.body.id
                    }</cyan>"`,
                );

                res.status(200);
                res.type('application/json');
                return res.send(JSON.stringify({}));
            }

            const uploadResult = [];

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            for (let [fileId, file] of Object.entries(req.files)) {
                const file = req.files[fileId],
                    id = `${file.name.split('.')[0]}-${Math.round(
                        Math.random() * 9999,
                    )}`,
                    extension = file.name.split('.').pop(),
                    filePath = `${settings.rootDir}/${id}.${extension}`;

                // move the file
                file.mv(filePath);

                // log
                console.log(
                    `[SFrontendServer] File "<yellow>${file.name}</yellow>" stored <green>successfully</green> and available at url "<cyan>/store/${id}.${extension}</cyan>"`,
                );

                uploadResult.push({
                    url: `/tmp/upload/${id}.${extension}`,
                });
            }

            res.status(200);
            res.type('application/json');
            res.send(JSON.stringify(uploadResult));
        });

        resolve(true);
    });
}
