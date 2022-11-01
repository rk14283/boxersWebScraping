const axios = require("axios")
const { JSDOM } = require("jsdom")
const fs = require("fs");
async function scrape() {
    const page = await axios.get("https://en.wikipedia.org/wiki/List_of_male_boxers")
    const html = page.data
    //console.log(html); 
    //javascript object with HTML
    const jsdom = new JSDOM(html);
    // console.log(jsdom.window.document); 

    //get one HTML heading element 
    // const titleText = jsdom.window.document.querySelector("h1");
    // console.log(titleText.textContent); 
    //All means all the lists 
    //this is our div 
    const listSection = jsdom.window.document.querySelector(".mw-parser-output")
    //ul list in the div 
    const lists = listSection.querySelectorAll("ul");

    ////27 
    //console.log(lists.length); 

    const boxers = []

    //loop over the lists 
    for (index = 1; index < lists.length; index++) {
        const list = lists[index];
        //loop over the list items 
        const listItems = list.querySelectorAll("li");
        for (listItem of listItems) {
            ////can get name without split 
            //after name we want more things like the image 

            const name = { name: listItem.textContent.split("(")[0] };

            const linkAddress = listItem.querySelector("a").href

            let wikipediaUrl = linkAddress.includes("/wiki") ? linkAddress : null;


            //push only with wikipediaurl 
            if (wikipediaUrl) {
                const boxer = { name: name, wikipediaUrl: wikipediaUrl };
                boxers.push(boxer);

            }

            ////to see if there is link foor each element 
            // console.log(listItem.querySelector("a").href); 



        }
    }
    console.log(boxers);
    fs.writeFileSync("boxers.json", JSON.stringify(boxers));

}

scrape(); 
