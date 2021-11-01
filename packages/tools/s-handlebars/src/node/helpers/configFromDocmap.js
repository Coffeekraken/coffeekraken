/**
 * @name            configFromDocmap
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to extract from the passed docmap some config
 *
 * @param       {Any}           docmap          The source docmap
 * @param       {String}        path            The dotpath to the config you want to extract
 * @return      {Any}                           THe object representing each configs docmap object
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function configFromDocmap(docmap, path) {
    const newObj = {};
    Object.keys(docmap.map).forEach((namespace) => {
        if (!namespace.includes(path + '.'))
            return;
        newObj[namespace.replace(path + '.', '')] = docmap.map[namespace];
    });
    return newObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnRnJvbURvY21hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZ0Zyb21Eb2NtYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFXLEVBQUUsSUFBWTtJQUM5RCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=