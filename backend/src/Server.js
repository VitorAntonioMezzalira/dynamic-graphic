const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Connection = require('./Connection');

const Training = require('./Models/trainingModel')

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.post('/training/create', async (req, res) => {

  const training = new Training({
    date: req.body.date,
    duration: req.body.duration,
    distance: req.body.distance
  });

  await training.save();  
  res.send().status(200);

});

app.get('/training/fetch-all', async (req, res) => {

    const trainings = await Training.find({});
    res.send(trainings).status(200);

})

Connection('mongodb://localhost:27017/run-stats');
app.listen(5000, () => console.log('server is running at http://localhost:5000'))