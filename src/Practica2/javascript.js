function fechaHoy() {
	return new Date();
}

function fechaHoyToString() {
	document.getElementById("fecha").innerHTML = "Fecha: " + fechaHoy().toLocaleDateString();
}

function calcularFechaAbono() {
	var radioButtons = document.getElementsByName('fechaLimite');
	var numDias = 0;
	for (var i = 0; i < radioButtons.length; i++) {
		if (radioButtons[i].checked) {
			numDias = radioButtons[i].value;
		}
	}
	numDias  = numDias*24*60*60*1000;
	document.getElementById("fechaAbono").innerHTML = "Fecha límite de abono: " + new Date(fechaHoy().getTime() + numDias).toLocaleDateString();
}