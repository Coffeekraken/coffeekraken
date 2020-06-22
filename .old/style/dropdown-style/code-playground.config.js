module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-dropdown-component',

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
						Coffeekraken s-dropdown-component
					</h1>
					<p class="p m-b-bigger">
						Full stack dropdown styling component with dropup, right aligned and colors support. Fully customizable as well.
					</p>

					<div class="dropdown">
						<a class="btn">Display dropdown</a>
						<ul class="dropdown__menu">
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 1
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 2
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 3
								</a>
							</li>
						</ul>
					</div>

					<div class="dropdown dropdown--primary">
						<a class="btn btn--primary">Display primary colored dropdown</a>
						<ul class="dropdown__menu">
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 1
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 2
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 3
								</a>
							</li>
						</ul>
					</div>

					<div class="dropdown dropdown--secondary">
						<a class="btn btn--secondary">Display secondary colored dropdown</a>
						<ul class="dropdown__menu">
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 1
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 2
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 3
								</a>
							</li>
						</ul>
					</div>

					<div class="dropdown dropdown--up">
						<a class="btn">Display dropup</a>
						<ul class="dropdown__menu">
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 1
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 2
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 3
								</a>
							</li>
						</ul>
					</div>

					<div class="dropdown dropdown--right">
						<a class="btn">Display right aligned dropdown </a>
						<ul class="dropdown__menu">
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 1
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 2
								</a>
							</li>
							<li class="dropdown__item">
								<a href="#" title="...">
									Item 3
								</a>
							</li>
						</ul>
					</div>



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
				body {
					padding: s-space(bigger);
				}
				@import 'index';
				// @import 'node_modules/coffeekraken-s-dropdown-component/index';
				@include s-dropdown-classes(
					$colors: default primary secondary
				);
				.dropdown {
					margin-bottom: s-space(default);
				}
			`
		},
		js : null
	}
}
