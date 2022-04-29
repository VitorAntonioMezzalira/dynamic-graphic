// para colunas com conteúdo de texto
class TableTextColumn {
  constructor(columnName, columnHeaderElement) {
    this.columnName = columnName;
    this.columnHeaderElement = columnHeaderElement;
    this.sortType = 'alphabetic';
  }
  chosseSortType() {
    switch (this.sortType) {
      case "alphabetic":
        this.sortType = "anti-alphabetic";
        this.sortAntiAlphabetically(this.columnName);
        break
      case "anti-alphabetic":
        this.sortType = "alphabetic";
        this.sortAlphabetically(this.columnName);
        break
    }
  }
  // ordena o array de forma alfabética
  sortAlphabetically(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });
    table.buildTableBody();
  }
  // ordena o array de forma anti-alfabética
  sortAntiAlphabetically(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return 1;
      if (a[columnName] > b[columnName]) return -1;
      return 0;
    });
    table.buildTableBody();
  }
}

// --------------- || ---------------

// para colunas com conteúdo de valores numéricos
class TableNumberColumn {
  constructor(columnName, columnHeaderElement) {
    this.columnName = columnName;
    this.columnHeaderElement = columnHeaderElement;
    this.sortType = 'growing';
  }

  chosseSortType() {
    switch (this.sortType) {
      case "growing":
        this.sortType = "decreasing";
        this.sortDecreasing(this.columnName);
        break
      case "decreasing":
        this.sortType = "growing";
        this.sortGrowing(this.columnName);
        break
    }
  }

  // ordena o array de forma crescente
  sortGrowing(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });
    table.buildTableBody();
  }

  // ordena o array de forma decrescente
  sortDecreasing(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return 1;
      if (a[columnName] > b[columnName]) return -1;
      return 0;
    });
    table.buildTableBody();
  }
}

// --------------- || ---------------


class Table {
  constructor(data, tableElement) {
    this.data = data;
    this.tableElement = tableElement;
    this.tableHeader = '';
    this.tableBody = '';
    this.columns = [];
  }

  generateTable() {
    this.buildTable();
    this.buildTableHeader();
    this.buildTableBody();
    this.createColumnsClasses();
  }

  createColumnsClasses() {
    // instancia as classes de acordo com o tipo de dado da coluna
    this.data.columnsNames.forEach(columnName => {
      switch (columnName.type) {
        case 'string':
          this.columns.push(new TableTextColumn(
            columnName.name,
            document.getElementById('table-orderer-' + columnName.name)
          ))
          break
        case 'number':
          this.columns.push(new TableNumberColumn(
            columnName.name,
            document.getElementById('table-orderer-' + columnName.name)
          ))
          break
      }
    })
    // cria o evento no header da coluna para alterar a ordenação 
    this.columns.forEach(column => {
      column.columnHeaderElement.addEventListener('click', () => {
        column.chosseSortType()
      })
    })
  }

  // monta o thead e o tbody da tabela
  buildTable() {
    this.tableElement.innerHtml = '';
    const tableHeader = document.createElement('THEAD');
    tableHeader.setAttribute('id', 'table-orderer-header');
    this.tableHeader = tableHeader;
    this.tableElement.appendChild(tableHeader);

    const tableBody = document.createElement('TBODY');
    tableBody.setAttribute('id', 'table-orderer-body');
    this.tableBody = tableBody;
    this.tableElement.appendChild(tableBody);
  }

  // monta o cabeçalho da tabela
  buildTableHeader() {
    this.tableHeader.innerHtml = '';
    const headerRow = document.createElement('TR');
    this.data.columnsNames.forEach(columnName => {
      if (columnName.type != 'key') {
        const headerCell = document.createElement('TH');
        headerCell.setAttribute('id', 'table-orderer-' + columnName.name);
        const headerCellContent = document.createTextNode(columnName.name);
        headerCell.appendChild(headerCellContent);
        headerRow.appendChild(headerCell);
      }
    })
    this.tableHeader.appendChild(headerRow);
  }

  // monta o conteúdo da tabela
  buildTableBody() {
    this.tableBody.innerText = '';
    this.data.content.forEach(item => {
      const bodyRow = document.createElement('TR');
      this.data.columnsNames.forEach(columnName => {
        if ((columnName.type != 'key') && (columnName.type != 'header')) {
          const bodyRowCell = document.createElement('TD');
          const bodyRowCellContent = document.createTextNode(item[columnName.name]);
          bodyRowCell.appendChild(bodyRowCellContent);
          bodyRow.appendChild(bodyRowCell);
        }
      });

      // delete button
      let cell = document.createElement('TD');
      let divContainer = document.createElement('DIV');
      divContainer.setAttribute('class', 'actions-cell-container')
      cell.setAttribute('class', 'actions-cell')
      let cellButton = document.createElement('BUTTON');
      cellButton.setAttribute('class', 'delete');
      cellButton.addEventListener('click', async () => {
        await deleteTraining(item);
        refreshTrainings();
      });
      let cellContent = document.createTextNode('☓');
      cellButton.appendChild(cellContent);
      divContainer.appendChild(cellButton);

      // update button
      cellButton = document.createElement('BUTTON');
      cellButton.setAttribute('class', 'update');
      cellButton.addEventListener('click', () => {
        editTraining(item['_id']);
      });
      cellContent = document.createTextNode('⟳');
      cellButton.appendChild(cellContent);
      divContainer.appendChild(cellButton);

      // view button
      cellButton = document.createElement('BUTTON');
      cellButton.setAttribute('class', 'view')
      cellButton.addEventListener('click', () => {
        fetchOne(item['_id']).then(training => {
          canvas.data = training.paces.map(pace => {
            return {
              content: pace
            }
          })
          canvas.buildCanvas();
        })

      });
      cellContent = document.createTextNode('👁');
      cellButton.appendChild(cellContent);
      divContainer.appendChild(cellButton);
      cell.appendChild(divContainer)

      bodyRow.appendChild(cell)

      this.tableBody.appendChild(bodyRow);

    })
  };
};
// --------------- || ---------------