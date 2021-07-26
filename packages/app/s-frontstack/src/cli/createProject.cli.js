var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SFrontstack from "../node/SFrontstack";
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __fs from 'fs';
import __childProcess from 'child_process';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';
import * as Enquirer from 'enquirer';
export default function createProject(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const frontstack = new SFrontstack();
        const recipes = frontstack.listRecipes();
        let selectedRecipeObj, projectName, projectFolder, projectLicense, projectAuthor, projectDescription;
        // recipe choice
        const choices = [];
        for (const [name, obj] of Object.entries(recipes)) {
            choices.push(`${name}: ${obj.description}`);
        }
        const prompt = new Enquirer.default.Select({
            message: 'Please select a recipe that suits your needs',
            choices
        });
        const res = yield prompt.run();
        for (const [name, obj] of Object.entries(recipes)) {
            if (res === `${name}: ${obj.description}`) {
                selectedRecipeObj = obj;
                break;
            }
        }
        // project name
        const namePrompt = new Enquirer.default.Input({
            message: 'Project name',
            validate(...args) {
                if (!args[0].match(/^[a-zA-Z0-9-_@\\/]+$/))
                    return `Please do not use spaces or special characters other than "@" and "/"`;
                return true;
            }
        });
        projectName = yield namePrompt.run();
        // project name
        const descriptionPrompt = new Enquirer.default.Input({
            message: 'Project description'
        });
        projectDescription = yield descriptionPrompt.run();
        // licence choice
        const licenses = [
            'MIT',
            'Apache-2.0',
            'BSD-3-Clause',
            'BSD-2-Clause',
            'GPL',
            'LGPL',
            'MPL-2.0',
            'CDDL-1.0',
            'EPL-2.0'
        ];
        const licensePrompt = new Enquirer.default.Select({
            message: 'Please select a license for your project',
            choices: licenses
        });
        projectLicense = yield licensePrompt.run();
        // author
        const authorPrompt = new Enquirer.default.Input({
            message: 'Project author'
        });
        projectAuthor = yield authorPrompt.run();
        // folder
        const folderPrompt = new Enquirer.default.Input({
            message: 'Project folder',
            initial: `${process.cwd()}/${projectName}`
        });
        projectFolder = yield folderPrompt.run();
        // confirmation
        const confirmPrompt = new Enquirer.default.Confirm({
            message: 'Process to new project initialisation?',
            initial: true
        });
        const confirmRes = yield confirmPrompt.run();
        if (!confirmRes) {
            console.log(`The new project setup process has been canceled`);
            process.exit();
        }
        // ensure we have the folder
        console.log('- Ensure the project folder exists');
        __ensureDirSync(projectFolder);
        // move into the project
        console.log(`- Init the new project folder with the template of the "<yellow>${selectedRecipeObj.title}</yellow>" recipe`);
        __copySync(selectedRecipeObj.templateDir, projectFolder);
        // set the project name
        console.log(`- Set the project name and description in some files like package.json`);
        try {
            const packageJson = yield import(`${projectFolder}/package.json`);
            packageJson.name = projectName;
            packageJson.description = projectDescription !== null && projectDescription !== void 0 ? projectDescription : '';
            packageJson.license = projectLicense !== null && projectLicense !== void 0 ? projectLicense : 'MIT';
            packageJson.author = projectAuthor;
            __fs.writeFileSync(`${projectFolder}/package.json`, JSON.stringify(packageJson, null, 4));
        }
        catch (e) { }
        // install dependencies
        const isYarn = yield __commandExists('yarn');
        const command = isYarn ? 'yarn' : 'npm i';
        console.log(`- Installing dependencies using ${isYarn ? 'yarn' : 'npm'}...`);
        const npmInitRes = __childProcess.spawnSync(command, [], {
            shell: true,
            // stdio: 'ignore',
            cwd: projectFolder
        });
        let errorStr;
        if (npmInitRes.stderr) {
            errorStr = npmInitRes.stderr.toString();
            if (errorStr !== '' && !errorStr.match(/^warning\s/)) {
                console.log(__parseHtml(`<red>[npm] Error during the npm dependencies instalation...</red>`));
                console.log(npmInitRes.stderr.toString());
                process.exit();
            }
        }
        // check if has code installed
        if (yield __commandExists('code')) {
            // launch development stack
            const openVsCodeConfirm = new Enquirer.default.Confirm({
                message: 'Open the new project in VSCode?',
                initial: true
            });
            const openVsCodeConfirmRes = yield openVsCodeConfirm.run();
            if (openVsCodeConfirmRes) {
                __childProcess.spawnSync('code .', [], {
                    shell: true,
                    cwd: projectFolder
                });
            }
        }
        // launch development stack
        const launchDevStackConfirm = new Enquirer.default.Confirm({
            message: 'Launch development stack?',
            initial: true
        });
        const launchDevStackConfirmRes = yield launchDevStackConfirm.run();
        if (launchDevStackConfirmRes) {
            __childProcess.spawnSync(`npm run dev`, [], {
                shell: true,
                cwd: projectFolder
            });
        }
        else {
            console.log(__parseHtml(`<green>[success]</green> Congrats, your new project "<yellow>${projectName}</yellow>" has been <green>successfully</green> initialised!`));
            process.exit();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUHJvamVjdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGVQcm9qZWN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBRTdFLE9BQU8sS0FBSyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRXJDLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLGFBQWEsQ0FBQyxVQUFVLEdBQUcsRUFBRTs7UUFFdkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsSUFBSSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLENBQUM7UUFFckcsZ0JBQWdCO1FBQ2hCLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUN6QyxPQUFPLEVBQUUsOENBQThDO1lBQ3ZELE9BQU87U0FDUixD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