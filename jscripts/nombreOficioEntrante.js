//Esta para test:
//var documento=companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Oficios entrantes/1. Revision/RB 2013-0000001584 TM 2013EE843");

//Crea el nombre para el documento Oficio entrante asignándole el nun de registro o radicado RB

// Get today's date. We use it later to fill in metadata.
var d = new Date();
// Build the unique record identifier -- based on the node-dbid value
var idStr = '' + document.properties["sys:node-dbid"];
// Pad the string with zeros to be 10 characters in length
while (idStr.length < 10)
{
idStr = '0' + idStr ;
}
if ((document.properties["rb:remitente"] != null) && (document.properties["rb:radicado_ext"] != null))
{
document.name= document.properties["rb:remitente"].name + '-' + document.properties["rb:radicado_ext"] + '_RB-' + d.getFullYear() + '-' +idStr;
document.save();
}

//Cambia el nombre de los posibles anexos que se hayan asociado
for (var i in document.childAssocs["rb:anexosOficio"]) {
	var anexo = document.childAssocs["rb:anexosOficio"][i];
	//Ahora creamos la asociación en sentido inverso para que aparezca el enlace del padre en los anexos hijos del oficio
	//anexo.createAssociation(document, "rb:anexoDe");
  	if ((document.properties["rb:remitente"] != null) && (document.properties["rb:radicado_ext"] != null))
	{
      	var j=parseInt(i)+1;
		anexo.name= document.properties["rb:remitente"].name + '-' + document.properties["rb:radicado_ext"] + '_RB-' + d.getFullYear() + '-' +idStr+ '_anexo('+(j)+')';
	}
	var asociado = companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Oficios entrantes/Anexos/"+anexo.name);
  	//logger.log(asociado.name);
  	//asociado..createAssociation(document, "rb:anexoDe");
	anexo.save();
}

