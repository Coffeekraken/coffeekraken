"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
exports.default = {
    slugs: ['/changelog/:version?'],
    params: {},
    views: [
        {
            data({ req }) {
                const versions = (0, fs_1.__readJsonSync)(`${(0, fs_1.__dirname)()}/../../../versions.json`);
                const lastVersion = Object.keys(versions)[0];
                let requestedVersion = versions[lastVersion];
                requestedVersion.version = lastVersion;
                if (versions[req.params.version]) {
                    requestedVersion = versions[req.params.version];
                    requestedVersion.version = req.params.version;
                }
                return {
                    requestedVersion,
                };
            },
            path: 'pages.changelog.changelog',
        },
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQW1FO0FBRW5FLGtCQUFlO0lBQ1gsS0FBSyxFQUFFLENBQUMsc0JBQXNCLENBQUM7SUFDL0IsTUFBTSxFQUFFLEVBQUU7SUFDVixLQUFLLEVBQUU7UUFDSDtZQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRTtnQkFDUixNQUFNLFFBQVEsR0FBRyxJQUFBLG1CQUFjLEVBQzNCLEdBQUcsSUFBQSxjQUFTLEdBQUUseUJBQXlCLENBQzFDLENBQUM7Z0JBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7Z0JBQ3ZDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzlCLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoRCxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7aUJBQ2pEO2dCQUNELE9BQU87b0JBQ0gsZ0JBQWdCO2lCQUNuQixDQUFDO1lBQ04sQ0FBQztZQUNELElBQUksRUFBRSwyQkFBMkI7U0FDcEM7S0FDSjtDQUNKLENBQUMifQ==