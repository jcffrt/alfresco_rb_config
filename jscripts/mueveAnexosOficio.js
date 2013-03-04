//Mueve los posibles anexos que se hayan asociado un oficio al entrar el oficio en la carpeta destino cuando es trasladado
//Para usar en regla de entrada de oficios a carpeta destino (para el movimiento al registro y dentro del registro)
for (var i in document.childAssocs["rb:anexosOficio"]) {
	var anexo = document.childAssocs["rb:anexosOficio"][i];
	anexo.move(document.parent);
	anexo.save();
}
