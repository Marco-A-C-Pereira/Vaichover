import { CityData } from "./CityData";

export { getMainCities, getUserCity};

type CityQuerry = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

const mainCities: CityQuerry[] = [
  { name: "Curitiba - PR ", location: { latitude: -25.43, longitude: -49.27 } },
  { name: "São Paulo - SP", location: { latitude: -23.55, longitude: -46.64 } },
  {
    name: "Rio de Janeiro - RJ",
    location: { latitude: -22.91, longitude: -43.18 },
  },
];

async function getMainCities(): Promise<CityData[]> {
  let cityData: CityData[] = [];
  let cache: string | null = localStorage.getItem("mainCities");

  if (cache) {
    cityData = getMainCache(cache);
    console.log("cityData from cache:", cityData);
  }

  // TODO - Utilizar a Lib Loadash para comparar a consulta como cache no futuro
  if (cache === null) {
    for (const city of mainCities) {
      cityData.push(
        cityShape(
          await querryGen(city.location.latitude, city.location.longitude), city.name
        )
      );
    }

    console.log("cityData from API:", cityData);
    setCache(cityData);
  }

  return cityData;
}

async function getUserCity(): Promise<CityData> {
  const position:any = await getPosition()
  
  return cityShape(await querryGen(position.coords?.latitude, position.coords?.longitude)) 
}

function getPosition(){
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej)
  })

}

async function querryGen(
  latitude: number,
  longitude: number
): Promise<CityData> {
  let url: string = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&current_weather=true&forecast_days=1&timezone=auto
  `;

  let response = await fetch(url);
  let cityData = await response.json();

  return cityData;
}

function setCache(obj: object[]): void {
  localStorage.setItem("mainCities", JSON.stringify(obj));
}

function getMainCache(cache: string): CityData[] {
  return JSON.parse(cache);
}

function cityShape(apiCall: any, cityName:string = 'Sua cidade'): CityData {
  let tretatedCall: CityData = {
    cityName: cityName ,
    currentWeather: {
      temperature: apiCall.current_weather.temperature,
      weathercode: apiCall.current_weather.weathercode,
    },
    daily: {
      time: apiCall.daily.time,
      weathercode: apiCall.daily.weathercode,
      tempMax: apiCall.daily.temperature_2m_max,
      tempMin: apiCall.daily.temperature_2m_min,
      riskOfRain: apiCall.daily.precipitation_probability_max,
    },
  };

  console.log("tratedObs", tretatedCall);

  return tretatedCall;
}
