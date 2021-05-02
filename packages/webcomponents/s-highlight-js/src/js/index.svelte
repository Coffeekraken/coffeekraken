

<svelte:options tag="s-highlight-js" />

<script type="text/ts">

	import { onMount } from 'svelte';
    import hljs from 'highlight.js';
    import javascript from 'highlight.js/lib/languages/javascript';
    hljs.registerLanguage('javascript', javascript);

	import __SSvelteComponent from '@coffeekraken/s-svelte-component';
	import __SHighlightJsComponentInterface from './interface/SHighlightJsComponentInterface';

	class MyCoolComponent extends __SSvelteComponent {

		static interface = __SHighlightJsComponentInterface;

		constructor() {
			super({
				svelteComponent: {}
			});
		}
	}

	export let theme;
	
	let preElement;
	
	onMount(() => {
		const component = new MyCoolComponent({
			theme
		});
		hljs.highlightElement(preElement);
	});

	


</script>

<style>

	@import url(https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/atom-one-dark.min.css);

	pre {
	}
</style>

<pre bind:this={preElement}>
	<code>
		<slot></slot>
	</code>
</pre>