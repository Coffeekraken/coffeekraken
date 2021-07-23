export default function sCodeExampleHandlebarsHelper(settings) {
    return function (context, options) {
        return 'Jeéép world';
    };
    //     return {
    //         extract(source): ISMarkdownBuilderSCodeExampleHandlebarsHelperParams[] | undefined {
    //             const matches = source.match(/^```\s?([a-zA-Z0-9]+)\n([^:```]*)\n```/gm);
    //             if (!matches) {
    //                 return;
    //             }
    //             const items: ISMarkdownBuilderSCodeExampleHandlebarsHelperParams[] = [];
    //             matches.forEach(match => {
    //                 const raw = match;
    //                 match = match.replace(/^```/, '').replace(/```$/, '');
    //                 const language = match.split('\n')[0].trim();
    //                 const code = match.split('\n').slice(1).join('\n');
    //                 items.push({
    //                     raw,
    //                     language,
    //                     code
    //                 });
    //             });
    //             return items;
    //         },
    //         render(params: ISMarkdownBuilderSCodeExampleHandlebarsHelperParams, target) {
    //             switch(target) {
    //                 case 'html':
    //                     return `
    // <s-code-example><template lang="${params.language}">
    // ${params.code.trim()}
    // </template></s-code-example>`
    //                 break;
    //             }
    //         }
    //     }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0NvZGVFeGFtcGxlSGFuZGxlYmFyc0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNDb2RlRXhhbXBsZUhhbmRsZWJhcnNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJBLE1BQU0sQ0FBQyxPQUFPLFVBQVUsNEJBQTRCLENBQUMsUUFBeUU7SUFFMUgsT0FBTyxVQUFVLE9BQU8sRUFBRSxPQUFPO1FBRTdCLE9BQU8sYUFBYSxDQUFDO0lBRXpCLENBQUMsQ0FBQTtJQUVMLGVBQWU7SUFDZiwrRkFBK0Y7SUFFL0Ysd0ZBQXdGO0lBRXhGLDhCQUE4QjtJQUM5QiwwQkFBMEI7SUFDMUIsZ0JBQWdCO0lBRWhCLHVGQUF1RjtJQUV2Rix5Q0FBeUM7SUFDekMscUNBQXFDO0lBQ3JDLHlFQUF5RTtJQUN6RSxnRUFBZ0U7SUFDaEUsc0VBQXNFO0lBQ3RFLCtCQUErQjtJQUMvQiwyQkFBMkI7SUFDM0IsZ0NBQWdDO0lBQ2hDLDJCQUEyQjtJQUMzQixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBRWxCLDRCQUE0QjtJQUM1QixhQUFhO0lBQ2Isd0ZBQXdGO0lBQ3hGLCtCQUErQjtJQUMvQiwrQkFBK0I7SUFDL0IsK0JBQStCO0lBQy9CLHVEQUF1RDtJQUN2RCx3QkFBd0I7SUFDeEIsZ0NBQWdDO0lBQ2hDLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFFBQVE7QUFFUixDQUFDIn0=