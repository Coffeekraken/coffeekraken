module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-tooltip-component',

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
				<div class="container">
					<h1 class="h3 m-b-small">
						Coffeekraken s-tooltip-component
					</h1>
					<p class="p m-b-bigger">
						Full stack tooltip styling supporting multiple sides and colors. Fully customizable as well.
					</p>
					<a onclick="this.classList.toggle('active')" class="btn">
						Display a tooltip
						<div class="tooltip">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn btn--primary">
						Display a top left tooltip
						<div class="tooltip tooltip--tl tooltip--primary">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn btn--secondary">
						Display a top right tooltip
						<div class="tooltip tooltip--tr tooltip--secondary">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn">
						Display a left tooltip
						<div class="tooltip tooltip--l">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn btn--primary">
						Display a right tooltip
						<div class="tooltip tooltip--r tooltip--primary">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn btn--secondary">
						Display a bottom left tooltip
						<div class="tooltip tooltip--bl tooltip--secondary">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn">
						Display a bottom tooltip
						<div class="tooltip tooltip--b">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn btn--primary">
						Display a bottom right tooltip
						<div class="tooltip tooltip--br tooltip--primary">I'm a cool tooltip</div>
					</a>
					<a onclick="this.classList.toggle('active')" class="btn btn--secondary">
						Display a centered tooltip
						<div class="tooltip tooltip--c tooltip--primary">I'm a cool tooltip</div>
					</a>
				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@include s-init();
				@include s-classes();
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@include s-typography-classes();
				@import 'node_modules/coffeekraken-s-button-component/index';
				@include s-button-classes();
				.btn {
					position:relative;
					margin-bottom: s-space(default);
				}
				body {
					background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
				}
				.container {
					@include s-position(absolute, middle, center);
					min-width:80vw;
				}
				@import 'index';
				// @import 'node_modules/coffeekraken-s-tooltip-component/index';
				@include s-tooltip-classes(
					$colors: default primary secondary,
					$sides: tl t tr l r bl b br c
				);
				.tooltip {
					white-space: nowrap;
				}
			`
		},
		js : null
	}
}
