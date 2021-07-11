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
import * as Enquirer from 'enquirer';
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
        const prompt = new Enquirer.Select({
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
        const namePrompt = new Enquirer.Input({
            message: 'Project name',
            validate(...args) {
                if (!args[0].match(/^[a-zA-Z0-9-_@\\/]+$/))
                    return `Please do not use spaces or special characters other than "@" and "/"`;
                return true;
            }
        });
        projectName = yield namePrompt.run();
        // project name
        const descriptionPrompt = new Enquirer.Input({
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
        const licensePrompt = new Enquirer.Select({
            message: 'Please select a license for your project',
            choices: licenses
        });
        projectLicense = yield licensePrompt.run();
        // author
        const authorPrompt = new Enquirer.Input({
            message: 'Project author'
        });
        projectAuthor = yield authorPrompt.run();
        // folder
        const folderPrompt = new Enquirer.Input({
            message: 'Project folder',
            initial: `${process.cwd()}/${projectName}`
        });
        projectFolder = yield folderPrompt.run();
        // confirmation
        const confirmPrompt = new Enquirer.Confirm({
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
            const openVsCodeConfirm = new Enquirer.Confirm({
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
        const launchDevStackConfirm = new Enquirer.Confirm({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmVJbml0LmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0aXZlSW5pdC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxXQUFXLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFDOUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUU3RSxPQUFPLEtBQUssUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVyQyxNQUFNLENBQUMsT0FBTyxVQUFnQixlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBRXpELE1BQU0sVUFBVSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixDQUFDO1FBRXJHLGdCQUFnQjtRQUNoQixNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDN0IsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM3QztRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNqQyxPQUFPLEVBQUUsOENBQThDO1lBQ3ZELE9BQU87U0FDUixDQUFDLENB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