import compileServer from '../../../dist/js/index'

console.log('compile', compileServer)

compileServer.compile(`
.coco {
	.caca {
		background: red;
	}
}
`, 'scss').then((response) => {
	console.log('SCSS', response)
})

compileServer.compile(`
async function coco() {
	return await fetch('http://localhost:4000')
}
`, 'js').then((response) => {
	console.log('JS', response)
})

compileServer.compile(`
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]
`, 'coffeescript').then((response) => {
	console.log('Coffeescript', response)
})
