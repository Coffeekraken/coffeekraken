module.exports = {

	layout: 'right',

	// editors
	editors: {

		// html editor
		html: {
			language: 'html',
			data: `
				<div class="container">
					<s-atv-card>
						<article class="card">
	 						<figure class="ratio-16-9">
								<img class="abs-cover" src="http://coffeekraken.io/dist/img/contribute-issues.jpg" />
							</figure>
							<div class="card__content">
								<h1 class="h3 m-b">
									Hello World
								</h1>
								<p class="p">
									This is the code-playground demo of the code-playground tool.
								</p>
							</div>
						</article>
					</s-atv-card>
				</div>
			`
		},

		// css editor
		css: {
			language: 'sass', // available : css / sass / scss / stylus
			data: `
				@use '@coffeekraken/sugar/index' as sugar;
				@use '@coffeekraken/typography-style/index' as typography-style;
				@include sugar.init();
				@include sugar.classes();
				@include typography-style.classes();
				body {
					background: linear-gradient(to left, #f46b45 , #eea849);
				}
				.container {
					@include sugar.position(absolute, middle, center);
				}
				.card {
					max-width : 400px;
					@include sugar.effect-depth(2);
					background: white;

					&:hover {
						@include sugar.effect-depth(20);
					}
				}
				.card__content {
					padding: sugar.to-rem(40px);
					transform:translate3d(0,0,20px);
				}
			`
		},

		// js editor
		js: {
			language: 'js',
			data: `
				import querySelector from '@coffeekraken/sugar/js/dom/querySelector';
				console.log(querySelector);
				console.log('hello world');
			`
		}
	}
}
