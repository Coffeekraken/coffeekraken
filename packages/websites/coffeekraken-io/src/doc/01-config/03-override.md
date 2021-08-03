<!-- 
 * @name            Override configs
 * @namespace       doc.config
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Configuration           /doc/config/override
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
-->

{{#> layout-doc }}

# Overriding existing configuration

To override some configs in your project, the process is simple and straight forward.

To illustrate this, we will take as example of overriding the javascript sources path directory. Note that the same process applies for any other configs as well...

### Package level overriding
    
- Create the file ```.sugar/storage.config.js```
- Fill it like so

{{#> s-code-example lang='js'}}
export default {
    src: {
        jsDir: "your new absolute directory path"
    }
}
{{/s-code-example}}


### User level overriding
    
- Create the file ```.local/.sugar/storage.config.js```
- Fill it like so

{{#> s-code-example lang='js'}}
export default {
    src: {
        jsDir: "your new absolute directory path"
    }
}
{{/s-code-example}}


> You'll see that the process is the same. The only difference is where are stored files. Note that the ```.local``` folder MUST be added in your **.gitignore file** if you're not using our development toolchain.


{{/layout-doc }}