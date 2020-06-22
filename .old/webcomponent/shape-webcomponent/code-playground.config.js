module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-drawer-component',

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
				<s-drawer name="menu">
					<h1 class="h1 m-b">Hello World</h1>
					<p class="p m-b">
						Cras quis ultrices tellus, a dapibus arcu. Duis sed tellus eros. Etiam dignissim sapien non felis facilisis, id scelerisque tellus auctor. Sed efficitur feugiat quam in lobortis. Nunc ligula arcu.
					</p>
					<a class="btn btn--primary">
						Close the drawer
					</a>
				</s-drawer>
				<s-drawer name="other-menu">
					<h1 class="h1 m-b">Hello other menu</h1>
					<p class="p m-b">
						Cras quis ultrices tellus, a dapibus arcu. Duis sed tellus eros. Etiam dignissim sapien non felis facilisis, id scelerisque tellus auctor. Sed efficitur feugiat quam in lobortis. Nunc ligula arcu.
					</p>
					<a class="btn btn--secondary">
						Close the drawer
					</a>
				</s-drawer>
				<s-drawer name="bottom-menu">
					<h1 class="h1 m-b">Hello bottom menu</h1>
					<p class="p m-b">
						Cras quis ultrices tellus, a dapibus arcu. Duis sed tellus eros. Etiam dignissim sapien non felis facilisis, id scelerisque tellus auctor. Sed efficitur feugiat quam in lobortis. Nunc ligula arcu.
					</p>
					<a class="btn btn--secondary">
						Close the drawer
					</a>
				</s-drawer>

				<main s-drawer-content>
					<label for="menu" class="btn btn--primary">
						Click to open
					</label>
					<label for="other-menu" class="btn btn--secondary">
						Click to open the left drawer
					</label>
					<label for="bottom-menu" class="btn">
						Click to open the bottom drawer
					</label>
					<h1 class="h1 m-b-small m-t">
						Coffeekraken s-drawer-component
					<h1>
					<p class="p m-b-bigger">
						Simple webcomponent to create fully customizable drawers.
					</p>
				</main>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@import 'node_modules/coffeekraken-s-button-component/index';
				@import 'index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				@include s-button-classes(
					$colors : default primary secondary
				);
				body {
					overflow-x: hidden;
				}
				#wrapper {
					padding:0 !important;
				}
				main {
					padding: s-space(big);
				}
				s-drawer * {
					color: white !important;
				}

				// define drawers
				@include s-drawer-classes(
					$name : menu,
					$side : right
				);
				@include s-drawer-classes(
					$name : other-menu,
					$side : left
				) {
					@include s-drawer-element(drawer) {
						background-color: s-color(primary);
					}
				};
				@include s-drawer-classes(
					$name : bottom-menu,
					$side : bottom,
					$type : slide
				) {
					@include s-drawer-element(drawer) {
						background-color: s-color(primary);
						@include s-filter(box-shadow(rgba(0,0,0,.1) 0 0 200px));
					}

					@include s-drawer-element(content) {
						@include s-drawer-opened() {
							transform: scale(.9);
						}
					}
				};

				// style drawer elements
				@include s-drawer-element(drawer) {
					background: s-color(secondary);
					padding: s-space(big);
				}
				@include s-drawer-element(overlay) {
					background: s-color(secondary, -opacity .5);
				}
			`
		},
		js : {
			language : 'js',
			data : `
				import SDrawerComponent from './dist/index'
			`
		}
	}
}
