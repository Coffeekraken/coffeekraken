


<!-- @namespace    sugar.node.dev -->

# ```js parseError ```


Parse an error throwed in the terminal and return a nicely formated object like this:
{
filename: 'something/cool.js',
message: 'Something cool has appened in the terminal...',
type: 'Error',
line: 65,
row: 23,
stack: [{
filename: 'something.cool.js',
function: 'parseError',
line: 65,
row: 23
}, {
filename: 'other/thing.js',
function: 'require',
line: 30,
row: 18
}]
}

## Parameters

- **error**  Error: The error to parse




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



