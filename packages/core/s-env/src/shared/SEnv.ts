import __isNode from '@coffeekraken/sugar/shared/is/node';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

// @ts-ignore
if (!__isNode() && !window.env) {
  // @ts-ignore
  window.env = {
    SUGAR: {}
  };
}
else process.env.SUGAR = JSON.stringify({});

/**
 * @name            SEnv
 * @namespace       s-env.shared
 * @type            Class
 *
 * This class allows you to access, set and update environment variables seemlessly on node
 * and browser env.
 * You can also check if the environment is a dev one or a production using the
 * helpfull ```is``` function like so: ```sEnv.is('prod')```
 *
 * @todo         doc
 * @todo        tests
 * @todo        add possibility to set a "details" on each rules for better returns
 *
 * @example         js
 * import SEnv from '@coffeekraken/s-env';
 * this.get('something');
 * SEnv.is('prod');
 * SEnv.is('production');
 * SEnv.is('dev');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// @ts-ignore
export default class SEnv {
  
  static constructed = false;
  static construct() {
    this.constructed = true;
    // Set environment
    SEnv.set('environment', process?.env?.NODE_ENV ?? window?.env?.ENV ?? 'dev');
  }

  /**
   * @name        env
   * @type        Object
   * @static
   * 
   * Store the actual environment variables object. In node it will be process.env, in the browser,
   * window.env
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static get env() {
    if (!this.constructed) this.construct();
    // @ts-ignore
    if (__isNode()) return JSON.parse(process.env.SUGAR);
    // @ts-ignore
    return window.env.SUGAR;
  }
  static set env(value) {
    if (__isNode()) process.env.SUGAR = JSON.stringify(value);
    // @ts-ignore
    else window.env.SUGAR = value;
  }

  /**
   * @name        is
   * @type        Function
   * @static
   * 
   * This static method allows you to check if the environment
   * is "dev", "development", "prod" or "production"
   * 
   * @param     {String}      env       The environment you want to check
   * @return    {Boolean}               true if is the passed environment, false if not
   * 
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static is(env: string): boolean {
    env = env.toLowerCase();
    if (env === 'dev' || env === 'development') {
      if (this.get('environment') === 'dev' || this.get('environment') === 'development') return true;
    } else if (env === 'prod' || env === 'production') {
      if (this.get('environment') === 'prod' || this.get('environment') === 'production') return true;
    } else {
      return this.get('environment') === env;
    }
    return false;
  }

  /**
   * @name        get
   * @type        Function
   * @static
   * 
   * This static method allows you to access an env variable.
   * The variables keys are stored in UPPERCASE but you can use lowercase as well
   * 
   * @param     {String}      name       The variable name you want to get back
   * @return    {Any}                   The variable getted or undefined
   * 
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static get(name: string): any {
    // @ts-ignore
    return SEnv.env[name.toUpperCase()];
  }

  /**
   * @name        set
   * @type        Function
   * @static
   * 
   * This static method allows you to set an env variable.
   * The variables keys are stored in UPPERCASE but you can use lowercase as well
   * 
   * @param     {String}     name       The variable name you want to get back
   * @param     {Any}         value     The value you want to set
   * @return    {Any}                  The value setted
   * 
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static set(name: string, value: any): any {
    // @ts-ignore
    const env = Object.assign({}, SEnv.env);
    // @ts-ignore
    env[name.toUpperCase()] = value;
    // @ts-ignore
    SEnv.env = env;
    return value;
  }

  /**
   * @name        delete
   * @type        Function
   * @static
   * 
   * This static method allows you to delete an env variable.
   * The variables keys are stored in UPPERCASE but you can use lowercase as well
   * 
   * @param     {String}     name       The variable name you want to get back
   * @param     {Any}         value     The value you want to set
   * @return    {Any}                  The value setted
   * 
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static delete(name: string): void {
    // @ts-ignore
    const env = Object.assign({}, SEnv.env);
    // @ts-ignore
    delete env[name.toUpperCase()];
    // @ts-ignore
    SEnv.env = env;
  }
}