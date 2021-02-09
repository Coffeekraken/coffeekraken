<script type="text/ts">

	import __SSvelteComponent from '@coffeekraken/sugar/js/svelte/SSvelteComponent';

	class MyCoolComponent extends __SSvelteComponent {
		constructor() {
			super({
				svelteComponent: {}
			});
			console.log('COM^=');
		}
	}

	new MyCoolComponent();

</script>

<style type="text/scss">
	h1 {
		color: Sugar.color(primary);
		background: red;
	}
</style>

<div>
	<h1>Hello worlc</h1>
</div>