var numLineasDetalle = 1;
var numDatos = 4;
var fechaHoy = new Date();

function onload() {
	document.getElementById("fecha").innerHTML = "Fecha: " + fechaHoy.toLocaleDateString();
	document.getElementById('calendarioFechaLimite').setAttribute("value", fechaHoy.getFullYear() + "-" + ("0" + (fechaHoy.getMonth() + 1)).slice(-2) + "-" +  ("0" + fechaHoy.getDate()).slice(-2));
}

function calcularFechaAbono() {
	var numDias = 0;
	var fecha;		
	var radioButtons = document.getElementsByName('fechaLimite');		
	for (var i = 0; i < radioButtons.length-1; i++) {
		if (radioButtons[i].checked) {
			numDias = radioButtons[i].value;
		}
	}
	fecha  = new Date(fechaHoy.getTime() + numDias*24*60*60*1000);	
	document.getElementById("fechaAbono").innerHTML = "Fecha límite de abono: " + fecha.toLocaleDateString();
}

function calcularFechaAbonoDesdeDiaConcreto(){
	var ano = document.getElementById('calendarioFechaLimite').value.substring(0, 4);
	var mes = document.getElementById('calendarioFechaLimite').value.substring(5, 7);
	var dia = document.getElementById('calendarioFechaLimite').value.substring(8, 10);
	var fecha = new Date(ano, mes-1, dia,  fechaHoy.getHours(), fechaHoy.getMinutes(), fechaHoy.getSeconds(), fechaHoy.getMilliseconds());
	if(fechaHoy<=fecha){		
		document.getElementById("fechaAbono").innerHTML = "Fecha límite de abono: " + fecha.toLocaleDateString();
	}else{
		alert("Ha introducido una fecha anterior al día de hoy.");
	}
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
				nuevoInput.disabled = 'disabled';
				break;	
			default:
				break;
		}		
		nuevoTd.appendChild(nuevoInput);
		linea.appendChild(nuevoTd);
	}	
	contenedor.appendChild(linea);
	numLineasDetalle++;
	if(document.getElementById('botonEliminar').disabled == true){
		document.getElementById('botonEliminar').disabled = false;;
	}
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
	calcularFechaAbonoDesdeDiaConcreto();
	if (document.getElementsByName('fechaLimite')[document.getElementsByName('fechaLimite').length-1].checked && document.getElementById('calendarioNo')!=null) {
		document.getElementById('calendarioNo').setAttribute("id","calendarioSi");
	}	
}

function ocultarCalendario() {
	if (!document.getElementsByName('fechaLimite')[document.getElementsByName('fechaLimite').length-1].checked && document.getElementById('calendarioSi')!=null) {
		document.getElementById('calendarioSi').setAttribute("id","calendarioNo");
	}
}

function ocultarCalendarioDesdeDiaConcreto() {
	if (!document.getElementsByName('fechaLimite')[document.getElementsByName('fechaLimite').length-1].checked && document.getElementById('calendarioSi')!=null) {
		document.getElementById('calendarioSi').setAttribute("id","calendarioNo");
	}
}

function calcular() {
	var vacio = false;
	document.getElementById("subtotal").value = 0;	
	document.getElementById("iva").value = 0;
	document.getElementById("total").value = 0;	
	for (var i = 0; i < numLineasDetalle; i++) {
		document.getElementById("importe" + i).value = 0;
		if(document.getElementById("precio" + i).value && document.getElementById("unidades" + i).value && document.getElementById("concepto" + i).value){
			calcularImporte(i);
			actualizarSubtotal(i);
			actualizarIVA(i);
		}else{
			vacio =  true;			
		}	
	}	
	if(vacio){
		alert("No están rellenos todos los campos de la factura.");
	}else{
		var total = calcularTotal();
		mostrarGrafico(total);
	}
}

function calcularImporte(i) {
	document.getElementById("importe" + i).value = (parseFloat(document.getElementById("precio" + i).value) * parseInt(document.getElementById("unidades" + i).value)).toFixed(2);
}

function actualizarSubtotal(i) {	
	document.getElementById("subtotal").value = (parseFloat(document.getElementById("subtotal").value) + parseFloat(document.getElementById("importe" + i).value)).toFixed(2);
	
}

function actualizarIVA(i) {		
	document.getElementById("iva").value = ((parseFloat(document.getElementById("iva").value) + parseFloat(document.getElementById("importe" + i).value))*21/100).toFixed(2);	
}

function calcularTotal(i) {	
	document.getElementById("total").value = (parseFloat(document.getElementById("subtotal").value) + parseFloat(document.getElementById("iva").value)).toFixed(2);
	return document.getElementById("total").value;
}

function mostrarGrafico(total) {
	crearNuevoCanvas();
	pintarGrafico(total);	
}

function crearNuevoCanvas() {
	if(document.getElementById("graficoContainer").hasChildNodes()){
		document.getElementById("graficoContainer").removeChild(document.getElementById("myChart"));
	}
	var canvas = document.createElement("canvas");
	canvas.setAttribute("id", "myChart");
	canvas.setAttribute("height", 300);
	canvas.setAttribute("width", 300);
	document.getElementById("graficoContainer").appendChild(canvas);
}

function pintarGrafico(total) {
	Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= (value*" + parseFloat(total).toFixed(2) +")/100  %> €";
	var grafico = new Chart(document.getElementById("myChart").getContext("2d")).Pie();
	for (var i = 0; i < numLineasDetalle; i++) {
		var color = new Array(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
		grafico.addData({
		    value: (document.getElementById("importe" + i).value *  100) / total,
		    color: "rgb(" + color[0] +"," + color[1] +"," + color[2] + ")",
		    highlight: "rgba(" + color[0] +"," + color[1] +"," + color[2] + ",0.8)",
		    label: document.getElementById("concepto" + i).value
		});
	}
}

function enviar() {
	alert("Se han enviado los datos con éxito.");
}