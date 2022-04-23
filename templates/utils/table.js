function buildTable(data) {
  let table = document.getElementById('table');
  table.innerHTML = ''

  data.forEach(element => {

    let row = document.createElement('TR');
    row.setAttribute('_id', element._id)

    cell = document.createElement('TD');
    cellContent = document.createTextNode(element.date);
    cell.appendChild(cellContent);
    row.appendChild(cell);

    cell = document.createElement('TD');
    cellContent = document.createTextNode(element.duration);
    cell.appendChild(cellContent);
    row.appendChild(cell);

    cell = document.createElement('TD');
    cellContent = document.createTextNode(element.distance);
    cell.appendChild(cellContent);
    row.appendChild(cell);

    cell = document.createElement('TD');
    let cellButton = document.createElement('BUTTON');
    cellButton.addEventListener('click', async () => {
      await deleteTraining(element);
      refreshTrainings();
    });
    cellContent = document.createTextNode('Delete');

    cellButton.appendChild(cellContent);
    cell.appendChild(cellButton);
    row.appendChild(cell);

    table.appendChild(row);
  });
};