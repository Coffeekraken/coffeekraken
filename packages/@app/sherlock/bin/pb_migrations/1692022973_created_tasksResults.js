/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "r4eb8tbmh88aynl",
    "created": "2023-08-14 14:22:53.972Z",
    "updated": "2023-08-14 14:22:53.972Z",
    "name": "tasksResults",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7yfjks8l",
        "name": "uid",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "9pymvxen",
        "name": "taskUid",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "89lth74n",
        "name": "data",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("r4eb8tbmh88aynl");

  return dao.deleteCollection(collection);
})
