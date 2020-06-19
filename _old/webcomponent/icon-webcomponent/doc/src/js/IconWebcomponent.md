# Attributes

Here's the list of available attribute(s).

## icon

Specify the icon to display. If the icon file is `my-icon.svg`,
the icon parameter will be just `my-icon`.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


## driver

Specify the driver to use. It can be:
- `fonticon` : Use a font icon set
- `img` : Use an img tag to load the svg icon
- `svg` : Inline the svg directly in the page
- 'fontawesome` : Using fontawesome icons.
- `material` : Using google material icons.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **svg**


## iconsPath

Specify the path to the icons folder relative to the document root of your project

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **/dist/icons**


## iconsPrefix

Specify the icon prefix to use when using the `fonticon` driver

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **icon-**


## title

Specify a title for the icon that will be also used as alt of the image when using img driver

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


## fontawesomeCssUrl

Specify the fontawesome icons css url to use

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


## fontawesomeCssIntegrity

Specify the fontawesome icons css integrity checksum

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


## fondationCssUrl

Specify the fondation icons css url to use

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**