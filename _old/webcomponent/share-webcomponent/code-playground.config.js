module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-share-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<h1 class="h3 m-b-small">
					Coffeekraken s-share-component
				</h1>
				<p class="p m-b-bigger">Provide a nice and fully customizable select webcomponent that use a real select as source of truth</p>
				<a is="s-share" network="facebook" class="btn">
					Share on Facebook
				</a>
				<a is="s-share" network="twitter" class="btn btn--primary">
					Share on Twitter
				</a>
				<a is="s-share" network="linkedin" class="btn btn--secondary">
					Share on LinkedIn
				</a>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@import 'node_modules/coffeekraken-s-button-component/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				@include s-button-classes();
				body {
					padding: s-space(big)
				}
			`
		},
		js : {
			language : 'js',
			data : `
				import SShareComponent from './dist/index'
			`
		}
	}
}
