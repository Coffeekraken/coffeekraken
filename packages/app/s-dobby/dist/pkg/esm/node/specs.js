export * from '../shared/specs';
import { __homeDir } from '@coffeekraken/sugar/path';
export const SDobbyFsPoolSettingsSpecs = {
    type: 'Object',
    title: 'SDobby FS adapter settings',
    description: 'Specify the SDobby FS adapter settings',
    props: {
        folder: {
            type: 'String',
            title: 'Folder',
            description: 'Specify where to save the SDobby configurations',
            default: `${__homeDir()}/.dobby`,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWMsaUJBQWlCLENBQUM7QUFFaEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHO0lBQ3JDLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxXQUFXLEVBQUUsd0NBQXdDO0lBQ3JELEtBQUssRUFBRTtRQUNILE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFFBQVE7WUFDZixXQUFXLEVBQUUsaURBQWlEO1lBQzlELE9BQU8sRUFBRSxHQUFHLFNBQVMsRUFBRSxTQUFTO1NBQ25DO0tBQ0o7Q0FDSixDQUFDIn0=