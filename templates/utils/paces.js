const pacesElement = document.getElementById('paces');
const pacesContainerElement = document.getElementById('paces-container')

function buildPacesInputs(pacesData, distanceInteger) {

  pacesElement.innerHTML = '';

  for (let i = 0; i < distanceInteger; i++) {

    // show paces container
    pacesContainerElement.classList.remove('hidden');

    // container
    let paceContainer = document.createElement('DIV');
    paceContainer.setAttribute('class', 'input-container');

    // label
    let label = document.createElement('LABEL');
    label.setAttribute('for', 'pace-' + i);
    let labelContent = document.createTextNode('Pace ' + (i + 1));
    label.appendChild(labelContent);

    // input
    let input = document.createElement('INPUT');
    input.setAttribute('id', 'pace-' + i);
    input.setAttribute('type', 'time');
    input.setAttribute('step', '1');
    input.setAttribute('class', 'pace-input')

    // content
    input.value = convertSecondsToHoursMinutesSeconds(pacesData[i]);

    paceContainer.appendChild(label);
    paceContainer.appendChild(input);
    pacesElement.appendChild(paceContainer);

  };

};