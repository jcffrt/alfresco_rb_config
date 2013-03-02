//Genera un borrador de oficio saliente en la carpeta de borradores como respuesta a un oficio entrante SI no se ha creado ya (oficioCreado = false)
// Le asigna un num único de registro interno

if (document.properties["rb:oficioCreado"] == false)
{

if (document.properties["rb:remitente"].name == 'TM')
{
var plantilla=companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Plantillas/Plantilla oficio a TM.docx");
}
else if (document.properties["rb:remitente"].name == 'LG')
{
var plantilla=companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Plantillas/Plantilla oficio a LG.docx");
}
else
{
var plantilla=companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Plantillas/Plantilla oficio generica.docx");
}
// Copia la plantilla seleccionada a la carpeta de preparación de borrador de oficio
var borrador=companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Oficios salientes/1. Borrador contenido/");
var docBorrador = plantilla.copy(borrador);

//Se asocia este nuevo oficio al oficio entrante que lo originó
docBorrador.createAssociation(document, "rb:documentosRelacionados");


var personaResponsable = document.assocs["rb:personaResp"];
var objetoPers=people.getPerson(personaResponsable[0].properties["cm:userName"]);
docBorrador.createAssociation(objetoPers, "rb:personaResp");
// logger.log(docBorrador.assocs["rb:personaResp"][0].properties["cm:userName"]);

//logger.log(copiaPlantilla.qnamePath);
//var restype= copiaPlantilla.specializeType("rb:oficio");
//var resasp= copiaPlantilla.addAspect("rb:oficioSaliente");
//logger.log(restype);
//logger.log(resasp);
//docBorrador.save();

//docBorrador = companyhome.childByNamePath("/sites/correspondencia/documentlibrary/Oficios salientes/1. Borrador contenido/Plantilla oficio a TM.docx");
//logger.log(docBorrador.qnamePath);
//Se fijan las propiedades del oficio de respuesta a partir del oficio al que se responde
var destinatario = document.properties['rb:destinatario'];
docBorrador.properties['rb:remitente']= destinatario;
//logger.log(docBorrador.properties['rb:remitente'].name);
var remitente = document.properties["rb:remitente"];
docBorrador.properties["rb:destinatario"]= remitente;
//logger.log(docBorrador.properties['rb:destinatario'].name);

//var personaResponsable = document.assocs["rb:personaResp"];
//docBorrador.properties["rb:personaResp"]= personaResponsable;
//docBorrador.createAssociation(personaResponsable, "rb:personaResponsable");

//var personaResponsable = document.assocs["rb:personaResp"];
//var persona=people.getPerson(personaResponsable[0].properties["cm:userName"]);
//docBorrador.createAssociation(persona, "rb:personaResp");
// logger.log(docBorrador.assocs["rb:personaResp"][0].properties["cm:userName"]);

var areaResponsable = document.properties["rb:area_resp"];
docBorrador.properties["rb:area_resp"]= areaResponsable;
var relevancia = document.properties["rb:relevancia"];
docBorrador.properties["rb:relevancia"]= relevancia;

var tema = document.properties["rb:tema"];
docBorrador.properties["rb:tema"]='Respuesta a: ' + tema;
//logger.log(docBorrador.properties["rb:tema"]);

var titulo = document.properties["cm:title"];    
docBorrador.properties["cm:title"]='Respuesta a: ' + titulo;
//logger.log(docBorrador.properties["cm:title"]);

var fecha_respuesta =document.properties["rb:fecha_resp"];
docBorrador.properties["rb:fecha_resp"]=fecha_respuesta;
//logger.log(docBorrador.properties["rb:fecha_resp"]);

//Salvamos el borrador de oficio
docBorrador.save();
//logger.log(resultado);

// Marca el oficio entrante dejando constancia que se ha creado el oficio saliente 
document.properties["rb:oficioCreado"]=true;
document.save();

// Build the unique record identifier -- based on the node-dbid value
//var idStr = '' + copiaPlantilla.properties["sys:node-dbid"];
// Pad the string with zeros to be 10 characters in length
//while (idStr.length < 10)
//{
//idStr = '0' + idStr ;
//}
//copiaPlantilla.name= 'RB ' + d.getFullYear() + '-' +idStr + ' TM 2013EE843';

//copiaPlantilla.properties["rma:identifier"] = d.getFullYear() + '-' +idStr;

//copiaPlantilla.save();

//document.move(recordFolder);

}
//si ya estaba creado el oficio saliente. no hacemos nada