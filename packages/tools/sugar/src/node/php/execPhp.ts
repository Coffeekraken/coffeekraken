import __childProcess from 'child_process';

/**
 * @name            execPhp
 * @namespace       node.php
 * @type            Function
 * @platform        node
 * @platform        ts
 * @status          beta
 * 
 * This function allows you to execute quickly and efficiently some php
 * from nodejs.
 * Note that you MUST have php installed on your system and available a global command.
 * 
 * 
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function execPhp(scriptPath: string, params: any) {

    return new Promise((resolve, reject) => {

        const paramsStr = JSON.stringify(params ?? {});

        const result = __childProcess.spawnSync(`php ${scriptPath} '${paramsStr}'`, [], {
            shell: true
        });

        if (result.stderr.toString()) {
            return reject(result.stderr.toString());
        }

        resolve(result.stdout.toString());

    });

}