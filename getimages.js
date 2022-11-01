const boxers = require("./boxers.json")
const axios = require("axios")
const { JSDOM } = require("jsdom")
const fs = require("fs"); 
//console.log(boxers); 

async function getBoxerImages(){
    
    for (boxer of boxers){
        console.log("Boxer:",boxer.name)
        //console.log(boxers); 
        const page = await axios.get(`https://en.wikipedia.org/${boxer.wikipediaUrl}`)
        
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
        console.log("url?:", boxer.imageUrl)

}
fs.writeFileSync("boxersWithImages.json", JSON.stringify(boxers)); 

//console.log(boxers); 
}


getBoxerImages()