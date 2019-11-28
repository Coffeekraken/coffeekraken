module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-select-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
				<h1 class="h3 m-b-small">
					Coffeekraken s-select-component
				</h1>
				<p class="p m-b-bigger">Provide a nice and fully customizable select webcomponent that use a real select as source of truth</p>
				<select is="s-select">
					<option s-select-option-elm="#custom-option-1" value="item-1">Item #1</option>
					<option s-select-option-elm="#custom-option-2" value="item-2">Item #2</option>
					<option s-select-option-elm="#custom-option-3" value="item-3">Item #3</option>
				</select>
				<select is="s-select" multiple placeholder="Choose some options..." color="secondary">
					<option s-select-option-elm="#custom-option-1" value="item-1">Item #1</option>
					<option s-select-option-elm="#custom-option-2" value="item-2">Item #2</option>
					<option s-select-option-elm="#custom-option-3" value="item-3">Item #3</option>
				</select>
				<select is="s-select">
					<option value="value1">Hello</option>
					<option value="value2">World</option>
					<optgroup label="My Cool Group">
						<option value="value3">My Cool Option</option>
					</optgroup>
				</select>
				<select is="s-select" color="success">
					<option value="value1">Hello</option>
					<option value="value2">World</option>
					<optgroup label="My Cool Group">
						<option value="value3">My Cool Option</option>
					</optgroup>
				</select>
				<select is="s-select" color="info">
					<option value="value1">Hello</option>
					<option value="value2">World</option>
					<optgroup label="My Cool Group">
						<option value="value3">My Cool Option</option>
					</optgroup>
				</select>
				<select is="s-select" multiple placeholder="Choose some options...">
					<option value="value1">Hello</option>
					<option value="value2">World</option>
					<optgroup label="My Cool Group">
						<option value="value3">My Cool Option</option>
					</optgroup>
				</select>
				<select is="s-select" multiple placeholder="Choose some options..." color="primary">
					<option value="value1" selected>Hello</option>
					<option value="value2">World</option>
					<optgroup label="My Cool Group">
						<option value="value3">My Cool Option</option>
					</optgroup>
				</select>
				<select is="s-select" disabled>
					<option value="value1">Hello</option>
					<option value="value2">World</option>
					<optgroup label="My Cool Group">
						<option value="value3">My Cool Option</option>
					</optgroup>
				</select>
				<div class="option-source" id="custom-option-1">
					<img src="http://graph.facebook.com/622487880/picture?type=large" />
					<div class="option-source__meta">
						<h4 class="h5 m-b-smaller">Item #1</h4>
						<p class="p">Aenean arcu ante, ullamcorper vitae nisl a, convallis tempor magna.</p>
					</div>
				</div>
				<div class="option-source" id="custom-option-2">
				<img src="http://graph.facebook.com/622487880/picture?type=large" />
				<div class="option-source__meta">
					<h4 class="h5 m-b-smaller">Item #2</h4>
					<p class="p">Aenean arcu ante, ullamcorper vitae nisl a, convallis tempor magna.</p>
				</div>
				</div>
				<div class="option-source" id="custom-option-3">
				<img src="http://graph.facebook.com/622487880/picture?type=large" />
				<div class="option-source__meta">
					<h4 class="h5 m-b-smaller">Item #3</h4>
					<p class="p">Aenean arcu ante, ullamcorper vitae nisl a, convallis tempor magna.</p>
				</div>
				</div>
			`
    },
    css: {
      language: "sass",
      data: `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@import 'node_modules/coffeekraken-s-form-component/index';
				@import 'index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				body {
					padding: s-space(big);
				}
				@include s-select-classes(
					$colors : default primary secondary success info
				);
				.s-select {
					margin-bottom:2em;
				}
				.option-source {
					@include s-clearfix;

					img {
						width:70px;
						float:left;
						margin-right: s-space(small);
					}
				}
				.option-source__meta {
					padding: 10px;
					margin-left:70px;
				}
			`
    },
    js: {
      language: "js",
      data: `
				import SSelectComponent from './dist/index';
			`
    }
  }
};
