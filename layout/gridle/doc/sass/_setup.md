# g-setup

Setting up your grid

### Parameters

| Name       | Type                                                                                | Description                | Status   | Default |
| ---------- | ----------------------------------------------------------------------------------- | -------------------------- | -------- | ------- |
| \$settings | **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** | Your default grid settings | required |

### Example

```scss
// default settings
$_gridle-settings: (
  name: default,
  min-width: null,
  max-width: null,
  query: null,
  columns: 12,
  rows: 12,
  column-width: 60,
  width: 1200,
  gutter-width: null,
  container-width: 90vw,
  container-max-width: 1200px
);

// setting up your grid
@include g-setup(
  (
    columns: 12 // other settings
  )
);
```

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

## Mixins

### g-register-state

Register a new state with some settings

#### Parameters

| Name       | Type                                                                                                  | Description        | Status   | Default |
| ---------- | ----------------------------------------------------------------------------------------------------- | ------------------ | -------- | ------- |
| \$name     | **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** | The new state name | required |
| \$settings | **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**                   | The state settings | required |

#### Example

```scss
@include g-register-state(
  mobile,
  (
    max-width: 600px
  )
);
```

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

### g-register-mobile-first-states

Register some basics mobile first states:

- tablet : 640px to infinite
- desktop : 992px to infinite
- large : 1200px to infinite

#### Example

```scss
@include g-register-mobile-first-states();
```

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)
