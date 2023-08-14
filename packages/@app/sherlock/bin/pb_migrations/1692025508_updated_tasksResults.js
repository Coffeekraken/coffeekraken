/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r4eb8tbmh88aynl")

  collection.indexes = [
    "CREATE INDEX `idx_9U3GvdF` ON `tasksResults` (`taskUid`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r4eb8tbmh88aynl")

  collection.indexes = []

  return dao.saveCollection(collection)
})
