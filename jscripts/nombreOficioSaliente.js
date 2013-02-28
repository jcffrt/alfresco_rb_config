//Esta para test:
//var documento=companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Oficios entrantes/1. Revision/RB 2013-0000001584 TM 2013EE843");

//Crea el nombre para el documento Oficio saliente asignándole el nun de registro o radicado RB
//Si está disponible el nombre de destinatario y el radicado externo se añaden al nombre

// Get today's date. We use it later to fill in metadata.
var d = new Date();
// Build the unique record identifier -- based on the node-dbid value
var idStr = '' + document.properties["sys:node-dbid"];
// Pad the string with zeros to be 10 characters in length
while (idStr.length < 10)
{
idStr = '0' + idStr ;
}

if (document.properties["rb:destinatario"].name != null) 
{
	if (document.properties["rb:radicado_ext"] != null)
	{
	document.name= 'RB-' + d.getFullYear() + '-' +idStr + '_' +  document.properties["rb:destinatario"].name + '-' + document.properties["rb:radicado_ext"];
	}
	else
	{
	document.name= 'RB-' + d.getFullYear() + '-' +idStr + '_' +  document.properties["rb:destinatario"].name + '-';
	}
}
else
{
document.name= 'RB-' + d.getFullYear() + '-' +idStr + '_' 
}

document.save();
