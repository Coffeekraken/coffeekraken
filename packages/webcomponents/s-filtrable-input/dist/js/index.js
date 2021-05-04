/* index.svelte generated by Svelte v3.37.0 */
import {
	HtmlTag,
	SvelteElement,
	add_location,
	append_dev,
	assign,
	attr_dev,
	attribute_to_object,
	destroy_each,
	detach_dev,
	dispatch_dev,
	element,
	empty,
	exclude_internal_props,
	flush,
	init,
	insert_dev,
	listen_dev,
	noop,
	run_all,
	safe_not_equal,
	set_input_value,
	set_style,
	text,
	validate_each_argument,
	validate_slots
} from "svelte/internal";

import __SSvelteComponent from "@coffeekraken/s-svelte-component";
import __SFiltrableInputComponentInterface from "./interface/SFiltrableInputComponentInterface";
import __clone from "@coffeekraken/sugar/shared/object/clone";
const file = "index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	child_ctx[14] = i;
	return child_ctx;
}

// (105:4) {:else}
function create_else_block(ctx) {
	let each_1_anchor;
	let each_value = /*filteredItems*/ ctx[3];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*component, template, filteredItems*/ 26) {
				each_value = /*filteredItems*/ ctx[3];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(105:4) {:else}",
		ctx
	});

	return block;
}

// (101:4) {#if !filteredItems.length}
function create_if_block(ctx) {
	let li;
	let raw_value = /*component*/ ctx[4].compileMustache(/*noItemTemplate*/ ctx[2], {}) + "";
	let li_class_value;

	const block = {
		c: function create() {
			li = element("li");
			attr_dev(li, "class", li_class_value = /*component*/ ctx[4].className("__list-item __list-no-item"));
			add_location(li, file, 101, 6, 3320);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			li.innerHTML = raw_value;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*noItemTemplate*/ 4 && raw_value !== (raw_value = /*component*/ ctx[4].compileMustache(/*noItemTemplate*/ ctx[2], {}) + "")) li.innerHTML = raw_value;;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(101:4) {#if !filteredItems.length}",
		ctx
	});

	return block;
}

