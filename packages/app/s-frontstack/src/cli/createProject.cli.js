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
import __fs from 'fs';
import __SFrontstack from '../node/SFrontstack';
import __SPromise from '@coffeekraken/s-promise';
export default function createProject(_recipe) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const frontstack = new __SFrontstack();
        const recipes = frontstack.listRecipes();
        let selectedRecipeObj;
        // recipe choice
        const choices = [];
        for (const [name, obj] of Object.entries(recipes)) {
            choices.push(`> ${name}: ${obj.description}`);
        }
        let recipe;
        if (_recipe) {
            recipe = _recipe.trim();
        }
        else {
            recipe = yield emit('ask', {
                type: 'autocomplete',
                message: 'Please select a recipe that suits your needs',
                choices,
            });
        }
        for (const [name, obj] of Object.entries(recipes)) {
            if (recipe === `> ${name}: ${obj.description}`) {
                selectedRecipeObj = obj;
                break;
            }
        }
        // project name
        const projectName = yield emit('ask', {
            type: 'input',
            message: 'Project name',
            validate(...args) {
                if (!args[0].match(/^[a-zA-Z0-9-_@\\/]+$/))
                    return `Please do not use spaces or special characters other than "@" and "/"`;
                return true;
            },
        });
        // project name
        const projectDescription = yield emit('ask', {
            type: 'input',
            message: 'Project description',
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
            'EPL-2.0',
        ];
        const projectLicense = (yield emit('ask', {
            type: 'autocomplete',
            message: 'Please select a license for your project',
            choices: licenses.map((l) => `> ${l}`),
        })).replace('> ', '');
        // author
        const projectAuthor = yield emit('ask', {
            type: 'input',
            message: 'Project author',
        });
        // folder
        const projectFolder = yield emit('ask', {
            type: 'input',
            message: 'Project folder',
            initial: `${process.cwd()}/${projectName}`,
        });
        // confirmation
        const confirmRes = yield emit('ask', {
            type: 'confirm',
            message: 'Process to new project initialisation?',
            initial: true,
        });
        if (!confirmRes) {
            emit('log', {
                value: `The new project setup process has been canceled`,
            });
            process.exit();
        }
        // ensure we have the folder
        emit('log', {
            value: '- Ensure the project folder exists',
        });
        __ensureDirSync(projectFolder);
        // move into the project
        emit('log', {
            value: `- Init the new project folder with the template of the "<yellow>${selectedRecipeObj.title}</yellow>" recipe`,
        });
        __copySync(selectedRecipeObj.templateDir, projectFolder);
        // set the project name
        emit('log', {
            value: `- Set the project name and description in some files like package.json`,
        });
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
        emit('log', {
            value: `- Installing dependencies using ${isYarn ? 'yarn' : 'npm'}...`,
        });
        const npmInitRes = __childProcess.spawnSync(command, [], {
            shell: true,
            cwd: projectFolder,
        });
        let errorStr;
        if (npmInitRes.stderr) {
            errorStr = npmInitRes.stderr.toString();
            if (errorStr !== '' && !errorStr.match(/^warning\s/)) {
                emit('log', {
                    value: `<red>[${isYarn ? 'yarn' : 'npm'}] Error during the dependencies instalation. More details in the sugar.log file at the root of your project</red>`,
                });
                emit('writeLog', {
                    value: npmInitRes.stderr.toString(),
                });
            }
        }
        // check if has code installed
        if (yield __commandExists('code')) {
            // launch development stack
            const openVsCodeConfirmRes = yield emit('ask', {
                type: 'confirm',
                message: 'Open the new project in VSCode?',
                initial: true,
            });
            if (openVsCodeConfirmRes) {
                __childProcess.spawnSync('code .', [], {
                    shell: true,
                    cwd: projectFolder,
                });
            }
        }
        // launch development stack
        const launchDevStackConfirmRes = yield emit('ask', {
            type: 'confirm',
            message: 'Launch development stack?',
            initial: true,
        });
        if (launchDevStackConfirmRes) {
            __childProcess.spawnSync(`npm run dev`, [], {
                shell: true,
                cwd: projectFolder,
            });
        }
        else {
            emit('log', {
                value: `<green>[success]</green> Congrats, your new project "<yellow>${projectName}</yellow>" has been <green>successfully</green> initialised!`,
            });
            process.exit();
        }
    }), {
        metas: {
            id: 'new.project',
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUHJvamVjdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGVQcm9qZWN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLE9BQWdCO0lBQ2xELE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDdkMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksaUJBQWlCLENBQUM7UUFFdEIsZ0JBQWdCO1FBQ2hCLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLE9BQU8sRUFBRTtZQUNULE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDM0I7YUFBTTtZQUNILE1BQU0sR0FBRyxN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