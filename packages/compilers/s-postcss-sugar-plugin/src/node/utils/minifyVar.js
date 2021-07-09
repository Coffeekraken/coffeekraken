// import __shorter from 'shorter';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
export default function minifyVar(variableStr) {
    const encoded = __md5.encrypt(variableStr.replace(/^--/, ''));
    const minifiedArray = [];
    let cur = 0, every = 3;
    encoded.split('').forEach((char, i) => {
        if (!cur)
            minifiedArray.push(char);
        cur++;
        if (cur >= every)
            cur = 0;
    });
    return '--s' + minifiedArray.join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaWZ5VmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWluaWZ5VmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxXQUFtQjtJQUNqRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUQsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO0lBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxHQUFHO1lBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksR0FBRyxJQUFJLEtBQUs7WUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUUxQyxDQUFDIn0=