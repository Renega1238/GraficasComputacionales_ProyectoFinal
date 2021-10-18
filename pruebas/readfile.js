/*
document.getElementById('inputfile')
            .addEventListener('change', function() {
              
            var fr=new FileReader();
            fr.onload=function(){
                document.getElementById('output')
                        .textContent=fr.result;
            }
              
            fr.readAsText(this.files[0]);
        }) 
*/

var fs = require("fs");
fs.readFile("./prueba.txt", function(text)
{
    console.log(text);
    
});

