var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SFrontstack from "../SFrontstack";
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __fs from 'fs';
import __childProcess from 'child_process';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';
const { Select, Input, AutoComplete, Confirm } = require('enquirer');
export default function interactiveInit(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const frontstack = new SFrontstack();
        const recipes = frontstack.listRecipes();
        let selectedRecipeObj, projectName, projectFolder, projectLicense, projectAuthor, projectDescription;
        // recipe choice
        const choices = [];
        for (const [name, obj] of Object.entries(recipes)) {
            choices.push(`${name}: ${obj.description}`);
        }
        const prompt = new Select({
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
        const namePrompt = new Input({
            message: 'Project name',
            validate(...args) {
                if (!args[0].match(/^[a-zA-Z0-9-_@\\/]+$/))
                    return `Please do not use spaces or special characters other than "@" and "/"`;
                return true;
            }
        });
        projectName = yield namePrompt.run();
        // project name
        const descriptionPrompt = new Input({
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
        const licensePrompt = new Select({
            message: 'Please select a license for your project',
            choices: licenses
        });
        projectLicense = yield licensePrompt.run();
        // author
        const authorPrompt = new Input({
            message: 'Project author'
        });
        projectAuthor = yield authorPrompt.run();
        // folder
        const folderPrompt = new Input({
            message: 'Project folder',
            initial: `${process.cwd()}/${projectName}`
        });
        projectFolder = yield folderPrompt.run();
        // confirmation
        const confirmPrompt = new Confirm({
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
            const packageJson = require(`${projectFolder}/package.json`);
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
            const openVsCodeConfirm = new Confirm({
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
        const launchDevStackConfirm = new Confirm({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmVJbml0LmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0aXZlSW5pdC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFDOUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUU3RSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLGVBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRTs7UUFFekQsTUFBTSxVQUFVLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsSUFBSSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLENBQUM7UUFFckcsZ0JBQWdCO1FBQ2hCLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDeEIs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