import { CityData } from "./CityData";

export { createCard };

const templateFrag = document.getElementById(
  "card-template"
) as HTMLTemplateElement;

function createCard(city: CityData): void {
  const templateNodes = templateFrag.content.firstElementChild?.cloneNode(true) as HTMLElement;

  console.log(city);
  
  templateNodes.querySelector(".card__title")!.innerHTML = city.cityName;
  templateNodes.querySelector(".card__temperature--curr")!.textContent = `Temperatura: ${city.currentWeather.temperature}º`;
  templateNodes.querySelector(".card__temperature--max")!.textContent = `Max: ${city.daily.tempMax}º`;
  templateNodes.querySelector(".card__temperature--min")!.textContent = `Max: ${city.daily.tempMin}º`;
  templateNodes.querySelector(".card__icon")!.classList.add(selectIcon(city.currentWeather.weathercode));

  document.querySelector(".cards__container")?.appendChild(templateNodes);
}

function selectIcon(weathercode: number):string {
  let isNight: 'night' | 'day' = (new Date().getHours() >= 18 || new Date().getHours() <= 6) ? 'night' : 'day';

  // Tabela de códigos: https://open-meteo.com/en/docs
  if (weathercode === 0) return `wi-${isNight}-sunny`;
  else if (weathercode >= 1 && weathercode <= 3) return `wi-${isNight}-cloudy`;
  else if (weathercode >= 45 && weathercode <= 48)  return `wi-${isNight}-fog`;
  else if (weathercode >= 51 || weathercode <= 82) return `wi-${isNight}-rain`; // Chuva
  else if (weathercode === (95)) return `wi-${isNight}-thunderstorm`; // Chuva
  else return 'wi-alien'
}
