<!-- 
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## Bench with ease some parts of your processes, etc...

This `SBench` class allows you to know how many time take a certain part of your processes, with a concept of "steps" to split this even more when needed. Here's the features availables:

- Track the time used by a portion of script
- Display a summary of tracked times
- Split your tracked portion into "steps" for more precision
- Let the `SBench` related statements into your code and filter out which bench(s) you want to be active and which not

## Usage

Here's how to use our implementation:

```js
import __SBench from '@coffeekraken/s-bench';
// Using static methods
__SBench.start('myBench');
// do something here...
__SBench.step('myBench', 'myStep');
// do something more...
__SBench.end().log();

// Using instance
const bench = new __SBench('MyClass.doSomething');
bench.start();
// ...
bench.end().log();

// Filter our benches
__SBench.filter(['MyClass.*']);
// this accept glob patterns as filters like "MyClass.*"
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-bench.shared.SBench)

#### Settings

{{> interface namespace='@coffeekraken.s-bench.shared.interface.SBenchSettingsInterface' }}

{{/ layout-readme }}