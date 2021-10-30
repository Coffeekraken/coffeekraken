{{#with (configFiles config simplify)}}
{{#each this}}

```{{this.extension}}
{{{this.content}}}
```

{{/each}}
{{/with}}
