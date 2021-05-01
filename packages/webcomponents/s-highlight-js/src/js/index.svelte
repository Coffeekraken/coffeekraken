

<svelte:options tag="s-highlight-js" />

<script type="text/ts">

    import hljs from 'highlight.js';
    import javascript from 'highlight.js/lib/languages/javascript';
    hljs.registerLanguage('javascript', javascript);

	import __SSvelteComponent from '@coffeekraken/s-svelte-component';
	import __SHighlightJsComponentInterface from './interface/SHighlightJsComponentInterface';

	class MyCoolComponent extends __SSvelteComponent {

		static interface = __SHighlightJsComponentInterface;

		constructor() {
			super({w
				svelteComponent: {}
			});
		}
	}
	console.log('fff')


	new MyCoolComponent();

</script>

<style>
	h1 {
		color: sugar.color(primary);
		background: magenta;
	}
</style>

<div>
	<h1>Hello worlc</h1>
</div>