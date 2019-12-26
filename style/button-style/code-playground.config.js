module.exports = {

	assetsDir : ['doc'],

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<div class="tf vr">
					<h5>Default buttons</h5>
					<p>
						<a class="btn">Default</a>
						<a class="btn btn--primary">Primary</a>
						<a class="btn btn--secondary">Secondary</a>
						<a class="btn btn--success">Success</a>
						<a class="btn btn--error">Error</a>
						<a class="btn btn--warning">Warning</a>
						<a class="btn btn--info">Info</a>
					</p>
					<h5>Outline buttons</h5>
					<p>
						<a class="btn btn--outline">Default</a>
						<a class="btn btn--outline btn--primary">Primary</a>
						<a class="btn btn--outline btn--secondary">Secondary</a>
						<a class="btn btn--outline btn--success">Success</a>
						<a class="btn btn--outline btn--error">Error</a>
						<a class="btn btn--outline btn--warning">Warning</a>
						<a class="btn btn--outline btn--info">Info</a>
					</p>
					<h5>Link buttons</h5>
					<p>
						<a class="btn btn--link">Default</a>
						<a class="btn btn--link btn--primary">Primary</a>
						<a class="btn btn--link btn--secondary">Secondary</a>
						<a class="btn btn--link btn--success">Success</a>
						<a class="btn btn--link btn--error">Error</a>
						<a class="btn btn--link btn--warning">Warning</a>
						<a class="btn btn--link btn--info">Info</a>
					</p>
					<h5>Disabled buttons</h5>
					<p>
						<button disabled class="btn">Default</button>
						<button disabled class="btn btn--primary">Primary</button>
						<button disabled class="btn btn--secondary">Secondary</button>
						<button disabled class="btn btn--success">Success</button>
						<button disabled class="btn btn--error">Error</button>
						<button disabled class="btn btn--warning">Warning</button>
						<button disabled class="btn btn--info">Info</button>
					</p>
				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@use 'node_modules/@coffeekraken/sugar/index' as sugar;
				@use 'node_modules/@coffeekraken/typography-style/index' as typography-style;
				@use 'index' as button-style;
				@include sugar.init();
				@include sugar.classes();
				@include typography-style.classes();
				body {
					padding: sugar.space(medium);
				}
				@include button-style.classes(
					$colors: default primary secondary success error warning info
				);
			`
		},
		js : null
	}
}
