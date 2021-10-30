export default function configFileNameFromDocmapPath(path: string): any {
    if (!path.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
        throw new Error(
            `Sorry but the passed config path "${path}" is not a valid one and does not exists in the docmap`,
        );
    }
    return `${path.split('.').pop()}.config.js`;
}
