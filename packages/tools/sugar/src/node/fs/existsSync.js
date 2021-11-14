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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4aXN0c1N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBZ0N0QixNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FDOUIsSUFBWSxFQUNaLFFBQW1DO0lBRW5DLE1BQU0sR0FBRyxtQkFDTCxTQUFTLEVBQUUsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLElBQUksSUFDVixDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksU0FBUyxHQUFHLEtBQUssRUFDakIsS0FBVSxDQUFDO0lBRWYsSUFBSTtRQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekIsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN0QztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxJQUFJLFNBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3hELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM5QyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=