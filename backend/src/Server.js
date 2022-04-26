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
    distance: req.body.distance,
    paces: req.body.paces
  });

  await training.save();  
  res.send().status(200);

});

app.get('/training/all', async (req, res) => {

    const response = await Training.find(
      {}, 
      ['_id', 'date', 'duration', 'distance', 'paces']
    );
    res.send(response).status(200);

})

app.put('/training/update/', async (req, res) => {

  console.log(req.body.paces)

  const response = await Training.updateOne(
    { _id: req.body._id },
    {
      date: req.body.date,
      duration: req.body.duration,
      distance: req.body.distance,
      paces: req.body.paces
    }
  );

  res.send(response).status(200)

});

app.delete('/training/delete/:_id', async (req, res) => {

  console.log(req.params)

  const response = await Training.findByIdAndDelete({ _id: req.params._id });
  res.send(response).status(200);

});



Connection('mongodb://localhost:27017/run-stats');
app.listen(5000, () => console.log('server is running at http://localhost:5000'))