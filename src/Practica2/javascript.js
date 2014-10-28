var numLineasDetalle = 1;
var numDatos = 4;

function fechaHoy() {
	return new Date();
}

function onload() {
	document.getElementById("fecha").innerHTML = "Fecha: " + fechaHoy().toLocaleDateString();
}

function calcularFechaAbono() {//TODO ver q no meta una fecha anterior al dia de hoy
	var numDias = 0;
	var fecha;
	if(document.getElementById('calendarioSi')==null){		
		var radioButtons = document.getElementsByName('fechaLimite');		
		for (var i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].checked) {
				numDias = radioButtons[i].value;
			}
		}
		fecha  = new Date(fechaHoy().getTime() + numDias*24*60*60*1000);
	}else{
		var ano = document.getElementById('calendarioFechaLimite').value.substring(0, 4);
		var mes = document.getElementById('calendarioFechaLimite').value.substring(5, 7);
		var dia = document.getElementById('calendarioFechaLimite').value.substring(8, 10);
		fecha = new Date(ano, mes-1, dia);		
	}
	document.getElementById("fechaAbono").innerHTML = "Fecha límite de abono: " + fecha.toLocaleDateString();
}

function aniadirLinea() {
	var contenedor = document.getElementById('lineasDetalle');
	var linea = document.createElement('tr');  
	for (var i = 0; i < numDatos; i++) {
		var nuevoTd = document.createElement('td');
		var nuevoInput = document.createElement('input');
		nuevoInput.type = 'text';
		switch (i) {
			case 0:
				nuevoInput.id = 'concepto' + numLineasDetalle;
				break;
			case 1:
				nuevoInput.id = 'precio' + numLineasDetalle;
				break;
			case 2:
				nuevoInput.id = 'unidades' + numLineasDetalle;
				break;
			case 3:
				nuevoInput.id = 'importe' + numLineasDetalle;
				break;	
			default:
				break;
		}		
		nuevoTd.appendChild(nuevoInput);
		linea.appendChild(nuevoTd);
	}	
	contenedor.appendChild(linea);
	numLineasDetalle++;
	if(document.getElementById('botonEliminar').disabled == true)
		document.getElementById('botonEliminar').disabled = false;
}

function eliminarLinea() {      
    if(numLineasDetalle>1){
        document.getElementById('lineasDetalle').removeChild(document.getElementById('lineasDetalle').lastChild);
        numLineasDetalle--;
        if (numLineasDetalle<=1) {
        	document.getElementById('botonEliminar').disabled = true;
    	}
    }        
}

function mostrarCalendario() {
	document.getElementById("fechaAbono").innerHTML = "Fecha límite de abono: -";
	document.getElementById('calendarioNo').setAttribute("id","calendarioSi");
}

function ocultarCalendario() {
	if(document.getElementById('calendarioSi')!=null)
		document.getElementById('calendarioSi').setAttribute("id","calendarioNo");
}