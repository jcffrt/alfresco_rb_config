var CSVFile = companyhome.childByNamePath("/sites/correspondencia/documentlibrary/MetaData.csv");
var strData = CSVFile.content;
var strDelimiter = ";";
 
		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
 
				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
 
				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);
 
 
		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];
 
		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;
 
 
		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec( strData )){
 
			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[ 1 ];
 
			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				(strMatchedDelimiter != strDelimiter)
				){
 
				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push( [] );
 
			}
 
 
			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[ 2 ]){
 
				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				var strMatchedValue = arrMatches[ 2 ].replace(
					new RegExp( "\"\"", "g" ),
					"\""
					);
 
			} else {
 
				// We found a non-quoted value.
				var strMatchedValue = arrMatches[ 3 ];
 
			}
 
 
			// Now that we have our value string, let's add
			// it to the data array.
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		} 
 
 
print(arrData);
 
for (var i=0; i<arrData.length; i++)
	{
          var fileName = arrData[i][13] + '.pdf'; 
      		logger.log(fileName);
      		logger.log(space.qnamePath);
          var targetFile = space.childByNamePath(fileName); 
          if (targetFile != null)
          { 
			logger.log(targetFile.qnamePath);
			targetFile.properties["rb:tema"] = arrData[i][0];
			logger.log(targetFile.properties["rb:tema"]);
			switch (arrData[i][1]) {
			case "RB":
					targetFile.properties["rb:area_resp"] = catRB();
				break;
			case "TM":
					targetFile.properties["rb:area_resp"] = catTM();
				break;
			case "LG":
					targetFile.properties["rb:area_resp"] = catLG();
				break;
			}
			switch (arrData[i][2]) {
			case "RB":
					targetFile.properties["rb:area_resp"] = catRB();
				break;
			case "TM":
					targetFile.properties["rb:area_resp"] = catTM();
				break;
			case "LG":
					targetFile.properties["rb:area_resp"] = catLG();
				break;
			}
			//targetFile.properties["rb:remitente"] = arrData[i][1];
			//targetFile.properties["rb:destinatario"] = arrData[i][2];
			targetFile.properties["cm:description"] = arrData[i][3];
			targetFile.properties["cm:radicado_int"] = arrData[i][4];
			targetFile.properties["rb:radicado_ext"] = arrData[i][5];
            logger.log(arrData[i][6]);
			targetFile.properties["rb:fecha_radicado"] = utils.fromISO8601(arrData[i][6]);
			targetFile.properties["rb:respuesta_req"] = arrData[i][7];
			logger.log(arrData[i][8]);
            if (arrData[i][8] != '')
            {  
              targetFile.properties["rb:fecha_resp"] = utils.fromISO8601(arrData[i][8]);
          	}
			switch (arrData[i][9]) {
			case "calidad":
					targetFile.properties["rb:area_resp"] = catCalidad();
				break;
			case "comunicacion":
					targetFile.properties["rb:area_resp"] = catComunicacion();
				break;
			case "financiera":
					targetFile.properties["rb:area_resp"] = catFinanciera();
				break;
			case "infraestructura":
					targetFile.properties["rb:area_resp"] = catInfraestructura();
				break;
			case "instalaciones":
					targetFile.properties["rb:area_resp"] = catInstalaciones();
				break;
			case "juridica":
					targetFile.properties["rb:area_resp"] = catJuridica();
				break;
			case "negocio":
					targetFile.properties["rb:area_resp"] = catNegocio();
				break;
			case "operaciones":
					targetFile.properties["rb:area_resp"] = catOperaciones();
				break;
			case "presidencia":
					targetFile.properties["rb:area_resp"] = catPresidencia();
				break;
			case "red externa":
					targetFile.properties["rb:area_resp"] = catRedExterna();
				break;
			case "tecnologia":
					targetFile.properties["rb:area_resp"] = catTecnologia();
				break;
			
			}
            //targetFile.properties["rb:area_resp"] = arrData[i][9];
			//targetFile.properties["rb:persona_resp"] = arrData[i][10];
			targetFile.properties["rb:respondida"] = arrData[i][11];

			        
            targetFile.save();          
          }
        }  
		
function catComunicacion(){
	return utils.getNodeFromString("workspace://SpacesStore/50ee2696-a100-4ba0-86e3-b2031c104ffb");
}
function catNegocio(){
	return utils.getNodeFromString("workspace://SpacesStore/d2a132d2-bfa8-4f88-b44f-7e703d3de854");
}
function catFinanciera(){
	return utils.getNodeFromString("workspace://SpacesStore/32132dd3-bbe4-4e04-97a9-59892ad83150");
}
function catJuridica(){
	return utils.getNodeFromString("workspace://SpacesStore/5df90905-1dbd-41c7-8dfe-c8be7044eddb");
}
function catOperaciones(){
	return utils.getNodeFromString("workspace://SpacesStore/3f2d7c59-7e04-4731-ace1-6c1ceb15a8de");
}
function catPresidencia(){
	return utils.getNodeFromString("workspace://SpacesStore/059048af-aa82-4585-8aa9-8596dc28298e");
}
function catTecnologia(){
	return utils.getNodeFromString("workspace://SpacesStore/b20b0cee-0b0e-4084-92d6-34d11d190eb9");
}
function catCalidad(){
	return utils.getNodeFromString("workspace://SpacesStore/70790107-3b73-4a8a-a218-fa23febb425f");
}
function catDirTecnica(){
	return utils.getNodeFromString("workspace://SpacesStore/b20b0cee-0b0e-4084-92d6-34d11d190eb9");
}
function catInstalaciones(){
	return utils.getNodeFromString("workspace://SpacesStore/c603844d-ac98-4dff-9910-5249ea097dbb");
}
function catInfraestructura(){
	return utils.getNodeFromString("workspace://SpacesStore/c637706c-6432-4e8b-b3eb-58b91f535e01");
}
function catFMS(){
	return utils.getNodeFromString("workspace://SpacesStore/a5fbfc6d-b2f4-4a4e-819d-c471b4a65807");
}
function catFCS(){
	return utils.getNodeFromString("workspace://SpacesStore/6fee1eb3-db8e-46a7-bfbc-d6137cb52398");
}
function catEstaciones(){
	return utils.getNodeFromString("workspace://SpacesStore/c919c2d9-6a97-4780-929b-83b4e3dc4da8");
}
function catExpServicio(){
	return utils.getNodeFromString("workspace://SpacesStore/69f68467-6dd4-4519-b44a-5050f2da9da9");
}
function catRRHH(){
	return utils.getNodeFromString("workspace://SpacesStore/7478ec6a-6c2a-4e4c-a7c1-0f8dfdc0cd76");
}
function catProcControl(){
	return utils.getNodeFromString("workspace://SpacesStore/2cc71e82-1360-4e5d-a87d-693591e196fb");
}
function catRedExterna(){
	return utils.getNodeFromString("workspace://SpacesStore/2543379e-e335-4739-afe3-6a0da090ead7");
}
function catSegurFisica(){
	return utils.getNodeFromString("workspace://SpacesStore/154eca93-3a22-40d7-a354-7c584497119a");
}
function catRB(){
	return utils.getNodeFromString("workspace://SpacesStore/f79e2f01-23c4-4571-a001-1092bffde290");
}
function catTM(){
	return utils.getNodeFromString("workspace://SpacesStore/784c794f-c3b1-4793-a706-2961e4248cc3");
}
function catLG(){
	return utils.getNodeFromString("workspace://SpacesStore/5c21b474-bccb-4c2d-a9a3-83bb714821fa");
}

