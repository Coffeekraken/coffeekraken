import __fs from 'fs';
export default function __existsSync(path, settings) {
    const set = Object.assign({ directory: true, file: true, symlink: true }, (settings || {}));
    let isSymlink = false, stats;
    try {
        stats = __fs.statSync(path);
        if (!stats)
            return false;
        isSymlink = stats.isSymbolicLink();
    }
    catch (e) {
        return false;
    }
    if (isSymlink && !set.symlink)
        return false;
    if (stats.isDirectory() && !set.directory)
        return false;
    if (stats.isFile() && !set.file)
        return false;
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQWdDdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQ2hDLElBQVksRUFDWixRQUFtQztJQUVuQyxNQUFNLEdBQUcsbUJBQ0wsU0FBUyxFQUFFLElBQUksRUFDZixJQUFJLEVBQUUsSUFBSSxFQUNWLE9BQU8sRUFBRSxJQUFJLElBQ1YsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLFNBQVMsR0FBRyxLQUFLLEVBQ2pCLEtBQVUsQ0FBQztJQUVmLElBQUk7UUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdEM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsSUFBSSxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN4RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDOUMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9