/* component.svelte generated by Svelte v3.32.1 */
import {
	SvelteComponentDev,
	add_location,
	append_dev,
	attr_dev,
	detach_dev,
	dispatch_dev,
	element,
	globals,
	init,
	insert_dev,
	noop,
	safe_not_equal,
	validate_slots
} from "svelte/internal";

const { console: console_1 } = globals;
const file = "component.svelte";

function add_css() {
	var style = element("style");
	style.id = "svelte-w73qe0-style";
	style.textContent = "h1.svelte-w73qe0{background:red}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LnN2ZWx0ZSIsInNvdXJjZXMiOlsiY29tcG9uZW50LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuXHRjb25zb2xlLmxvZygnSGVsbG8gZmYgd29ybGQnKTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdGgxIHtcblx0XHRiYWNrZ3JvdW5kOiByZWQ7XG5cdH1cbjwvc3R5bGU+XG5cbjxkaXY+XG5cdDxoMT5IZWxsbyB3b3JsYzwvaDE+XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0MsRUFBRSxjQUFDLENBQUMsQUFDSCxVQUFVLENBQUUsR0FBRyxBQUNoQixDQUFDIn0= */";
	append_dev(document.head, style);
}

function create_fragment(ctx) {
	let div;
	let h1;

	const block = {
		c: function create() {
			div = element("div");
			h1 = element("h1");
			h1.textContent = "Hello worlc";
			attr_dev(h1, "class", "svelte-w73qe0");
			add_location(h1, file, 11, 1, 105);
			add_location(div, file, 10, 0, 98);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h1);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Component", slots, []);
	console.log("Hello ff world");
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Component> was created with unknown prop '${key}'`);
	});

	return [];
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-w73qe0-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Component",
			options,
			id: create_fragment.name
		});
	}
}

export default Component;