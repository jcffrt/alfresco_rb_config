var listaOficios = companyhome.childByNamePath("/sites/correspondencia/dataLists/c461edc9-0436-41c3-a264-932d1787bba3");

//logger.log(listaOficios.name);

//logger.log(document.assocs["rb:documentosRelacionados"][0].name);


if (listaOficios) {

  if (document.assocs["rb:documentosRelacionados"]) {
    //logger.log(document.assocs["rb:documentosRelacionados"][0]);
    //logger.log("primer if");
  if (document.assocs["rb:documentosRelacionados"][0].parent.name == "c461edc9-0436-41c3-a264-932d1787bba3") {   
  	var nombre_oficio = document.assocs["rb:documentosRelacionados"][0].name;
  	var oficio = companyhome.childByNamePath("/sites/correspondencia/dataLists/c461edc9-0436-41c3-a264-932d1787bba3/" + nombre_oficio);
  	//logger.log(oficio.name + " segundo if");
    document.removeAssociation(oficio, "rb:documentosRelacionados");
    oficio.remove();
  }
  
  }
//logger.log(listaOficios.name);
  
  

//  if (document.assocs["rb:documentosRelacionados"][0].parent.name != "c461edc9-0436-41c3-a264-932d1787bba3") {      
  var oficio = listaOficios.createNode(null, "rb:tareas_oficios");
//  } else {
//    var nombre_oficio = document.assocs["rb:documentosRelacionados"][0].name;
//    logger.log(nombre_oficio);
//    var oficio = companyhome.childByNamePath("/sites/correspondencia/dataLists/c461edc9-0436-41c3-a264-932d1787bba3/62596759-b114-4b83-bbc0-df25efa983b7");
    //var oficio = companyhome.childByNamePath("/sites/correspondencia/dataLists/c461edc9-0436-41c3-a264-932d1787bba3/" + nombre_oficio);
//  }
  
//  logger.log(oficio.name);
  
  var titulo=document.properties["cm:name"];
  //logger.log(titulo);
      oficio.properties["cm:title"] = titulo;
  //logger.log(oficio.properties["cm:title"] );
  oficio.properties["cm:description"] = document.properties["cm:description"];
  //logger.log(oficio.properties["cm:description"]);
  
  oficio.properties["dl:ganttStartDate"] = document.properties["cm:created"];
  oficio.properties["dl:ganttEndDate"] = document.properties["rb:fecha_resp"];
  oficio.save();

  var personaResponsable = document.assocs["rb:personaResp"];
  //logger.log(personaResponsable);

  if (personaResponsable){
  	var objetoPers=people.getPerson(personaResponsable[0].properties["cm:userName"]);
  	oficio.createAssociation(objetoPers, "dl:taskAssignee");
  }

  
  //logger.log(oficio.name);
 
  
  oficio.properties["rb:fase_oficio"] = "Borrador contenido";
  oficio.properties["dl:ganttPercentComplete"] = 0;
  oficio.properties["dl:taskStatus"] = "In Progress";  

  if (document.properties["rb:borradorContOk"] == true) {  
  	oficio.properties["rb:fase_oficio"] = "Borrador legal";
    oficio.properties["dl:ganttPercentComplete"] = 40;
  } 
  if (document.properties["rb:borradorJurOk"] == true) {  
  	oficio.properties["rb:fase_oficio"] = 'Aprobar';
  //  logger.log(oficio.properties["dl:fase_oficio"]);
    oficio.properties["dl:ganttPercentComplete"] = 70;
  } 
  if (document.properties["rb:aprobado"] == true) {  
  	oficio.properties["rb:fase_oficio"] = "Firma";
    oficio.properties["dl:ganttPercentComplete"] = 80;
      } 
  if (document.properties["rb:firmado"] == true) {  
  	oficio.properties["rb:fase_oficio"] = "Radicado-captura";
    oficio.properties["dl:ganttPercentComplete"] = 90;
        } 
  if (document.properties["rb:radicado"] == true) {  
  	oficio.properties["rb:fase_oficio"] = "Completado";
    oficio.properties["dl:ganttPercentComplete"] = 100;
	oficio.properties["dl:taskStatus"] = "Complete";  
  		}
   
  if (document.properties["rb:relevancia"] == 1) {
	oficio.properties["dl:taskPriority"] = "High";
      } else {
       if (document.properties["rb:relevancia"] == 2) {
      oficio.properties["dl:taskPriority"] = "Normal";
      } else {
      oficio.properties["dl:taskPriority"] = "Low";
      	}
      }
      
  
oficio.properties["dl:taskComments"] = document.properties["rb:tema"];
oficio.save();

oficio.createAssociation(document, "cm:attachments");

  
oficio.save();

//if (document.assocs["rb:documentosRelacionados"][0].parent.name != "c461edc9-0436-41c3-a264-932d1787bba3") {        
document.createAssociation(oficio, "rb:documentosRelacionados");
document.save();
//}
  

}

