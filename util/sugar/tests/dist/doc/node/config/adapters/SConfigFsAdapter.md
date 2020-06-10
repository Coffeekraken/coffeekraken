


<!-- @namespace    sugar.node.config.adapters -->

# ```js SConfigFsAdapter ```


The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
and then you just have to use the SConfig class and that's it...

## Parameters

- **settings** ([object Object]) Object: The adapter settings that let you work with the good data storage solution...
- name (null) {String}: This specify the config name that you want to use.
- filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
- defaultConfigPath (null) {String}: This specify the path to the "default" config file.
- appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
- userConfigPath (${__tmpDir()}/[filename]) {String}: This specify the path to the "user" config file



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


