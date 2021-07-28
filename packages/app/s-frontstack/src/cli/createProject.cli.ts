import __commandExists from '@coffeekraken/sugar/node/command/commandExists';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __childProcess from 'child_process';
import * as Enquirer from 'enquirer';
import __fs from 'fs';
import __SFrontstack from "../node/SFrontstack";
import __SPromise from '@coffeekraken/s-promise';

export default function createProject() {
    
    return new __SPromise(async ({resolve, reject, emit, pipe}) => {

    const frontstack = new __SFrontstack();
    const recipes = frontstack.listRecipes();
    let selectedRecipeObj;

    // recipe choice
    const choices: string[] = [];
    for (const [name, obj] of Object.entries(recipes)) {
      choices.push(`> ${name}: ${obj.description}`);
    }   
    let recipe = await emit('ask', {
        type: 'autocomplete',
        message: 'Please select a recipe that suits your needs',
      choices
    });
    
    for(const [name, obj] of Object.entries(recipes)) {
      if (recipe === `> ${name}: ${obj.description}`) {
        selectedRecipeObj = obj;
        break;
      }
    }

    // project name
    const projectName = await emit('ask', {
        type: 'input',
        message: 'Project name',
        validate(...args) {
            if (!args[0].match(/^[a-zA-Z0-9-_@\\/]+$/)) return `Please do not use spaces or special characters other than "@" and "/"`;
            return true;
        }
    });

     // project name
     const projectDescription = await emit('ask', {
         type: 'input',
            message: 'Project description'
     });

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
    const projectLicense = (await emit('ask', {
        type: 'autocomplete',
        message: 'Please select a license for your project',
        choices: licenses.map(l => `> ${l}`)
    })).replace('> ', '');

     // author
     const projectAuthor = await emit('ask', {
         type: 'input',
         message: 'Project author'
     });
    
    // folder
    const projectFolder = await emit('ask', {
        type: 'input',
        message: 'Project folder',
        initial: `${process.cwd()}/${projectName}`
    });
    
    // confirmation
    const confirmRes = await emit('ask', {
        type: 'confirm',
        message: 'Process to new project initialisation?',
        initial: true
    });
    
    if (!confirmRes) {
        emit('log', {
            value: `The new project setup process has been canceled`
        });
        process.exit();
    }

    // ensure we have the folder
    emit('log', {
        value: '- Ensure the project folder exists'
    });
    __ensureDirSync(projectFolder);

    // move into the project
    emit('log', {
        value: `- Init the new project folder with the template of the "<yellow>${selectedRecipeObj.title}</yellow>" recipe`
    });
    __copySync(selectedRecipeObj.templateDir, projectFolder);

    // set the project name
    emit('log', {
        value: `- Set the project name and description in some files like package.json`
    });
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
    emit('log', {
        value: `- Installing dependencies using ${isYarn ? 'yarn' : 'npm'}...`
    });
    const npmInitRes = __childProcess.spawnSync(command, [], {
        shell: true,
        cwd: projectFolder
    });
    let errorStr;
    if (npmInitRes.stderr) {
        errorStr = npmInitRes.stderr.toString();
        if (errorStr !== '' && !errorStr.match(/^warning\s/)) {
            emit('log', {
                value: `<red>[${isYarn ? 'yarn' : 'npm'}] Error during the dependencies instalation. More details in the sugar.log file at the root of your project</red>`
            });
            emit('writeLog', {
                value: npmInitRes.stderr.toString()
            });
        }
    }

    // check if has code installed
    if (await __commandExists('code')) {
        // launch development stack
        const openVsCodeConfirmRes = await emit('ask', {
            type: 'confirm',
            message: 'Open the new project in VSCode?',
            initial: true
        });

        if (openVsCodeConfirmRes) {
            __childProcess.spawnSync('code .', [], {
                shell: true,
                cwd: projectFolder
            });
        }
    }

    // launch development stack
    const launchDevStackConfirmRes = await emit('ask', {
        type: 'confirm',
        message: 'Launch development stack?',
        initial: true
    });

    if (launchDevStackConfirmRes) {
        __childProcess.spawnSync(`npm run dev`, [], {
            shell: true,
            cwd: projectFolder
        });
    } else {
        emit('log', {
            value: `<green>[success]</green> Congrats, your new project "<yellow>${projectName}</yellow>" has been <green>successfully</green> initialised!`
        });
        process.exit();
    }

    }, {
        metas: {
            id: 'new.project'
        }
    });
}