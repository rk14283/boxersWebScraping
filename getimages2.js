const boxers = require("./boxers.json")
const axios = require("axios")
const { JSDOM } = require("jsdom")
const fs = require("fs"); 
//console.log(boxers); 

async function getBoxerImages(){

  
    
    for (boxer of boxers){
        console.log("Boxer:",boxer.name)
        //console.log(boxers); 
        const page = await axios.get(`https://en.wikipedia.org${boxer.wikipediaUrl}`)
        
        const html = page.data
        //console.log(html); 
        //javascript object with HTML
        const jsdom = new JSDOM(html);
        const infoBox = jsdom.window.document.querySelector(".infobox-image");
        if(infoBox){
            const imageUrl = infoBox.querySelector("img").src;
            boxer.imageUrl = imageUrl; 
        }else{
            boxer.imageUrl = null; 
            
        }
        const infoBoxTable = jsdom.window.document.querySelector(".infobox");
      
        
            //we need the . because it is a class 
            
            if(infoBoxTable){
                const tableRows = infoBoxTable.querySelectorAll('tr'); 

                for (tableRow of tableRows) {
                    const key = tableRow.querySelector(".infobox-label")?.textContent;
                    const value = tableRow.querySelector(".infobox-data")?.textContent;  
                    console.log(key,value);
                    if (key && value){
                        boxer[key] = value; 

                }



            }

            } 
        }
        //console.log(tableRows.length);
        console.log(boxer);
fs.writeFileSync("boxersWithImages2.json", JSON.stringify(boxers)); 

}


//console.log(boxers); 

getBoxerImages()