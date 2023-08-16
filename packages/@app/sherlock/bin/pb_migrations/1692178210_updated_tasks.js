/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tufa8rnrtfzgy0")

  // remove
  collection.schema.removeField("5w8o6c7f")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tufa8rnrtfzgy0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5w8o6c7f",
    "name": "status",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
