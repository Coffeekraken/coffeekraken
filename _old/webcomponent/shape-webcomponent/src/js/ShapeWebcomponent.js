import SWebComponent from '@coffeekraken/sugar/js/core/SWebComponent'
import __strToHtml from '@coffeekraken/sugar/js/string/strToHtml'
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import __style from '@coffeekraken/sugar/js/dom/style';

/**
 * @name 		ShapeWebcomponent
 * @namespace       drawer-webcomponent
 * @type      Class
 * @extends 	SWebComponent
 *
 * Easily create custom shaped sections.
 * Features:
 * 1. Fully customizable
 * 2. Support shapes on every sides (top, right, bottom and left)
 * 3. Support different shapes by screen sizes
 * 4. Pre-registered shapes: waves1, waves2, waves3, waves4, waves5, waves6, rects2, rects3, rects4, rects5, rects6, triangles1, triangles2, triangles3, triangles4, triangles5, triangles6
 *
 * @example 	js
 * import ShapeWebcomponent from '@coffeekraken/shape-webcomponent';
 *
 * @example       html
 * <ck-shape bottom="waves3">
 *    <!-- your content here... -->
 * </ck-shape>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */

export default class ShapeWebcomponent extends SWebComponent {

  /**
   * Registered shapes
   * @static
   * @type      Object
   */
  static registeredShapes = {
    waves1: {
      shape: 'M0,96L1440,288L1440,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    waves2: {
      shape: 'M0,224L60,192C120,160,240,96,360,69.3C480,43,600,53,720,96C840,139,960,213,1080,213.3C1200,213,1320,139,1380,101.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    waves3: {
      shape: 'M0,128L34.3,128C68.6,128,137,128,206,122.7C274.3,117,343,107,411,128C480,149,549,203,617,197.3C685.7,192,754,128,823,112C891.4,96,960,128,1029,154.7C1097.1,181,1166,203,1234,197.3C1302.9,192,1371,160,1406,144L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    waves4: {
      shape: 'M0,96L30,106.7C60,117,120,139,180,165.3C240,192,300,224,360,197.3C420,171,480,85,540,90.7C600,96,660,192,720,197.3C780,203,840,117,900,101.3C960,85,1020,139,1080,154.7C1140,171,1200,149,1260,165.3C1320,181,1380,235,1410,261.3L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    waves5: {
      shape: 'M0,32L21.8,58.7C43.6,85,87,139,131,144C174.5,149,218,107,262,85.3C305.5,64,349,64,393,69.3C436.4,75,480,85,524,122.7C567.3,160,611,224,655,213.3C698.2,203,742,117,785,80C829.1,43,873,53,916,64C960,75,1004,85,1047,101.3C1090.9,117,1135,139,1178,154.7C1221.8,171,1265,181,1309,165.3C1352.7,149,1396,107,1418,85.3L1440,64L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    waves6: {
      shape: 'M0,192L13.3,186.7C26.7,181,53,171,80,170.7C106.7,171,133,181,160,197.3C186.7,213,213,235,240,202.7C266.7,171,293,85,320,53.3C346.7,21,373,43,400,85.3C426.7,128,453,192,480,208C506.7,224,533,192,560,186.7C586.7,181,613,203,640,192C666.7,181,693,139,720,133.3C746.7,128,773,160,800,165.3C826.7,171,853,149,880,165.3C906.7,181,933,235,960,250.7C986.7,267,1013,245,1040,197.3C1066.7,149,1093,75,1120,80C1146.7,85,1173,171,1200,176C1226.7,181,1253,107,1280,74.7C1306.7,43,1333,53,1360,85.3C1386.7,117,1413,171,1427,197.3L1440,224L1440,320L1426.7,320C1413.3,320,1387,320,1360,320C1333.3,320,1307,320,1280,320C1253.3,320,1227,320,1200,320C1173.3,320,1147,320,1120,320C1093.3,320,1067,320,1040,320C1013.3,320,987,320,960,320C933.3,320,907,320,880,320C853.3,320,827,320,800,320C773.3,320,747,320,720,320C693.3,320,667,320,640,320C613.3,320,587,320,560,320C533.3,320,507,320,480,320C453.3,320,427,320,400,320C373.3,320,347,320,320,320C293.3,320,267,320,240,320C213.3,320,187,320,160,320C133.3,320,107,320,80,320C53.3,320,27,320,13,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    rects2: {
      shape: 'M0,96L0,160L720,160L720,96L1440,96L1440,320L720,320L720,320L0,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    rects3: {
      shape: 'M0,160L0,96L480,96L480,160L960,160L960,64L1440,64L1440,320L960,320L960,320L480,320L480,320L0,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    rects4: {
      shape: 'M0,256L0,64L360,64L360,160L720,160L720,256L1080,256L1080,64L1440,64L1440,320L1080,320L1080,320L720,320L720,320L360,320L360,320L0,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    rects5: {
      shape: 'M0,288L0,128L288,128L288,256L576,256L576,128L864,128L864,96L1152,96L1152,224L1440,224L1440,320L1152,320L1152,320L864,320L864,320L576,320L576,320L288,320L288,320L0,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    rects6: {
      shape: 'M0,288L0,256L240,256L240,160L480,160L480,224L720,224L720,128L960,128L960,288L1200,288L1200,160L1440,160L1440,320L1200,320L1200,320L960,320L960,320L720,320L720,320L480,320L480,320L240,320L240,320L0,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    triangles1: {
      shape: 'M0,32L1440,224L1440,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    triangles2: {
      shape: 'M0,128L720,192L1440,96L1440,320L720,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    triangles3: {
      shape: 'M0,64L480,224L960,128L1440,288L1440,320L960,320L480,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    triangles4: {
      shape: '"M0,160L360,64L720,224L1080,96L1440,64L1440,320L1080,320L720,320L360,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    triangles5: {
      shape: 'M0,128L288,192L576,128L864,256L1152,64L1440,224L1440,320L1152,320L864,320L576,320L288,320L0,320Z',
      viewBox: '0 0 1440 320'
    },
    triangles6: {
      shape: 'M0,96L180,128L360,96L540,224L720,160L900,96L1080,256L1260,32L1440,256L1440,320L1260,320L1080,320L900,320L720,320L540,320L360,320L180,320L0,320Z',
      viewBox: '0 0 1440 320'
    }
  };

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
   * @static
	 */
	static get defaultProps() {
		return {
      /**
       * Specify the shape to apply to the top side.
       * Can be either a registered shape name, or an SVG path code
       *
       * @prop
       * @type      {String}
       */
      top : null,

      /**
       * Specify the shape to apply to the right side.
       * Can be either a registered shape name, or an SVG path code
       *
       * @prop
       * @type      {String}
       */
      right : null,

      /**
       * Specify the shape to apply to the bottom side.
       * Can be either a registered shape name, or an SVG path code
       *
       * @prop
       * @type      {String}
       */
      bottom : null,

      /**
       * Specify the shape to apply to the left side.
       * Can be either a registered shape name, or an SVG path code
       *
       * @prop
       * @type      {String}
       */
      left : null
		};
	}

