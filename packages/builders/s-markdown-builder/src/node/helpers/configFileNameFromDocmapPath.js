export default function configFileNameFromDocmapPath(path) {
    if (!path.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
        throw new Error(`Sorry but the passed config path "${path}" is not a valid one and does not exists in the docmap`);
    }
    return `${path.split('.').pop()}.config.js`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnRmlsZU5hbWVGcm9tRG9jbWFwUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZ0ZpbGVOYW1lRnJvbURvY21hcFBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sVUFBVSw0QkFBNEIsQ0FBQyxJQUFZO0lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLEVBQUU7UUFDOUQsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQ0FBcUMsSUFBSSx3REFBd0QsQ0FDcEcsQ0FBQztLQUNMO0lBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQztBQUNoRCxDQUFDIn0=