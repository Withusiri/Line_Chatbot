const express = require('express');
const router = express.Router();
const api = require('../getCondition/api_condition');
const mongoClient = require('mongodb').MongoClient

router.post('/', async (req, res) => {
  // Parameter name from Dialogflow
  province = req.body.queryResult.parameters.Province || req.body.queryResult.parameters.Capital;

  // Result will be true or false
  const isSuccess = await api.getCond(province,res);

  if (isSuccess) {
    // Connect to Mongodb
    const client = await mongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
    const mongo = client.db('chatbot').collection('logs');

    // Find if this province's information is exist
    const doc_count = await mongo.find({ province: province }).count();

    // Never ever request to API with this province
    if (doc_count === 0)
      // Create new document for this province
      await mongo.insertOne({ province: province, count: 1 });
    else
      // Update count + 1 for this province
      await mongo.updateOne({ province: province }, { $inc: { count: 1 } });
  }
  else
    console.log("Problem with API Call");
})

// Web Service
router.get('/stats', async (req, res) => {
  const client = await mongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
  const mongo = client.db('chatbot').collection('logs');

  // const maxcount_prov = await mongo.aggregate([ { $group: { _id: "$province", max: { $max: "$count"} } } ]);
  const mostcall_prov = await mongo.find().sort({count:-1}).limit(1).next();
  const total_prov = await mongo.find().count();

  const stats = {
    mostcall: mostcall_prov.province,
    mostcall_value: mostcall_prov.count,
    total_prov: total_prov
  }

  res.json(stats);
})

module.exports = router;
