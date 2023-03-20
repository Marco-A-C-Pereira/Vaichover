import '../css/index.scss'

import { getMainCities} from './modules/weatherAPI'
import { createCard } from './modules/weatherCard'

window.addEventListener('load', () => {
    buildApp()    
})

async function buildApp() {
    createCard( await getMainCities() )
}