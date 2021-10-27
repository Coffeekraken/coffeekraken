Hello interfaceddd

{{namespace}}

{{#if docmap.map }}
{{#with (get docmap.map namespace false)}}
{{this.name}}
{{/with}}
{{/if}}

{{#with docmap.map.[namespace] }}
{{this.name}}
{{/with}}
