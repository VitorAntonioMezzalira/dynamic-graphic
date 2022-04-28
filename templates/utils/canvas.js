const canvasWidth = 750; // largura do canva
const canvasHeight = 300; // altura do canva

const canvasTopPadding = 20;
const canvasBottomPadding = 40; // margem interna inferior do canva
const canvasLeftPadding = 40; // margem interna esquerda do canva
const canvasRightPadding = 20; // margem interna direita do canva

const graphicWidth = canvasWidth - (canvasLeftPadding + canvasRightPadding); // largura do gráfico
const graphicHeight = canvasHeight - (canvasBottomPadding + canvasTopPadding); // altura do gráfico

var distanceBetween; // distância entre um índice e outro do gráfico
var width;  // largura dos índices do gráfico (se forem barras)
var heightMultiplier; // multiplicador da altura que os índices serão exibidos

function calculateGraphic(data) {

  distanceBetween = graphicWidth / data.length;

  width = (graphicWidth / data.length) / 2;

  let maxBarHeight = 0;
  data.forEach((element) => {
    if (element.content > maxBarHeight) {
      maxBarHeight = element.content;
    };
  });
  heightMultiplier = 100 / ((100 * maxBarHeight) / graphicHeight);
}

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// funções para desenho do gráfico
function drawCanvas() {
  canvasContext.fillStyle = '#eeeeee';
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
};

function drawGraphicBorders() {
  canvasContext.beginPath();
  canvasContext.moveTo(
    canvasLeftPadding,
    canvasTopPadding
  );
  canvasContext.lineTo(
    canvasLeftPadding,
    canvasHeight - canvasBottomPadding
  );
  canvasContext.lineTo(
    canvasLeftPadding + graphicWidth,
    canvasTopPadding + graphicHeight
  );
  canvasContext.stroke();
};

function drawHorizontalLines(lineWidth, a) {

  // desenha as linhas pontilhadas
  for (let i = lineWidth; i < graphicWidth; i += (lineWidth * 2)) {
    canvasContext.beginPath();
    canvasContext.moveTo(
      canvasLeftPadding + i,
      canvasHeight - canvasBottomPadding - a
    );
    canvasContext.lineTo(
      canvasLeftPadding + i + lineWidth,
      canvasHeight - canvasBottomPadding - a
    );
    canvasContext.stroke();
  }

  // esconde pedaços das linhas que tenham passado a largura do gráfico
  canvasContext.fillStyle = '#eeeeee';
  canvasContext.fillRect(canvasLeftPadding + graphicWidth, 0, canvasWidth, canvasHeight);

}

function drawGraphicBar(width, height, distanceBetween) {
  let barTopStart = canvasHeight - canvasBottomPadding - height;
  let barLeftStart = canvasLeftPadding + distanceBetween + (width / 2);
  canvasContext.fillStyle = '#66dd66';
  canvasContext.fillRect(barLeftStart, barTopStart, width, height);
};

function drawGraphicLine(width, height, distanceBetween) {
  let barTopStart = canvasHeight - canvasBottomPadding - height;
  let barLeftStart = canvasLeftPadding + distanceBetween + width;
  canvasContext.lineTo(barLeftStart, barTopStart);
};

function drawGraphicInfoText(text, x, y) {
  canvasContext.font = '12px Arial';
  canvasContext.fillStyle = '#111111'
  canvasContext.fillText(text, x, y);
}

function buildCanvas(data) {

  // fundo do canvas
  drawCanvas();

  // calcula parâmetros de exibição dos indices no gráfico
  calculateGraphic(data);

  // linhas horizontais para auxilio na leitura dos índices
  drawHorizontalLines(10, 50);
  drawHorizontalLines(10, 100);
  drawHorizontalLines(10, 150);
  drawHorizontalLines(10, 200);

  if (data.length > 0) {

    if (graphicType == 'bars') {

      // barras do gráfico
      data.forEach((element, id) => {
        drawGraphicBar(
          width,
          element.content * heightMultiplier,
          distanceBetween * id
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
      canvasContext.beginPath();
      canvasContext.moveTo(
        canvasLeftPadding + (distanceBetween * 0) + width,
        canvasHeight - canvasBottomPadding - (data[0].content * heightMultiplier));
      data.forEach((element, id) => {
        drawGraphicLine(
          width,
          element.content * heightMultiplier,
          distanceBetween * id
        );
        // Desenha informações dos índices do gráfico
        // drawGraphicInfoText(
        //   element.legend,
        //   canvasLeftPadding + (distanceBetween * id) + width,
        //   canvasHeight - canvasBottomPadding + 20
        // );
      });
      canvasContext.stroke();

    };

  };

  // linha da esquerda e de baixo do gráfico
  drawGraphicBorders();

};