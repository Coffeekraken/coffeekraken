

<svelte:options tag="s-highlight-js" />

<script type="text/javascript">

    import hljs from 'highlight.js';
    import javascript from 'highlight.js/lib/languages/javascript';
    hljs.registerLanguage('javascript', javascript);

	import __SSvelteComponent from '@coffeekraken/sugar/js/svelte/SSvelteComponent';

	class MyCoolComponent extends __SSvelteComponent {
		constructor() {
			super({
				svelteComponent: {}
			});
		}
	}
	console.log('Plfffffp')


	new MyCoolComponent();

</script>

<style>
	h1 {
		color: blue;
		background: red;
	}
</style>

<div>
	<h1>Hello worlc</h1>
</div>