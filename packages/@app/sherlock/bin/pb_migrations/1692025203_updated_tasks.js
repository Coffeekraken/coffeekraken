/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tufa8rnrtfzgy0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g88gx38b",
    "name": "reporter",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tufa8rnrtfzgy0")

  // remove
  collection.schema.removeField("g88gx38b")

  return dao.saveCollection(collection)
})
