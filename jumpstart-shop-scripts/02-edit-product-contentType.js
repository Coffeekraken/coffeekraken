module.exports = function (migration) {

    var product = migration.editContentType("product");

    product.changeFieldControl("slug", "builtin", "slugEditor");

    product.editField("description")
        .validations ([
            {
                enabledNodeTypes: [
                    "heading-1",
                    "hyperlink",
                    "ordered-list",]
            },
            {
                enabledMarks: ["bold", "italic", "underline"],
            },
        ]);

};