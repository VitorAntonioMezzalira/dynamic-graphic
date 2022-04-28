class GraphicCanvas {
  constructor(
    canvasContainerId,
    width,
    height,
    topPadding,
    rightPadding,
    bottomPadding,
    leftPadding,
    data
  ) {

    this.canvasContainerId = canvasContainerId;
    this.canvasElement = document.createElement('CANVAS');

    this.width = width; // largura do canvas
    this.height = height; // altura do canvas

    this.topPadding = topPadding; // margem interna SUPERIOR do canva
    this.rightPadding = rightPadding; // margem interna DIREITA do canva
    this.bottomPadding = bottomPadding; // margem interna INFERIOR do canva
    this.leftPadding = leftPadding; // margem interna ESQUERDA do canva

    this.graphicWidth = this.width - (this.leftPadding + this.rightPadding); // largura do gráfico
    this.graphicHeight = this.height - (this.topPadding + this.bottomPadding); // altura do gráfico

    this.statsDistanceBetween; // distância entre um índice e outro do gráfico
    this.statsWidth;  // largura dos índices do gráfico (se forem barras)
    this.statsHeightMultiplier; // multiplicador da altura que os índices serão exibidos   

    this.data = data;

    this.canvasContext = this.canvasElement.getContext('2d');

    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;

    this.buildCanvas();

  }

  calculateGraphic() {

    this.statsDistanceBetween = this.graphicWidth / this.data.length;

    this.statsWidth = (this.graphicWidth / this.data.length) / 2;

    let maxBarHeight = 0;
    this.data.forEach((element) => {
      if (element.content > maxBarHeight) {
        maxBarHeight = element.content;
      };
    });
    this.statsHeightMultiplier = 100 / ((100 * maxBarHeight) / this.graphicHeight);
  }

  // funções para desenho do gráfico
  drawCanvas() {
    this.canvasContext.fillStyle = '#eeeeee';
    this.canvasContext.fillRect(0, 0, this.width, this.height);
  };

  drawGraphicBorders() {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(
      this.leftPadding,
      this.topPadding
    );
    this.canvasContext.lineTo(
      this.leftPadding,
      this.height - this.bottomPadding
    );
    this.canvasContext.lineTo(
      this.leftPadding + this.graphicWidth,
      this.topPadding + this.graphicHeight
    );
    this.canvasContext.stroke();
  };

  drawHorizontalLines(lineWidth, a) {

    // desenha as linhas pontilhadas
    for (let i = lineWidth; i < this.graphicWidth; i += (lineWidth * 2)) {
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(
        this.leftPadding + i,
        this.height - this.bottomPadding - a
      );
      this.canvasContext.lineTo(
        this.leftPadding + i + lineWidth,
        this.height - this.bottomPadding - a
      );
      this.canvasContext.stroke();
    }

    // esconde pedaços das linhas que tenham passado a largura do gráfico
    this.canvasContext.fillStyle = '#eeeeee';
    this.canvasContext.fillRect(this.leftPadding + this.graphicWidth, 0, this.Width, this.Height);

  }

  drawGraphicBar(height, columnMargin) {
    let barTopStart = this.height - this.bottomPadding - height;
    let barLeftStart = this.leftPadding + columnMargin + (this.statsWidth / 2);
    this.canvasContext.fillStyle = '#66dd66';
    this.canvasContext.fillRect(barLeftStart, barTopStart, this.statsWidth, height);
  };

  drawGraphicLine(height, columnMargin) {
    let barTopStart = this.height - this.bottomPadding - height;
    let barLeftStart = this.leftPadding + columnMargin + this.statsWidth;
    this.canvasContext.lineTo(barLeftStart, barTopStart);
  };

  drawGraphicInfoText(text, x, y) {
    this.canvasContext.font = '12px Arial';
    this.canvasContext.fillStyle = '#111111'
    this.canvasContext.fillText(text, x, y);
  }

  buildCanvas() {

    // fundo do canvas
    this.drawCanvas();

    // calcula parâmetros de exibição dos indices no gráfico
    this.calculateGraphic();

    // linhas horizontais para auxilio na leitura dos índices
    this.drawHorizontalLines(10, 50);
    this.drawHorizontalLines(10, 100);
    this.drawHorizontalLines(10, 150);
    this.drawHorizontalLines(10, 200);

    if (this.data.length > 0) {

      if (graphicType == 'bars') {

        // barras do gráfico
        this.data.forEach((element, id) => {
          this.drawGraphicBar(
            element.content * this.statsHeightMultiplier,
            this.statsDistanceBetween * id
          );
          // Desenha informações dos índices do gráfico
          // drawGraphicInfoText(
          //   element.legend,
          //   canvasleftPadding + (distanceBetween * id) + width,
          //   canvasHeight - canvasbottomPadding + 20
          // );
        });

      } else if (graphicType == 'lines') {

        // Linhas do gráfico
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(
          this.leftPadding + (this.statsDistanceBetween * 0) + this.statsWidth,
          this.height - this.bottomPadding - (this.data[0].content * this.statsHeightMultiplier));
        this.data.forEach((element, id) => {
          this.drawGraphicLine(
            element.content * this.statsHeightMultiplier,
            this.statsDistanceBetween * id
          );
          // Desenha informações dos índices do gráfico
          // drawGraphicInfoText(
          //   element.legend,
          //   canvasleftPadding + (distanceBetween * id) + width,
          //   canvasHeight - canvasbottomPadding + 20
          // );
        });
        this.canvasContext.stroke();

      };

    };

    // linha da esquerda e de baixo do gráfico
    this.drawGraphicBorders();

    document.getElementById(this.canvasContainerId).appendChild(this.canvasElement);

  };
}