import compileServer from '@coffeekraken/compile-server'
import InteractiveDemoComponent from '../../../dist/js/index';
import CodemirrorComponent from '@coffeekraken/codemirror-webcomponent/js/class';
CodemirrorComponent.define('ck-codemirror', CodemirrorComponent, null, {
  theme : 'material',
	updateOn : 'run',
	compile : compileServer.compile
});
