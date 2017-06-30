function Map(rows, collumns) {
  this.SIZE = 32;
  this.enemies = [];
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx) {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c] == 1) {
	   ctx.fillStyle = "black";
	  }
	  else if(this.cells[r][c] == 2){ // comida
        ctx.fillStyle = "orange";
      } else if(this.cells[r][c] == 3) { // agua(lentidao)
		ctx.fillStyle = "blue";
	  } else if(this.cells[r][c] == 4) { // saida
		ctx.fillStyle = "green";
	  }
    
	ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
	ctx.fillStyle = "white"; // resetando o fillstyle
	}
  }
};

Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1; // parede
          break;
        case 2:
          this.cells[i][j] = 2; // comida
          break;
		case 3:
			this.cells[i][j] = 3; // agua
			break;
		case 4:
			this.cells[i][j] = 4; // saida
			break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
};


