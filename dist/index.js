import { querryGen, getMainCities } from './modules/weatherAPI.js';
function setStorage() {
    console.log(querryGen());
}
window.addEventListener('load', () => {
    getMainCities();
});
