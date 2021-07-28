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
import __SFrontstack from "../node/SFrontstack";
import __SPromise from '@coffeekraken/s-promise';
export default function createProject() {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const frontstack = new __SFrontstack();
        const recipes = frontstack.listRecipes();
        let selectedRecipeObj;
        // recipe choice
        const choices = [];
        for (const [name, obj] of Object.entries(recipes)) {
            choices.push(`> ${name}: ${obj.description}`);
        }
        let recipe = yield emit('ask', {
            type: 'autocomplete',
            message: 'Please select a recipe that suits your needs',
            choices
        });
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
            }
        });
        // project name
        const projectDescription = yield emit('ask', {
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
        const projectLicense = (yield emit('ask', {
            type: 'autocomplete',
            message: 'Please select a license for your project',
            choices: licenses.map(l => `> ${l}`)
        })).replace('> ', '');
        // author
        const projectAuthor = yield emit('ask', {
            type: 'input',
            message: 'Project author'
        });
        // folder
        const projectFolder = yield emit('ask', {
            type: 'input',
            message: 'Project folder',
            initial: `${process.cwd()}/${projectName}`
        });
        // confirmation
        const confirmRes = yield emit('ask', {
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
        if (yield __commandExists('code')) {
            // launch development stack
            const openVsCodeConfirmRes = yield emit('ask', {
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
        const launchDevStackConfirmRes = yield emit('ask', {
            type: 'confirm',
            message: 'Launch development stack?',
            initial: true
        });
        if (launchDevStackConfirmRes) {
            __childProcess.spawnSync(`npm run dev`, [], {
                shell: true,
                cwd: projectFolder
            });
        }
        else {
            emit('log', {
                value: `<green>[success]</green> Congrats, your new project "<yellow>${projectName}</yellow>" has been <green>successfully</green> initialised!`
            });
            process.exit();
        }
    }), {
        metas: {
            id: 'new.project'
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlUHJvamVjdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGVQcm9qZWN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYTtJQUVqQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFFO1FBRTlELE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDdkMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksaUJBQWlCLENBQUM7UUFFdEIsZ0JBQWdCO1FBQ2hCLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzNCLElBQUksRUFBRSxjQUFjO1lBQ3BCLE9BQU8sRUFBRSw4Q0FBOEM7WUFDekQsT0FBTztTQUNSLENBQUMsQ0FBQztRQUVI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