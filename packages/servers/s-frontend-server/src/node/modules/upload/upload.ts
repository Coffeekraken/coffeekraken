import { __ensureDirSync } from '@coffeekraken/sugar/fs';
import { __packageTmpDir } from '@coffeekraken/sugar/path';

export default function upload({ express, settings, config }) {
    return new Promise(async (resolve) => {
        // register the "upload" post handler
        express.post('/upload', async (req, res) => {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }

            const uploadResult = [];

            // ensure we have the "upload" director yin the package tmp one
            __ensureDirSync(`${__packageTmpDir()}/upload`);

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            for (let [fileId, file] of Object.entries(req.files)) {
                const file = req.files[fileId],
                    id = `${file.name.split('.')[0]}-${Math.round(
                        Math.random() * 9999,
                    )}`,
                    extension = file.name.split('.').pop(),
                    filePath = `${__packageTmpDir()}/upload/${id}.${extension}`;

                // move the file
                file.mv(filePath);

                // log
                console.log(
                    `[SFrontendServer] File "<yellow>${file.name}</yellow>" uploaded <green>successfully</green> and available at url "<cyan>/tmp/upload/${id}.${extension}</cyan>"`,
                );

                uploadResult.push({
                    url: `/tmp/upload/${id}.${extension}`,
                });
            }

            res.status(200);
            res.type('expresslication/json');
            res.send(JSON.stringify(uploadResult));
        });

        resolve(true);
    });
}
