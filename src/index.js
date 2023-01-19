import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const list = document.querySelector('.country-list');
const inputHtml = document.querySelector('#search-box');
const info = document.querySelector('.country-info');

function onCreateItem (arr){
    return arr.reduce((acc, {flags,name})=> 
    acc + `<li><img  src="${flags.svg}"alt="${name.official}" ><p>${name.official}</p></li>`,''
);
};

function infoLang(lang){
let obj = [];
Object.entries(lang).forEach(([nam,val])=>{
   obj.push(val);

})
return obj;
}
function onCreateInfo(arr) {
    return arr.reduce((acc,{name,capital,population,flags,languages})=> acc + `<div>
    <div class="info-box"><img src="${flags.svg}"alt="${name.official}" ><h2>${name.official}</h2></div>
    <div class="info-box"><h3>Caption:</h3><p>${capital}</p></div>
    <div class="info-box"><h3>Population:</h3><p>${population}</p></div>
    <div class="info-box"><h3>Languages:</h3><p>${infoLang(languages)}</p></div>
    </div>`
    ,'')
    
    
}

function onClear () {
    list.innerHTML = '';
    info.innerHTML = '';
};

const DEBOUNCE_DELAY = 300;



inputHtml.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY) )
function onInput (evt){
    onClear();
    const val =  evt.target.value.trim();
    if (!val) {
        return
        } 
        
        fetchCountries(val).then(data=>{
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
            
            } else if (data.length >=2 && data.length) {
                list.insertAdjacentHTML('beforeend',onCreateItem(data)); 
            } else if(data.length === 1){
                info.insertAdjacentHTML('beforeend',onCreateInfo(data));

            }})
        .catch(err=>Notify.failure('Oops, there is no country with that name'))


             
}







