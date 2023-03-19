import { querryGen, getMainCities} from './modules/weatherAPI.js'

// let test = querryGen();
// console.log('testee:', test)

function setStorage() {
    console.log(querryGen());
    
    // localStorage.setItem('Weather', JSON.stringify(querryGen()))
}

window.addEventListener('load', () => {
    getMainCities()
    // if(localStorage.getItem('Weather') === null ) 
    //   setStorage()
})

