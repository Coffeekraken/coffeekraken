module.exports = {
  generate: {
    /**
     * @name          namespace
     * @namespace     config.classes.generate
     * @type          Array
     * @default       ['sugar']
     *
     * Specify which classes registered with the "Sugar.register-class" mixin
     * you want to be present in your final css file
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    namespace: ['sugar']

    /**
     * @name          icons
     * @namespace     config.classes.generate
     * @type          String
     * @default       ''
     *
     * Specify which icons you want to be generated as a class ```.icon-{name}```.
     * By default no classes are generated like that but you can have them using these options:
     * 1. Using the ```@include Sugar.icon(fa-user);``` mixin
     * 2. Adding the icons you want in this setting options like for example "fa-user fa-star" and then use the generated classes like ```.icon-fa-user``` and ```.icon-fa-star```
     *
     * @since       2.0.0
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
  }
};
