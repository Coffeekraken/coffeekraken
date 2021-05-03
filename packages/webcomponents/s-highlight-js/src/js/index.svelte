

<svelte:options tag="s-highlight-js" />

<script type="text/ts">

	import prism from 'prismjs';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-markup';
	import 'prismjs/components/prism-bash';

	import __SSvelteComponent from '@coffeekraken/s-svelte-component';
	import __SHighlightJsComponentInterface from './interface/SHighlightJsComponentInterface';

	class MyCoolComponent extends __SSvelteComponent {
		static interface = __SHighlightJsComponentInterface;
		constructor(params) {
			super(params, {
				svelteComponent: {}
			});
		}
	}

	const component = new MyCoolComponent($$props);
	let {
		theme,
		language
	} = component.props;

	
	let codeElement;
	const text = document.querySelector('s-highlight-js').innerHTML;

	component.onMount(() => {
		const themeImport = `@import url('${theme}');`;
		const $style = document.createElement('style');
		$style.type = 'text/css'
		$style.appendChild(document.createTextNode(themeImport));
			
		const result = prism.highlight(text.trim(), prism.languages.javascript, 'javascript');
		codeElement.innerHTML = result;
		codeElement.appendChild($style);
	});

</script>

<style>
</style>

<pre class="language-{language}">
	<code bind:this={codeElement}></code>
</pre>