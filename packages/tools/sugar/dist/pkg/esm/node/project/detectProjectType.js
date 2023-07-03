import __fs from 'fs';
export default function detectProjectType(cwd = process.cwd()) {
    const packageJson = JSON.parse(__fs.readFileSync(`${cwd}/package.json`, 'utf8').toString());
    // detecting the package type (next, generic, etc...)
    if (__fs.existsSync(`${cwd}/next.config.js`)) {
        const version = packageJson.dependencies.next.replace(/\^/, '');
        return {
            type: 'next',
            version,
            rawVersion: packageJson.dependencies.next,
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    // detect sugar projects
    if (__fs.existsSync(`${cwd}/sugar.json`)) {
        let sugarVersion;
        for (let [packageName, version] of Object.entries(packageJson.dependencies)) {
            if (packageName.match(/^@coffeekraken\//)) {
                sugarVersion = version;
                break;
            }
        }
        if (sugarVersion) {
            return {
                type: 'sugar',
                version: sugarVersion,
                rawVersion: packageJson.dependencies.next,
                major: parseInt(sugarVersion.split('.')[0]),
                minor: parseInt(sugarVersion.split('.')[1]),
                fix: parseInt(sugarVersion.split('.')[2]),
            };
        }
    }
    return {
        type: 'unknown',
        version: '1.0.0',
        rawVersion: '1.0.0',
        major: 1,
        minor: 0,
        fix: 0,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQWtDdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDckMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7SUFFbkIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUM5RCxDQUFDO0lBRUYscURBQXFEO0lBQ3JELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsRUFBRTtRQUMxQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWhFLE9BQU87WUFDSCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU87WUFDUCxVQUFVLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJO1lBQ3pDLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxLQUFLLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDLENBQUM7S0FDTDtJQUVELHdCQUF3QjtJQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxFQUFFO1FBQ3RDLElBQUksWUFBWSxDQUFDO1FBQ2pCLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUM3QyxXQUFXLENBQUMsWUFBWSxDQUMzQixFQUFFO1lBQ0MsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3ZDLFlBQVksR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxZQUFZLEVBQUU7WUFDZCxPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixVQUFVLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJO2dCQUN6QyxLQUFLLEVBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsR0FBRyxFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVDLENBQUM7U0FDTDtLQUNKO0lBRUQsT0FBTztRQUNILElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLE9BQU87UUFDaEIsVUFBVSxFQUFFLE9BQU87UUFDbkIsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztRQUNSLEdBQUcsRUFBRSxDQUFDO0tBQ1QsQ0FBQztBQUNOLENBQUMifQ==