	/**
	 * Css
	 * @protected
   * @static
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				display: block;
        position: relative;
			}
      ${componentNameDash} svg {
        display: block;
      }
      ${componentNameDash} svg path {
        fill: currentColor;
        width: 100%; height: 100%;
      }
      ${componentNameDash} svg[side="top"] {
        position: absolute;
        top: 0; left: 0;
        transform: rotate(180deg);
        width: 100%;
      }
      ${componentNameDash} svg[side="bottom"] {
        position: absolute;
        bottom: 0; left: 0;
        width: 100%;
      }
      ${componentNameDash} svg[side="right"] {
        position: absolute;
        bottom: 0; left: 100%;
        transform: rotate(-90deg);
        transform-origin: bottom left;
      }
      ${componentNameDash} svg[side="left"] {
        position: absolute;
        top: 0; left: 0;
        transform: rotate(90deg);
        transform-origin: top left;
      }
		`;
	}

  /**
   * Register a custom shape
   * You can go to [getwaves.io](https://getwaves.io/) to generate some cool shapes
   *
   * @param       {String}        name          The wanted shape name
   * @param       {String}        code          The SVG shape path code
   * @param       {String}        viewBox       The viewBox SVG string like '0 0 1440 320'
   *
   * @static
   */
  static registerShape(name, code, viewBox) {
    ShapeWebcomponent.registeredShapes[name] = {
      shape: code,
      viewBox: viewBox
    };
  }

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();

    // apply the top side if specified
    if (this.props.top) {
      this._applyShapeAtSide(this.props.top, 'top');
    }
    // apply the right side if specified
    if (this.props.right) {
      this._applyShapeAtSide(this.props.right, 'right');
    }
    // apply the bottom side if specified
    if (this.props.bottom) {
      this._applyShapeAtSide(this.props.bottom, 'bottom');
    }
    // apply the left side if specified
    if (this.props.left) {
      this._applyShapeAtSide(this.props.left, 'left');
    }

    const _this = this;
    new ResizeSensor(this, function(e) {
      // apply the width and height to the element to be able to calculate some sizes with css
      if (_this._bottom) {
        __style(_this._bottom, {
          height: `${e.width / _this._bottom.getAttribute('ratio')}px`
        });
        __style(_this, {
          paddingBottom: `${e.width / _this._bottom.getAttribute('ratio')}px`
        });
      }
      if (_this._top) {
        __style(_this._top, {
          height: `${e.width / _this._top.getAttribute('ratio')}px`
        });
        __style(_this, {
          paddingTop: `${e.width / _this._top.getAttribute('ratio')}px`
        });
      }
      if (_this._left) {
        __style(_this._left, {
          height: `${e.height / _this._left.getAttribute('ratio')}px`,
          left: `${e.height / _this._left.getAttribute('ratio')}px`
        });
        __style(_this, {
          paddingLeft: `${e.height / _this._left.getAttribute('ratio')}px`
        });
      }
      if (_this._right) {
        __style(_this._right, {
          height: `${e.height / _this._right.getAttribute('ratio')}px`
        });
        __style(_this, {
          paddingRight: `${e.height / _this._right.getAttribute('ratio')}px`
        });
      }
    });

	}

  /**
   * Apply a shape to a certain side
   * @protected
   */
  _applyShapeAtSide(shape, side) {
    const viewBox = ShapeWebcomponent.registeredShapes[shape].viewBox || '0 0 1440 320';
    const ratio = viewBox.split(' ')[2] / viewBox.split(' ')[3];
    // create and append the svg code
    this[`_${side}`] = __strToHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" side="${side}" ratio="${ratio || 4.5}"><path fill="currentColor" fill-opacity="1" d="${ShapeWebcomponent.registeredShapes[shape].shape || shape}"></path></svg>`);
    this.appendChild(this[`_${side}`]);
  }

}
