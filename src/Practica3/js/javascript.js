$(document).ready(function (){
	$("#fecha").datepicker();
	$("#radio").buttonset();
	$("#sortable").sortable();
	$("#sortable").disableSelection();
	$("#aumentar").button().click(aumentar());
	$("#disminuir").button().click(disminuir());
	$("#enviar").button();
	$("input[name=medio]:radio").change(function () {
		if(this.value=='ordinario'){
			mostrarCorreo();
		}else{
			 mostrarCorreoElectronico();
		}
	});
	$("button").addClass("hereda");
	$("label").addClass("hereda");
});

function mostrarCorreo() {
		$('#correoContainer').removeClass("no-display");
		$('#correoElectronicoContainer').addClass("no-display");
}

function mostrarCorreoElectronico() {
		$('#correoElectronicoContainer').removeClass("no-display");
		$('#correoContainer').addClass("no-display");	
}

function aumentar() {
	
}

function disminuir() {
	
}