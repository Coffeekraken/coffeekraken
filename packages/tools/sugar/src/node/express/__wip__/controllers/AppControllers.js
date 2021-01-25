"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    /**
     * @name                          config
     * @namespace           sugar.node.express.controllers.AppControllers
     * @type                          Function
     *
     * Return the whole configuration object or the specified value requested using the dot formated object key.
     *
     * @param                     {Object}                      req                     The express "req" object
     * @param                     {Object}                      res                     The express "res" object
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    config: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let value;
        if (req.params[0]) {
            value = yield Squid.config(req.params[0]);
        }
        else {
            value = yield Squid.config();
        }
        res.send(value);
    }),
    /**
     * @name                          meta
     * @namespace           sugar.node.express.controllers.AppControllers
     * @type                          Function
     *
     * Return the application meta data
     *
     * @param                     {Object}                      req                     The express "req" object
     * @param                     {Object}                      res                     The express "res" object
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    meta: (req, res) => {
        let value;
        if (req.params[0]) {
            value = Squid.meta(req.params[0]);
        }
        else {
            value = Squid.meta();
        }
        res.send(value);
    },
    /**
     * @name                js
     * @namespace           sugar.node.express.controllers.AppControllers
     * @type                Function
     *
     * Handle the base javascript route that serve the global and common files
     *
     * @param         {Object}        req           The req express object
     * @param         {Object}        res            The res express object
     *
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    js: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // read the common squid framework file
        const squidCommon = __fs.readFileSync(`${__dirname}/../../../../${yield Squid.config('dist.js.outputFolder')}/common.bundle.js`);
        // read the common project file
        const projectCommon = __fs.readFileSync(`${process.cwd()}/${yield Squid.config('dist.js.outputFolder')}/common.bundle.js`);
        let resultingScript = `${squidCommon}${projectCommon}`;
        // resultingScript += `
        //   window.__squid = {
        //     config: '${__base64.encrypt(JSON.stringify(Squid.config))}',
        //     meta: '${__base64.encrypt(JSON.stringify(require(process.cwd() + '/package.json')))}'
        //   };`;
        // send gziped javascript files Content
        res.send(resultingScript);
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwQ29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBcHBDb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZjs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN6QixJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlCO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUE7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNqQixJQUFJLEtBQUssQ0FBQztRQUVWLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7UUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEVBQUUsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNyQix1Q0FBdUM7UUFDdkMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FDbkMsR0FBRyxTQUFTLGdCQUFnQixNQUFNLEtBQUssQ0FBQyxNQUFNLENBQzVDLHNCQUFzQixDQUN2QixtQkFBbUIsQ0FDckIsQ0FBQztRQUNGLCtCQUErQjtRQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUNyQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxNQUFNLEtBQUssQ0FBQyxNQUFNLENBQ3BDLHNCQUFzQixDQUN2QixtQkFBbUIsQ0FDckIsQ0FBQztRQUVGLElBQUksZUFBZSxHQUFHLEdBQUcsV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBQ3ZELHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsbUVBQW1FO1FBQ25FLDRGQUE0RjtRQUM1RixTQUFTO1FBRVQsdUNBQXVDO1FBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFBO0NBQ0YsQ0FBQyJ9