// @ts-nocheck

import * as vscode from 'vscode';
import __colors from './colors.js';

export interface IPopinContentMetas {
    title: string;
}

export default function popinContent(
    docmapObj: any,
    metas?: Partial<IPopinContentMetas>,
): void {
    const params = docmapObj.param ?? {},
        settings = docmapObj.setting ?? {};

    const content = `## ${
        docmapObj.async
            ? `<span style="color:${__colors.yellow};">async</span>`
            : ''
    } ${metas?.title ?? `__${docmapObj.name}`}
<span style="color:${__colors.grey};">${docmapObj.id}</span><br/>
Status: <span style="color:${
        docmapObj.status === 'beta'
            ? __colors.red
            : docmapObj.status === 'stable'
            ? __colors.green
            : __colors.red
    };">**${docmapObj.status ?? 'beta'}**</span> | Since: <span style="color:${
        __colors.magenta
    };">**${docmapObj.since ?? '...'}**</span>

${Object.keys(params)
    .map((param) => {
        const paramObj = params[param];
        return `
@param ${'&nbsp;'.repeat(5)} <span style="color:${__colors.yellow};">**${
            paramObj.defaultStr ? `[${param}=${paramObj.defaultStr}]` : param
        }**</span> - <span style="color:${__colors.cyan};">{${
            paramObj.type.raw
        }}</span><br/>
${paramObj.description}`;
    })
    .join('\n')}
${
    docmapObj.return
        ? `
@return ${'&nbsp;'.repeat(5)} <span style="color:${__colors.cyan};">{${
              docmapObj.return.type.raw
          }}</span><br/>
${docmapObj.return.description}`
        : ''
}

${
    Object.keys(settings).length
        ? `
### Settings
`
        : ''
}

${Object.keys(settings)
    .map((setting) => {
        const settingObj = settings[setting];
        return `
@setting ${'&nbsp;'.repeat(5)} <span style="color:${__colors.yellow};">**${
            settingObj.defaultStr
                ? `[${setting}=${settingObj.defaultStr}]`
                : setting
        }**</span> - <span style="color:${__colors.cyan};">{${
            settingObj.type.raw
        }}</span><br/>
${settingObj.description}`;
    })
    .join('\n')}

${docmapObj.example
    ?.map?.(
        (exampleObj) => `
### ${exampleObj.title ?? 'Example'} (${exampleObj.language})

\`\`\`${exampleObj.language}
${exampleObj.code}
\`\`\`
`,
    )
    .join('\n')}

### Description

${docmapObj.description}

${
    docmapObj.author
        ? `### Author

- ${docmapObj.author.name} [${docmapObj.author.email}](mailto:${docmapObj.author.email})`
        : ''
}

### More

![Coffeekraken](https://cdnv2.coffeekraken.io/global/coffeekraken-logo-vscode-popin.png)

- [Full documentation](https://coffeekraken.io/api/${docmapObj.id})
- [Report an issue](https://github.com/Coffeekraken/coffeekraken/issues)
- [Join us on Discord](https://discord.com/login?redirect_to=%2Fchannels%2F940362961682333767%2F940362962223378494)


    `;

    const docs: any = new vscode.MarkdownString(content);
    docs.supportHtml = true;
    docs.isTrusted = true;
    return docs;
}
