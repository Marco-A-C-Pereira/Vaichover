import '../css/index.scss'
import { CityData } from './modules/CityData'

import { getMainCities, getUserCity} from './modules/weatherAPI'
import { createCard } from './modules/weatherCard'

window.addEventListener('load', () => {
    buildApp()    
})

async function buildApp() {
    let cities: CityData[] = await getMainCities() 

    cities.forEach(city => {
      createCard( city )
    })
}

document.querySelector('.btn__descubra')?.addEventListener('click', () => {
  buildUserCity()
})

async function buildUserCity() {
  let city:CityData = await getUserCity()

  if(city){
    document.querySelectorAll('.card-wrapper').forEach(element => {
      element.remove()
      // 100% tem forma melhor de fazer isso kskksks
    });

    createCard(city);
  }
}