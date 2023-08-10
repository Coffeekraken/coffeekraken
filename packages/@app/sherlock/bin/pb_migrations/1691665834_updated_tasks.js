/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tufa8rnrtfzgy0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggmiq8rw",
    "name": "service",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "fghr8lzuwoilcvu",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6tufa8rnrtfzgy0")

  // remove
  collection.schema.removeField("ggmiq8rw")

  return dao.saveCollection(collection)
})
