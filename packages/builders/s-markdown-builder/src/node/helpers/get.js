import __get from '@coffeekraken/sugar/shared/object/get';
export default function get(object, path, resolveDots = true, insidePath = null) {
    let res;
    if (resolveDots) {
        res = __get(object, path);
    }
    else {
        res = object[path];
    }
    if (insidePath) {
        return __get(res, insidePath);
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBRzFELE1BQU0sQ0FBQyxPQUFPLFVBQVUsR0FBRyxDQUN2QixNQUFNLEVBQ04sSUFBSSxFQUNKLFdBQVcsR0FBRyxJQUFJLEVBQ2xCLFVBQVUsR0FBRyxJQUFJO0lBRWpCLElBQUksR0FBRyxDQUFDO0lBQ1IsSUFBSSxXQUFXLEVBQUU7UUFDYixHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM3QjtTQUFNO1FBQ0gsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QjtJQUNELElBQUksVUFBVSxFQUFFO1FBQ1osT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDIn0=