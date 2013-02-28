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
			//targetFile.properties["rb:remitente"] = arrData[i][1];
			//targetFile.properties["rb:destinatario"] = arrData[i][2];
			targetFile.properties["cm:description"] = arrData[i][3];
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
			case "Tecnologia" 
			
			}
            //targetFile.properties["rb:area_resp"] = arrData[i][9];
			//targetFile.properties["rb:persona_resp"] = arrData[i][10];
			targetFile.properties["rb:respondida"] = arrData[i][11];

			        
            targetFile.save();          
          }
        }  
		
function catTecnologia(){
	return utils.getNodeFromString("workspace://SpacesStore/98a44d8a-4803-4b5f-a7c7-55def12bfb76");
}