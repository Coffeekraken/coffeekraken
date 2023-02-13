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
                    filePath = `${__packageTmpDir()}/upload/${file.name}`;

                // move the file
                file.mv(filePath);

                // log
                console.log(
                    `[SFrontendServer] File "<yellow>${file.name}</yellow>" uploaded <green>successfully</green> and available at url "<cyan>/tmp/upload/${file.name}</cyan>"`,
                );

                uploadResult.push({
                    url: `/tmp/upload/${file.name}`,
                });
            }

            res.status(200);
            res.type('expresslication/json');
            res.send(JSON.stringify(uploadResult));
        });

        resolve(true);
    });
}
