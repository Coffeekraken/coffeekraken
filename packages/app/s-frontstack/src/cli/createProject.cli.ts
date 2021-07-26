import SFrontstack from "../node/SFrontstack";
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __fs from 'fs';
import __childProcess from 'child_process';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';

import * as Enquirer from 'enquirer';

export default async function createProject(stringArgs = '') {
    
    const frontstack = new SFrontstack();
    const recipes = frontstack.listRecipes();
    let selectedRecipeObj, projectName, projectFolder, projectLicense, projectAuthor, projectDescription;

    // recipe choice
    const choices: string[] = [];
    for (const [name, obj] of Object.entries(recipes)) {
      choices.push(`${name}: ${obj.description}`);
    }    
    const prompt = new Enquirer.default.Select({
      message: 'Please select a recipe that suits your needs',
      choices
    });
    const res = await prompt.run();
    for(const [name, obj] of Object.entries(recipes)) {
      if (res === `${name}: ${obj.description}`) {
        selectedRecipeObj = obj;
        break;
      }
    }

    // project name
    const namePrompt = new Enquirer.default.Input({
        message: 'Project name',
        validate(...args) {
            if (!args[0].match(/^[a-zA-Z0-9-_@\\/]+$/)) return `Please do not use spaces or special characters other than "@" and "/"`;
            return true;
        }
    });
    projectName = await namePrompt.run();

     // project name
    const descriptionPrompt = new Enquirer.default.Input({
        message: 'Project description'
    });
    projectDescription = await descriptionPrompt.run();

    // licence choice
    const licenses: string[] = [
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
    projectLicense = await licensePrompt.run();

     // author
    const authorPrompt = new Enquirer.default.Input({
        message: 'Project author'
    });
    projectAuthor = await authorPrompt.run();

    // folder
    const folderPrompt = new Enquirer.default.Input({
        message: 'Project folder',
        initial: `${process.cwd()}/${projectName}`
    });
    projectFolder = await folderPrompt.run();

    // confirmation
    const confirmPrompt = new Enquirer.default.Confirm({
        message: 'Process to new project initialisation?',
        initial: true
    });
    const confirmRes = await confirmPrompt.run();

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
        const packageJson = await import(`${projectFolder}/package.json`);
        packageJson.name = projectName;
        packageJson.description = projectDescription ?? '';
        packageJson.license = projectLicense ?? 'MIT';
        packageJson.author = projectAuthor;
        __fs.writeFileSync(`${projectFolder}/package.json`, JSON.stringify(packageJson, null, 4));
    } catch(e) {}

    // install dependencies
    const isYarn = await __commandExists('yarn');
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
    if (await __commandExists('code')) {
        // launch development stack
        const openVsCodeConfirm = new Enquirer.default.Confirm({
            message: 'Open the new project in VSCode?',
            initial: true
        });
        const openVsCodeConfirmRes = await openVsCodeConfirm.run();

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
    const launchDevStackConfirmRes = await launchDevStackConfirm.run();

    if (launchDevStackConfirmRes) {
        __childProcess.spawnSync(`npm run dev`, [], {
            shell: true,
            cwd: projectFolder
        });
    } else {
        console.log(__parseHtml(`<green>[success]</green> Congrats, your new project "<yellow>${projectName}</yellow>" has been <green>successfully</green> initialised!`));
        process.exit();
    }

}