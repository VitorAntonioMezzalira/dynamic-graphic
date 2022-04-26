// GET
async function fetchAll() {

  const response = await fetch('http://localhost:5000/training/all');

  return response.json()

};

// POST
async function createTraining(training) {

  const response = await fetch('http://localhost:5000/training/create', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(training)
  });

  return response

};

// DELETE
async function deleteTraining(training) {
  const response = await fetch('http://localhost:5000/training/delete/' + training._id, {
    method: 'DELETE'
  });

  return response

};

// PUT
async function updateTraining(training) {

  const response = await fetch('http://localhost:5000/training/update', {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(training)
  });

  return response

};

