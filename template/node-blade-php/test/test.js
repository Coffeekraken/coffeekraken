const bladeEngine = require('../index')

bladeEngine.setViewsFolder(__dirname);

bladeEngine.compile('coco.plop', {
    message: 'John'
}).then((result) => {
    console.log(result)
})
