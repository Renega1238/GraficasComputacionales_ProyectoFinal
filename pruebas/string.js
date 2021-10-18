let str = " W x0.05 y1 z645 a32;\nW x1,y1 z16.8 a24;\nW x45.01 y2 z58,a3.5 W x78 \ny0.25 z.56, a21.9365&";
let str2 = "W x4 y2 z58&"

//console.log(str);
console.log(str2);

function char(str)
{
    let size = str.length;
    console.log(size);


    let strArray = str.split("\n");
    console.log(strArray);

    let strArraySize = strArray.length;
    console.log(strArraySize);

    let p = strArray[0].length;
    console.log(strArray[0]);
    console.log(`P size ${p}`);

    console.log("\n\n");

    let p2 = null;
    for(let i = 0; i < p; i++)
    {
        p2 = strArray[0].replace(" ", "");
    }
    
    console.log(strArray[0])
    console.log(p2);
    console.log(p2[0]);
    console.log(p2[3]);
    
}

let coord = [];
let x = 0, y = 0, z = 0, a = 0; 
let state = 0; 
function getCoord(str)
{
    let i = 0; 
    while(str[i] != null)
    {
         switch(state)
         {
             case 0: 
                
                if(str[i] == " " || str[i] == "\n")
                {
                    i++;
                }
                else if(str[i] == "W")
                {
                    
                    i++; 

                    state = 1; 

                }

                break;
            
            // Cuando encontramos una W
            case 1: 

                if(str[i] == " " || str[i] == "\n")
                {
                    i++;

                } // Fin de muro
                else if(str[i] == ";")
                {

                    i++;

                    state = 0; 

                }
                else if(str[i] == "x")
                {

                    i++;

                    state = 2;
                    
                }
                else if(str[i] == "y")
                {
                    
                    i++; 

                    state = 3; 

                }
                else if(str[i] == "z")
                {
                  
                    i++; 

                    state = 4; 

                }
                else if(str[i] == "a")
                {

                    i++; 

                    state = 5;

                }

                break;
            
            // Coord en X 
            case 2: 
                
                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    i++;

                    state = 1; 

                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    x += str[i++];
                }

                break;
            
            // Coord en Y 
            case 3: 
               
                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    i++;

                    state = 1; 

                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    y += str[i++];
                }

                break;

            // Coord en Z
            case 4: 

                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    
                    i++;

                    state = 1; 
                    //break;
                    
                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    z += str[i++]; 
                }
                
                break;
            
            case 5:

                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    i++;

                    x = parseFloat(x);
                    y = parseFloat(y);
                    z = parseFloat(z);
                    a = parseFloat(a);

                    //state = 5; 
                    coord.push({x: x, y: y, z: z, a: a});

                    x = 0; 
                    y = 0; 
                    z = 0; 
                    a = 0;

                    state = 0; 

                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    a += str[i++];
                }

                break;

         } 
    }
}


getCoord(str);

console.log(coord);
/*
let ax = "2";
console.log(ax);
ax += "2"; 
console.log(ax);
*/
//char(str);