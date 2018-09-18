const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

//  INDEX
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .find({ _id: ObjectID(id) })
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // DESTROY
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => {
        collection
          .find()
          .toArray()
          .then((docs) => res.json(docs));
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // CREATE
  router.post('/', (req, res) => {
    const newSighting = req.body;
    // console.log('THIS IS THE NEW SIGHTING:', newSighting);
    collection
      .insertOne(newSighting)
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => console.error(err));
  });

  return router;

};

module.exports = createRouter;
