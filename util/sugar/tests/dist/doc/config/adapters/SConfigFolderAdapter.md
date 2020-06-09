
# Class


## ```js SConfigFolderAdapter ```


This adapter let you specify a folder in which to put all the config files and access it normaly as you would with the SConfig system.
Each file in the folder will be the first level of the final config object like for example the file "colors.config.js" will be stored
in the final object under ```{ colors: ... }```.

## Parameters

- **settings** ([object Object]) Object: The adapter settings that let you work with the good data storage solution...
- name (null) {String}: This specify the config name that you want to use.
- filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
- defaultConfigPath (null) {String}: This specify the path to the "default" config file.
- appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
- userConfigPath (${__tmpDir()}/[filename]) {String}: This specify the path to the "user" config file



## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods



# Variables


