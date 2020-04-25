const __fs = require('fs');
const __packageRoot = require('./node/path/packageRoot');

const packageRoot = __packageRoot(process.cwd());
let pkg;
function isInSugarPackage() {
  if (pkg && pkg.name === '@coffeekraken/sugar') return true;
  if (pkg) return false;
  if (!__fs.existsSync(packageRoot + '/package.json')) {
    return false;
  }
  pkg = require(packageRoot + '/package.json');
  return isInSugarPackage();
}

module.exports = {
  cli: {
    build: {
      scss: {
        /**
         * @name              input
         * @namespace         sugar.config.cli.build.scss
         * @type              String
         * @default           <appRoot>/src/scss/*.scss
         *
         * Specify the root folder (or file) to check for .scss|sass files to build.
         * Glob patterns can be used
         *
         * @since             2.0.0
         * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        input: isInSugarPackage()
          ? `${__packageRoot()}/tests/src/scss/*.scss`
          : `${__packageRoot()}/src/scss/*.scss`,

        /**
         * @name              output
         * @namespace         sugar.config.cli.build.scss
         * @type              String
         * @default           <appRoot>/dist/css
         *
         * Specify the destination folder where to put the compiled files in
         *
         * @since             2.0.0
         * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        output: isInSugarPackage()
          ? `${__packageRoot()}/tests/dist/css`
          : `${__packageRoot()}/dist/css`,

        /**
         * @name              watch
         * @namespace         sugar.config.cli.build.scss
         * @type              String
         * @default           false
         *
         * SSet if you want to watch files by default during the build process
         *
         * @since             2.0.0
         * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        watch: false,

        /**
         * @name              style
         * @namespace         sugar.config.cli.build.scss
         * @type              String
         * @default           expanded
         * @values            nested,expanded,compact,compressed
         *
         * Specify the output style that you want
         *
         * @since             2.0.0
         * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        style: 'expanded',

        /**
         * @name              map
         * @namespace         sugar.config.cli.build.scss
         * @type              Boolean
         * @default           true
         *
         * Specify if you want sourcemap files to be generated
         *
         * @since             2.0.0
         * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        map: true,

        /**
         * @name              prod
         * @namespace         sugar.config.cli.build.scss
         * @type              Boolean
         * @default           false
         *
         * Specify if you want also the <primary>production</primary> versions of the compiled files.
         * The production version are named ```[filename].prod.css```
         *
         * @since             2.0.0
         * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        prod: false
      }
    }
  },

  scss: {
    /**
     * @name            namespace
     * @namespace       sugar.config.scss
     * @type            String
     * @default         null
     *
     * Set the namespace where all the generated classes/colors/etc... will be documented
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    namespace: '',

    /**
     * @name          unit
     * @namespace     sugar.config.scss
     * @type          String
     * @default       rem
     *
     * Set the base unit to use across the system
     *
     * @since         1.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    unit: 'rem',

    /**
     * @name          reset
     * @namspace      sugar.config.scss
     * @type          Boolean
     * @default       true
     *
     * Specify if you want a reset to be applied or not
     *
     * @since       1.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    reset: true,

    /**
     * @name            border-box
     * @namespace       sugar.config.scss
     * @type            Boolean
     * @default         true
     *
     * Set if need to set all as border box model
     *
     * @since           1.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    'border-box': true,

    sizes: {
      /**
       * @name              smaller
       * @namespace         sugar.config.scss.sizes
       * @type              Number
       * @default           0.3
       *
       * Specify the <primary>smaller</primary> size ratio
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      smaller: 0.3,
      /**
       * @name              small
       * @namespace         sugar.config.scss.sizes
       * @type              Number
       * @default           0.6
       *
       * Specify the <primary>small</primary> size ratio
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      small: 0.6,
      /**
       * @name              default
       * @namespace         sugar.config.scss.sizes
       * @type              Number
       * @default           1
       *
       * Specify the <primary>default</primary> size ratio
       * This value has to stay a ```1``` so the others sizes can be calculated correctly
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      default: 1,
      /**
       * @name              medium
       * @namespace         sugar.config.scss.sizes
       * @type              Number
       * @default           1.4
       *
       * Specify the <primary>medium</primary> size ratio
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      medium: 1.4,
      /**
       * @name              big
       * @namespace         sugar.config.scss.sizes
       * @type              Number
       * @default           2
       *
       * Specify the <primary>big</primary> size ratio
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      big: 2,
      /**
       * @name              bigger
       * @namespace         sugar.config.scss.sizes
       * @type              Number
       * @default           3
       *
       * Specify the <primary>bigger</primary> size ratio
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      bigger: 3
    },

    typography: {
      /**
       * @name            font-family
       * @namespace       sugar.config.scss.typography
       * @type            String
       * @default         default
       *
       * Set the font to use by default. Has to be a font that exists in the config ```scss.fonts```
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'font-family': 'default',
      /**
       * @name            font-size
       * @namespace       sugar.config.scss.typography
       * @type            String
       * @default         14px
       *
       * Set the font size to use by default
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'font-size': '14px',
      /**
       * @name            font-sizes
       * @namespace       sugar.config.scss.typography
       * @type            Object
       * @default         null
       *
       * Object of font-sizes by media. The object format is { size: media }
       *
       * @example         js
       * {
       *    scss: {
       *      typography: {
       *        'font-sizes': {
       *          '20px': '(min-width: 500px) and (max-width: 1500px)'
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'font-sizes': null,
      /**
       * @name            line-letters-count
       * @namespace       sugar.config.scss.typography
       * @type            Number
       * @default         55
       *
       * Optimal letters count in a line
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'line-letters-count': 55,
      /**
       * @name            font-format
       * @namespace       sugar.config.scss.typography
       * @type            Object
       * @default         {}
       *
       * List the font formats used in ```font-face```
       *
       * @example       js
       * {
       *    scss: {
       *      typography: {
       *        'font-formats': {
       *          eot: 'embedded-opentype',
       *          woff2: 'woff2',
       *          woff: 'woff',
       *          ttf: 'truetype',
       *          otf: 'opentype',
       *          svg: 'svg',
       *          svgz: 'svgz'
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'font-formats': {
        eot: 'embedded-opentype',
        woff2: 'woff2',
        woff: 'woff',
        ttf: 'truetype',
        otf: 'opentype',
        svg: 'svg',
        svgz: 'svgz'
      }
    },

    'look-and-feel': {
      /**
       * @name            border-radius
       * @namespace       sugar.config.scss.look-and-feel
       * @type            String
       * @default         0em
       *
       * Specify the border radius that have to be applied on most of the components
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'border-radius': '0em',
      /**
       * @name            padding-vertical
       * @namespace       sugar.config.scss.look-and-feel
       * @type            String
       * @default         1.4em
       *
       * Specify the vertical padding that have to be applied on most of the components
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'padding-vertical': '1.4em',
      /**
       * @name            padding-horizontal
       * @namespace       sugar.config.scss.look-and-feel
       * @type            String
       * @default         0.8em
       *
       * Specify the horizontal padding that have to be applied on most of the components
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'padding-horizontal': '0.8em',
      /**
       * @name            disabled-opacity
       * @namespace       sugar.config.scss.look-and-feel
       * @type            Number
       * @default         0.5
       *
       * Specify the disabled opacity that have to be applied on most of the components
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'disabled-opacity': 0.5,
      /**
       * @name            line-height
       * @namespace       sugar.config.scss.look-and-feel
       * @type            Number
       * @default         1.4
       *
       * Specify the line height that have to be applied on most of the components
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'line-height': 1.4
    },

    spaces: {
      /**
       * @name            smaller
       * @namespace       sugar.config.scss.spaces
       * @type            String
       * @default         5px
       *
       * Specify the <primary>smaller</primary> space used for paddings and margins
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      smaller: '5px',
      /**
       * @name            small
       * @namespace       sugar.config.scss.spaces
       * @type            String
       * @default         10px
       *
       * Specify the <primary>small</primary> space used for paddings and margins
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      small: '10px',
      /**
       * @name            default
       * @namespace       sugar.config.scss.spaces
       * @type            String
       * @default         20px
       *
       * Specify the <primary>default</primary> space used for paddings and margins
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      default: '20px',
      /**
       * @name            medium
       * @namespace       sugar.config.scss.spaces
       * @type            String
       * @default         4px
       *
       * Specify the <primary>medium</primary> space used for paddings and margins
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      medium: '40px',
      /**
       * @name            big
       * @namespace       sugar.config.scss.spaces
       * @type            String
       * @default         70px
       *
       * Specify the <primary>big</primary> space used for paddings and margins
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      big: '70px',
      /**
       * @name            bigger
       * @namespace       sugar.config.scss.spaces
       * @type            String
       * @default         100px
       *
       * Specify the <primary>bigger</primary> space used for paddings and margins
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      bigger: '100px'
    },

    colors: {
      /**
       * @name            default
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #848e91
       *
       * This define the <primary>default</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        default: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      default: {
        color: '#848e91'
      },
      /**
       * @name            title
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #2b3438
       *
       * This define the <primary>title</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        title: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      title: {
        color: '#2b3438'
      },
      /**
       * @name            text
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         default
       *
       * This define the <primary>text</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        text: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      text: {
        color: 'default'
      },
      /**
       * @name            link
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         primary
       *
       * This define the <primary>link</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        link: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      link: {
        color: 'primary'
      },
      /**
       * @name            primary
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #f2bc2b
       *
       * This define the <primary>primary</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        primary: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      primary: {
        // color: '#f2bc2b'
        color: 'hello world'
      },
      /**
       * @name            secondary
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #2b3438
       *
       * This define the <primary>secondary</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        secondary: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      secondary: {
        color: '#2b3438'
      },
      /**
       * @name            success
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #5cb85c
       *
       * This define the <primary>success</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        success: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      success: {
        color: '#5cb85c'
      },
      /**
       * @name            warning
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #f0ad4e
       *
       * This define the <primary>warning</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        warning: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      warning: {
        color: '#f0ad4e'
      },
      /**
       * @name            error
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #d9534f
       *
       * This define the <primary>error</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        error: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      error: {
        color: '#d9534f'
      },
      /**
       * @name            info
       * @namespace       sugar.config.scss.colors
       * @type            String
       * @default         #2199e8
       *
       * This define the <primary>info</primary> color and optionaly some modifiers for it
       * Modifiers supported actions:
       * - hue {Deg}
       * - lighten {Percent}
       * - darken {Percent}
       * - saturate {Percent}
       * - desaturate {Percent}
       * - grayscale {Boolean}
       * - complement {Boolean}
       * - invert {Boolean}
       * - opacity {Percent}
       * - mix {Color}
       * - lightness {Percent}
       * - saturation {Percent}
       *
       * @example         js
       * {
       *    scss: {
       *      colors: {
       *        info: {
       *          color: '#ff0000',
       *          modifiers: {
       *            light: '-lighten 10% -opacity 50%'
       *          }
       *        }
       *      }
       *    }
       * }
       *
       * @since           1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      info: {
        color: '#2199e8'
      }
    },

    'modular-scale': {
      /**
       * @name              base
       * @namespace         sugar.config.scss.module-scale
       * @type              String
       * @default           1rem
       *
       * Set the base modular scale value
       *
       * @since             1.0.0
       * @see               https://www.npmjs.com/package/modularscale-sass
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      base: '1rem',
      /**
       * @name              ratio
       * @namespace         sugar.config.scss.module-scale
       * @type              Number
       * @default           1rem
       *
       * Set the ratio modular scale value
       *
       * @since             1.0.0
       * @see               https://www.npmjs.com/package/modularscale-sass
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      ratio: 1.33
    },

    'text-format': {
      /**
       * @name              scope-class
       * @namespace         sugar.config.scss.text-format
       * @type              String
       * @default           tf
       *
       * Specify the scope class name to generate in order to apply the text formatting on some elements
       *
       * @since             1.0.0
       * @see               https://www.npmjs.com/package/modularscale-sass
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'scope-class': 'tf'
    },

    'vertical-rhythm': {
      /**
       * @name              scope-class
       * @namespace         sugar.config.scss.text-format
       * @type              String
       * @default           vr
       *
       * Specify the scope class name to generate in order to apply the vertical rhythm on some elements
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'scope-class': 'vr'
    },

    fonts: {
      /**
       * @name              default
       * @namespace         sugar.config.scss.fonts
       * @type              Object
       * @default           { 'font-family': 'Helvetica Neue, Helvetica, Verdana, Arial, sans-serif', 'font-weight': 'normal' }
       *
       * Register the <primary>default</primary> font
       *
       * @example           js
       * {
       *    scss: {
       *      fonts: {
       *        default: {
       *          'font-family': 'Helvetica Neue, Helvetica, Verdana, Arial, sans-serif',
       *          'font-weight': 'nornal'
       *        }
       *      }
       *    }
       * }
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      default: {
        'font-family': 'Helvetica Neue, Helvetica, Verdana, Arial, sans-serif',
        'font-weight': 'normal',
        'cap-height': 0.65
      },
      /**
       * @name              quote
       * @namespace         sugar.config.scss.fonts
       * @type              Object
       * @default           { 'font-family': 'Palatino, Times, Georgia, serif', 'font-weight': 'normal' }
       *
       * Register the <primary>quote</primary> font
       *
       * @example           js
       * {
       *    scss: {
       *      fonts: {
       *        quote: {
       *          'font-family': 'Palatino, Times, Georgia, serif',
       *          'font-weight': 'nornal'
       *        }
       *      }
       *    }
       * }
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      quote: {
        'font-family': 'Palatino, Times, Georgia, serif',
        'font-weight': 'normal',
        'cap-height': 0.65
      },
      /**
       * @name              code
       * @namespace         sugar.config.scss.fonts
       * @type              Object
       * @default           { 'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace', 'font-weight': 'normal' }
       *
       * Register the <primary>code</primary> font
       *
       * @example           js
       * {
       *    scss: {
       *      fonts: {
       *        code: {
       *          'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
       *          'font-weight': 'nornal'
       *        }
       *      }
       *    }
       * }
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      code: {
        'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
        'font-weight': 'normal',
        'cap-height': 0.65
      }
    },

    /**
     * @name                    filters
     * @namespace               sugar.config.scss
     * @type                    Object
     * @default                 {}
     *
     * Define all the filters that you want here. Can be used by applying the class ```.fi-{name}``` on your elements or by
     * calling the mixin ```@include Sugar.filter(myCoolFilter);``` in your scss
     *
     * @example               js
     * {
     *    scss: {
     *      filters: {
     *        myCoolFilter : 'box-shadow(#000 0 0 10px) blur(30px)'
     *      }
     *    }
     * }
     *
     * @since             1.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    filters: {},

    /**
     * @name                    transitions
     * @namespace               sugar.config.scss
     * @type                    Object
     * @default                 { fast: 'all 0.1s ease-in-out 0s', default: 'all 0.2s ease-in-out 0s', slow: 'all 0.5s ease-in-out 0s' }
     *
     * Define all the transitions that you want here. Can be used by applying the class ```.tr-{name}``` on your elements or by
     * calling the mixin ```@include Sugar.transition(myCoolTransition);``` in your scss
     *
     * @example               js
     * {
     *    scss: {
     *      transitions: {
     *        myCoolTransition : 'all 0.1s ease-in-out 0s'
     *      }
     *    }
     * }
     *
     * @since             1.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    transitions: {
      fast: 'all 0.1s ease-in-out 0s',
      default: 'all 0.2s ease-in-out 0s',
      slow: 'all 0.5s ease-in-out 0s'
    },

    debug: {
      /**
       * @name              test-arguments
       * @namespace         sugar.config.scss.debug
       * @type              Boolean
       * @default           true
       *
       * Specify if you want the arguments tested by the ```Sugar.test-argument``` mixin to be processed or not.
       * This is pretty usefull for development purpose.
       *
       * @since             1.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'test-arguments': true
    }
  }
};
