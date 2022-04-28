class GraphicCanvas {
  constructor(
    canvasContainerId,
    width,
    height,
    TopPadding,
    RightPadding,
    BottomPadding,
    LeftPadding,
    data
  ) {

    this.canvasContainerId = canvasContainerId;
    this.canvasElement = document.createElement('CANVAS');

    this.width = width; // largura do canvas
    this.height = height; // altura do canvas

    this.TopPadding = TopPadding; // margem interna SUPERIOR do canva
    this.RightPadding = RightPadding; // margem interna DIREITA do canva
    this.BottomPadding = BottomPadding; // margem interna INFERIOR do canva
    this.LeftPadding = LeftPadding; // margem interna ESQUERDA do canva

    this.graphicWidth = this.width - (this.LeftPadding + this.RightPadding); // largura do gráfico
    this.graphicHeight = this.height - (this.TopPadding + this.BottomPadding); // altura do gráfico

    this.statsDistanceBetween; // distância entre um índice e outro do gráfico
    this.statsWidth;  // largura dos índices do gráfico (se forem barras)
    this.statsHeightMultiplier; // multiplicador da altura que os índices serão exibidos   

    this.data = data;

    this.canvasElement.width = this.Width;
    this.canvasElement.height = this.Height;

    this.canvasContext = this.canvasElement.getContext('2d');

    document.getElementById(canvasContainerId).appendChild(this.canvasElement);

  }

  calculateGraphic() {

    this.distanceBetween = this.graphicWidth / this.data.length;

    this.statsWidth = (this.graphicWidth / this.data.length) / 2;

    let maxBarHeight = 0;
    this.data.forEach((element) => {
      if (element.content > maxBarHeight) {
        maxBarHeight = element.content;
      };
    });
    this.heightMultiplier = 100 / ((100 * maxBarHeight) / this.graphicHeight);
  }

  // funções para desenho do gráfico
  drawCanvas() {
    this.canvasContext.fillStyle = '#eeeeee';
    this.canvasContext.fillRect(0, 0, this.width, this.height);
  };

  drawGraphicBorders() {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(
      this.LeftPadding,
      this.TopPadding
    );
    this.canvasContext.lineTo(
      this.LeftPadding,
      this.Height - this.BottomPadding
    );
    this.canvasContext.lineTo(
      this.LeftPadding + this.graphicWidth,
      this.TopPadding + this.graphicHeight
    );
    this.canvasContext.stroke();
  };

  drawHorizontalLines(lineWidth, a) {

    // desenha as linhas pontilhadas
    for (let i = lineWidth; i < this.graphicWidth; i += (lineWidth * 2)) {
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(
        this.LeftPadding + i,
        this.Height - this.BottomPadding - a
      );
      this.canvasContext.lineTo(
        this.LeftPadding + i + lineWidth,
        this.Height - this.BottomPadding - a
      );
      this.canvasContext.stroke();
    }

    // esconde pedaços das linhas que tenham passado a largura do gráfico
    this.canvasContext.fillStyle = '#eeeeee';
    this.canvasContext.fillRect(this.LeftPadding + this.graphicWidth, 0, this.Width, this.Height);

  }

  drawGraphicBar(height, columnMargin) {
    let barTopStart = this.Height - this.BottomPadding - height;
    let barLeftStart = this.LeftPadding + columnMargin + (this.statsWidth / 2);
    this.canvasContext.fillStyle = '#66dd66';
    this.canvasContext.fillRect(barLeftStart, barTopStart, this.statsWidth, height);
  };

  drawGraphicLine(height, columnMargin) {
    let barTopStart = this.height - canvasBottomPadding - height;
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
            element.content * this.heightMultiplier,
            this.distanceBetween * id
          );
          // Desenha informações dos índices do gráfico
          // drawGraphicInfoText(
          //   element.legend,
          //   canvasLeftPadding + (distanceBetween * id) + width,
          //   canvasHeight - canvasBottomPadding + 20
          // );
        });

      } else if (graphicType == 'lines') {

        // Linhas do gráfico
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(
          this.canvasLeftPadding + (distanceBetween * 0) + this.statsWidth,
          this.canvasHeight - this.BottomPadding - (this.data[0].content * this.heightMultiplier));
        this.data.forEach((element, id) => {
          this.drawGraphicLine(
            element.content * this.heightMultiplier,
            distanceBetween * id
          );
          // Desenha informações dos índices do gráfico
          // drawGraphicInfoText(
          //   element.legend,
          //   canvasLeftPadding + (distanceBetween * id) + width,
          //   canvasHeight - canvasBottomPadding + 20
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