import { CityData } from "./CityData";

export { createCard }

const templateFrag = document.getElementById('card-template') as HTMLTemplateElement
const templateNodes = templateFrag.content.cloneNode(true) as HTMLElement;
const template = templateNodes.firstElementChild;

// function log(){
//     // console.log(cardTemplate);
//     // console.log(templateNodes);    
//     console.log(template);    
// }

function createCard(city:CityData | CityData[]):void{
    template
    console.log(city);
    
}