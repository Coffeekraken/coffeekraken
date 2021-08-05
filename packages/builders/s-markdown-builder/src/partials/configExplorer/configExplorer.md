### Configuration explorer

| Dotpath        | Value |
| -------------- | ----- |
{{#each flatConfig}}
| {{ @key }} | {{ sanitizeValue this }} |
{{/each}}