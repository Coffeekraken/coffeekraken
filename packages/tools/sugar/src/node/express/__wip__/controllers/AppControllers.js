"use strict";
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
    config: async (req, res) => {
        let value;
        if (req.params[0]) {
            value = await Squid.config(req.params[0]);
        }
        else {
            value = await Squid.config();
        }
        res.send(value);
    },
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
    js: async (req, res) => {
        // read the common squid framework file
        const squidCommon = __fs.readFileSync(`${__dirname}/../../../../${await Squid.config('dist.js.outputFolder')}/common.bundle.js`);
        // read the common project file
        const projectCommon = __fs.readFileSync(`${process.cwd()}/${await Squid.config('dist.js.outputFolder')}/common.bundle.js`);
        let resultingScript = `${squidCommon}${projectCommon}`;
        // resultingScript += `
        //   window.__squid = {
        //     config: '${__base64.encrypt(JSON.stringify(Squid.config))}',
        //     meta: '${__base64.encrypt(JSON.stringify(require(process.cwd() + '/package.json')))}'
        //   };`;
        // send gziped javascript files Content
        res.send(resultingScript);
    }
};