// (106:6) {#each filteredItems as item, idx}
function create_each_block(ctx) {
	let li;
	let html_tag;
	let raw_value = /*component*/ ctx[4].compileMustache(/*template*/ ctx[1], /*item*/ ctx[12]) + "";
	let t;
	let li_class_value;

	const block = {
		c: function create() {
			li = element("li");
			t = text("\n        ");
			html_tag = new HtmlTag(t);
			set_style(li, "z-index", 999999999 - /*idx*/ ctx[14]);
			attr_dev(li, "class", li_class_value = /*component*/ ctx[4].className("__list-item"));
			add_location(li, file, 106, 8, 3518);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			html_tag.m(raw_value, li);
			append_dev(li, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*template, filteredItems*/ 10 && raw_value !== (raw_value = /*component*/ ctx[4].compileMustache(/*template*/ ctx[1], /*item*/ ctx[12]) + "")) html_tag.p(raw_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(106:6) {#each filteredItems as item, idx}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let input;
	let input_class_value;
	let t;
	let ul;
	let ul_class_value;
	let div_class_value;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (!/*filteredItems*/ ctx[3].length) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div = element("div");
			input = element("input");
			t = text("\n  ");
			ul = element("ul");
			if_block.c();
			this.c = noop;
			attr_dev(input, "class", input_class_value = /*component*/ ctx[4].className("__input"));
			attr_dev(input, "type", "text");
			add_location(input, file, 93, 2, 3124);
			attr_dev(ul, "class", ul_class_value = /*component*/ ctx[4].className("__list"));
			add_location(ul, file, 99, 2, 3239);
			attr_dev(div, "class", div_class_value = /*component*/ ctx[4].className());
			add_location(div, file, 92, 0, 3086);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, input);
			set_input_value(input, /*value*/ ctx[0]);
			append_dev(div, t);
			append_dev(div, ul);
			if_block.m(ul, null);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[6]),
					listen_dev(input, "keyup", /*filterItems*/ ctx[5], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
				set_input_value(input, /*value*/ ctx[0]);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(ul, null);
				}
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_block.d();
			mounted = false;
			run_all(dispose);
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

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("s-filtrable-input", slots, []);

	class MyCoolComponent extends __SSvelteComponent {
		constructor(params) {
			super(params, { svelteComponent: {} });
		}
	}

	MyCoolComponent.interface = __SFiltrableInputComponentInterface;

	const component = new __SSvelteComponent($$props,
	{
			svelteComponent: {
				classPrefix: "s-filtrable-input",
				interface: __SFiltrableInputComponentInterface
			}
		});

	let { value, template, noItemTemplate, filtrable, maxItems } = component.props;

	const items = [
		{
			title: "Hello",
			body: `Lorem Ipsum is simply dummy text of the printing`
		},
		{
			title: "Coco",
			body: `Lorem Ipsum is simply dummy text of the printing`
		},
		{
			title: "Plopfopof",
			body: `Lorem Ipsum is simply dummy text of the printing`
		}
	];

	for (let i = 0; i < 1000; i++) {
		items.push({
			title: "Coco " + i,
			body: `Lorem Ipsum is simply dummy text of the printing`
		});
	}

	let filteredItems = items;

	function filterItems() {
		let matchedItemsCount = 0;

		$$invalidate(3, filteredItems = items.map(item => __clone(item)).filter(item => {
			if (matchedItemsCount >= maxItems) return false;
			let matchFilter = false;

			for (let i = 0; i < Object.keys(item).length; i++) {
				const propName = Object.keys(item)[i], propValue = item[propName];

				// prevent not string value
				if (typeof propValue !== "string") continue;

				// check if the current propName is specified in the filtrable list
				if (filtrable.indexOf(propName) !== -1) {
					const reg = new RegExp(value, "gi");

					if (propValue.match(reg)) {
						matchedItemsCount++;
						matchFilter = true;

						if (value && value !== "") {
							const reg = new RegExp(value, "gi");

							const finalString = propValue.replace(reg, str => {
								return `<span class="${component.className("__list-item-highlight")}">${str}</span>`;
							});

							item[propName] = finalString;
						}
					}
				}
			}

			return matchFilter;
		}));
	}

	component.beforeUpdate(() => {
		if (!template) {
			const templateElm = document.querySelector("s-filtrable-input template#item");

			if (templateElm) {
				$$invalidate(1, template = templateElm.innerHTML);
			}
		}

		if (!noItemTemplate) {
			const templateElm = document.querySelector("s-filtrable-input template#no-item");

			if (templateElm) {
				$$invalidate(2, noItemTemplate = templateElm.innerHTML);
			}
		}
	});

	component.onMount(() => {
		filterItems();
	});

	function input_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$new_props => {
		$$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
	};

	$$self.$capture_state = () => ({
		__SSvelteComponent,
		__SFiltrableInputComponentInterface,
		__clone,
		MyCoolComponent,
		component,
		value,
		template,
		noItemTemplate,
		filtrable,
		maxItems,
		items,
		filteredItems,
		filterItems
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(11, $$props = assign(assign({}, $$props), $$new_props));
		if ("value" in $$props) $$invalidate(0, value = $$new_props.value);
		if ("template" in $$props) $$invalidate(1, template = $$new_props.template);
		if ("noItemTemplate" in $$props) $$invalidate(2, noItemTemplate = $$new_props.noItemTemplate);
		if ("filtrable" in $$props) filtrable = $$new_props.filtrable;
		if ("maxItems" in $$props) maxItems = $$new_props.maxItems;
		if ("filteredItems" in $$props) $$invalidate(3, filteredItems = $$new_props.filteredItems);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = exclude_internal_props($$props);

	return [
		value,
		template,
		noItemTemplate,
		filteredItems,
		component,
		filterItems,
		input_input_handler
	];
}

class Index extends SvelteElement {
	constructor(options) {
		super();

		this.shadowRoot.innerHTML = `<style>.s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare){display:inline-block;position:relative
}.s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list{position:absolute;top:100%;left:0;overflow-x:hidden;overflow-y:auto;opacity:0;max-width:calc(100vw - 100px);pointer-events:none
}.s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__input:focus+.s-filtrable-input__list,.s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list:focus{opacity:1;pointer-events:all
}.s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list-item{cursor:pointer;position:relative
}.s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list-item *{pointer-events:none
}.s-filtrable-input:not(.s-no-lnf .s-filtrable-input):not(.s-no-lnf){}.s-filtrable-input:not(.s-no-lnf .s-filtrable-input):not(.s-no-lnf) .s-filtrable-input__list{content:"s-style-list"
}.s-filtrable-input:not(.s-no-lnf .s-filtrable-input):not(.s-no-lnf) .s-filtrable-input__list-item-highlight{background-color:var(--s-theme-color-primary-default, #f2bc2b)
}</style>`;

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			instance,
			create_fragment,
			safe_not_equal,
			{}
		);

		if (options) {
			if (options.target) {
				insert_dev(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}
}

customElements.define("s-filtrable-input", Index);
export default Index;