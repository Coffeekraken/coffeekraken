<svelte:options tag="s-prettier" />

<script type="text/ts">

    import { onMount } from 'svelte';

	onMount(() => {
		// const interval = setInterval(() => {
		// 	console.log('beep');
		// }, 1000);

		// return () => clearInterval(interval);
        console.log('MOUNTED');
	});

    console.log('PLOP');

	// import __SSvelteComponent from '@coffeekraken/sugar/js/svelte/SSvelteComponent';

	// class SPrettierComponent extends __SSvelteComponent {
	// 	constructor() {
	// 		super({
	// 			svelteComponent: {}
	// 		});
	// 	}
	// }

	// new SPrettierComponent();

//     import prettier from "https://unpkg.com/prettier@2.2.1/esm/standalone.mjs";
//   import parserBabel from "https://unpkg.com/prettier@2.2.1/esm/parser-babel.mjs";



//   prettier.format("const html = /* HTML */ `<DIV> </DIV>`", {
//     parser: "babel",
//     plugins: [parserBabel],
//   });

</script>

<style type="text/css">
	body {
    	background: red;
	}
</style>

<div>
	<h1>Hello worlc</h1>
</div>