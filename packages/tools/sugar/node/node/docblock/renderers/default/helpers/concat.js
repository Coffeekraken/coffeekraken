"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'concat',
    args: {},
    helper: function concat({ settings }) {
        var result = '';
        for (var i in arguments) {
            result += (typeof arguments[i] === 'string' ? arguments[i] : '') + ' ';
        }
        return result;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvZG9jYmxvY2svcmVuZGVyZXJzL2RlZmF1bHQvaGVscGVycy9jb25jYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxRQUFRO0lBQ1osSUFBSSxFQUFFLEVBQUU7SUFDUixNQUFNLEVBQUUsU0FBUyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDbEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLEtBQUssSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDeEU7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQyJ9