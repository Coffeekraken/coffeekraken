/**
 * @name            jsonStringify
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to stringify an object
 *
 * @param       {Object}        object      The object to stringify
 * @param       {Any}           arg1        The arg 1 of the JSON.stringify function
 * @param       {Number}        [tabWidth=4]        How many spaces tab has to be
 * @return      {String}                    The stringified object
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function jsonStringify(object, arg1, tabWidth = 4) {
    return JSON.stringify(object, arg1, tabWidth);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvblN0cmluZ2lmeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb25TdHJpbmdpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUM7SUFDNUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9