# Classes

Here's all the classes available to style your dialog

- ```.ck-dialog``` : The main container of the dialog
- ```.ck-dialog--{type}``` : Applied on the main container to style your dialog differently depending on the type specified
- ```.ck-dialog__overlay``` : The overlay between the website and the actual dialog content
- ```.ck-dialog__content``` : The overlay content
- ```.ck-dialog__close``` : The element that act as a close button

## Simple styling example

Here's a simple styling example

```scss
.ck-dialog {
}
.ck-dialog__overlay {
	background: rgba(0,0,0,.8);
}
.ck-dialog__content {
	background: white;
	padding: 10px;
	max-width: 800px;
}
```
