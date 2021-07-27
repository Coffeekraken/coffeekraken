var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __childProcess from 'child_process';
import * as Enquirer from 'enquirer';
import __fs from 'fs';
import SFrontstack from "../node/SFrontstack";
export default function createProject({ emit, ask, log, exec, writeLog, safeExec }) {
    return __awaiter(this, void 0, void 0, function* () {
        const frontstack = new SFrontstack();
        const recipes = frontstack.listRecipes();
        let selectedRecipeObj;
        // recipe choice
        const choices = [];
        for (const [name, obj] of Object.entries(recipes)) {
            choices.push(`${name}: ${obj.description}`);
        }
        let recipe = yield ask({
            type: 'autocomplete',
            message: 'Please select a recipe that suits your needs',
            choices
        });
        for (const [name, obj] of Object.entries(recipes)) {
            if (recipe === `${name}: ${obj.description}`) {
                selectedRecipeObj = obj;
                break;
            }
        }
        // project name
        const projectName = yield ask({
            type: 'input',
            message: 'Project name',
            validate(...args) {
                if (!args[0].match(/^[a-zA-Z0-9-_@\\/]+$/))
                    return `Please do not use spaces or special characters other than "@" and "/"`;
                return true;
            }
        });
        // project name
        const projectDescription = yield ask({
            type: 'input',
            message: 'Project description'
        });
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
        const projectLicense = yield ask({
            type: 'autocomplete',
            message: 'Please select a license for your project',
            choices: licenses
        });
        // author
        const projectAuthor = yield ask({
            type: 'input',
            message: 'Project author'
        });
        // folder
        const projectFolder = yield ask({
            type: 'input',
            message: 'Project folder',
            initial: `${process.cwd()}/${projectName}`
        });
        // confirmation
        const confirmRes = yield ask({
            type: 'confirm',
            message: 'Process to new project initialisation?',
            initial: true
        });
        if (!confirmRes) {
            log(`The new project setup process has been canceled`);
            process.exit();
        }
        // ensure we have the folder
        log('- Ensure the project folder exists');
        __ensureDirSync(projectFolder);
        // move into the project
        log(`- Init the new project folder with the template of the "<yellow>${selectedRecipeObj.title}</yellow>" recipe`);
        __copySync(selectedRecipeObj.templateDir, projectFolder);
        // set the project name
        log(`- Set the project name and description in some files like package.json`);
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
        log(`- Installing dependencies using ${isYarn ? 'yarn' : 'npm'}...`);
        const npmInitRes = yield safeExec(command, {
            cwd: projectFolder
        });
        let errorStr;
        if (npmInitRes.stderr) {
            errorStr = npmInitRes.stderr.toString();
            if (errorStr !== '' && !errorStr.match(/^warning\s/)) {
                log(`<red>[${isYarn ? 'yarn' : 'npm'}] Error during the dependencies instalation. More details in the sugar.log file at the root of your project</red>`);
                writeLog(npmInitRes.stderr.toString());
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
            log(`<green>[success]</green> Congrats, your new project "<yellow>${projectName}</yellow>" has been <green>successfully</green> initialised!`);
            process.exit();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUHJvamVjdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGVQcm9qZWN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDOztRQUVuRixNQUFNLFVBQVUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QyxJQUFJLGlCQUFpQixDQUFDO1FBRXRCLGdCQUFnQjtRQUNoQixNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDN0IsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDO1lBQ25CLElBQUksRUFBRSxjQUFjO1lBQ3BCLE9BQU8sRUFBRSw4Q0FBOEM7WUFDekQsT0FBTztTQUNSLENBQUMsQ0FBQztRQUVILEtBQUksTUFBTSxDQUFDLElBQUks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