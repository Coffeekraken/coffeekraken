module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-dialog-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// demos
	demos: {
		'iframe': {
			title: 'Iframe',
			editors: {
				html: {
					language: 'html',
					data: `
						<s-dialog iframe>
							<a class="btn btn--primary" href="/data/iframe-demo.html">
								Open my content in an iframe dialog
							</a>
						</s-dialog>
					`
				}
			}
		},
		'modal': {
			title: 'Modal',
			editors: {
				html: {
					language: 'html',
					data: `
						<a href="#my-cool-dialog" class="btn btn--primary">Open dialog</a>
						<div class="hidden">
							<s-dialog id="my-cool-dialog" modal>
								<h1 class="h1 m-b">
									Hello world
								</h1>
								<p class="p m-b">
									Vivamus vestibulum ultrices eros nec bibendum. In sit amet ultrices mi. Etiam nunc ante, efficitur ac aliquam eget, iaculis quis massa. Duis quis molestie orci. Sed ultricies sem ante, in.
								</p>
								<a class="btn btn--secondary" s-dialog-ok>
									Close dialog
								</a>
							</s-dialog>
						</div>
					`
				}
			}
		},
		'ajax': {
			title: 'Ajax',
			editors: {
				html: {
					language: 'html',
					data: `
						<s-dialog>
							<a href="/data/ajax-demo.html" class="btn btn--primary">Open ajax dialog</a>
						</s-dialog>
					`
				}
			}
		},
		'programatically': {
			title: 'Programatically',
			editors: {
				html: null,
				js: {
					language: 'js',
					data: `
						import strToHtml from 'coffeekraken-sugar/js/utils/strings/strToHtml'
						import SDialogComponent from './dist/index'
						const myDialog = SDialogComponent.open(
							strToHtml('<p>Hello World</p>')
						, {
							modal: true
						})
						setTimeout(() => {
							myDialog.close()
						}, 5000)
					`
				}
			}
		}
	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<a href="#my-cool-dialog" class="btn btn--primary">Open dialog</a>
				<div class="hidden">
					<s-dialog id="my-cool-dialog">
						<h1 class="h1 m-b">
							My cool dialog
						</h1>
						<p class="p">
							Vivamus vestibulum ultrices eros nec bibendum. In sit amet ultrices mi. Etiam nunc ante, efficitur ac aliquam eget, iaculis quis massa. Duis quis molestie orci. Sed ultricies sem ante, in.
						</p>
					</s-dialog>
				</div>
			`
		},
		css : {
			language : 'scss',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@import 'node_modules/coffeekraken-s-button-component/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				@include s-button-classes();
				body {
					padding: s-space(big);
				}
				@keyframes dialog-in-overlay {
					from { opacity:0; }
					to {opacity:1; }
				}
				@keyframes dialog-out-overlay {
					from { opacity:1; }
					to {opacity:0; }
				}
				@keyframes dialog-in {
					from {
						opacity:0;
						transform: translateY(-50px);
					}
					to {
						opacity:1;
						transform: translateY(0);
					}
				}
				@keyframes dialog-out {
					from {
						opacity:1;
						transform: translateY(0);
					}
					to {
						opacity:0;
						transform: translateY(50px);
					}
				}
				.s-dialog__overlay {
					background: s-color(secondary, -opacity .8);
					animation: dialog-in-overlay .1s ease-in-out 0s;
				}
				.s-dialog__content {
					max-width: 80%;
					background: white;
					padding: s-space(big);
					animation: dialog-in .2s ease-in-out 0s;

					iframe {
						height: s-rem(300px);
					}
				}
				.s-dialog--out {
					.s-dialog__content {
						animation: dialog-out .3s ease-in-out 0s forwards;
					}
					.s-dialog__overlay {
						animation: dialog-out-overlay .3s ease-in-out 0s forwards;
					}
				}
			`
		},
		js : {
			language : 'js',
			data : `
				import SDialogComponent from './dist/index'
			`
		}
	}
}
