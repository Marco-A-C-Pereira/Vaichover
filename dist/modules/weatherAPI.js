var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export { querryGen, getMainCities };
const mainCities = [
    { name: 'Curitiba - PR ', location: { latitude: -25.43, longitude: -49.27 } },
    { name: 'São Paulo - SP', location: { latitude: -23.55, longitude: -46.64 } },
    { name: 'Rio de Janeiro - RJ', location: { latitude: -22.91, longitude: -43.18 } }
];
function getMainCities() {
    return __awaiter(this, void 0, void 0, function* () {
        const cityData = [];
        for (const city of mainCities) {
            console.log(city.name);
            cityData.push(yield querryGen(city.location.latitude, city.location.longitude));
        }
        if (localStorage.getItem("Weather") === null)
            cache(cityData);
        console.log(cityData);
    });
}
function querryGen(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://api.open-meteo.com/v1/forecast?
			latitude=${latitude}
			&longitude=${longitude}
			&hourly=temperature_2m&current_weather=true&forecast_days=1&timezone=auto`;
        let response = yield fetch(url);
        let cityData = yield response.json();
        return cityData;
    });
}
function cache(obj) {
    localStorage.setItem("Weather", JSON.stringify(obj));
}
