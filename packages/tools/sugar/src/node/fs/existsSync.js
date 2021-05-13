import __fs from 'fs';
export default function existsSync(path, settings) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4aXN0c1N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBK0J0QixNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FDaEMsSUFBWSxFQUNaLFFBQW1DO0lBRW5DLE1BQU0sR0FBRyxtQkFDUCxTQUFTLEVBQUUsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLElBQUksSUFDVixDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksU0FBUyxHQUFHLEtBQUssRUFDbkIsS0FBVSxDQUFDO0lBRWIsSUFBSTtRQUNGLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekIsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNwQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksU0FBUyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDeEQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzlDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyJ9