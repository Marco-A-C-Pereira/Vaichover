export { querryGen, getMainCities};

type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

const mainCities: City[] = [
	{name:'Curitiba - PR ', location: {latitude: -25.43, longitude: -49.27}},
	{name:'São Paulo - SP', location: {latitude: -23.55 , longitude: -46.64}},
	{name:'Rio de Janeiro - RJ', location: {latitude: -22.91 , longitude: -43.18 }}
]

async function getMainCities():Promise<void> {
	const cityData: any[] = []

	for (const city of mainCities ) {
			console.log(city.name);

			cityData.push(await querryGen(city.location.latitude, city.location.longitude))
	}

	// TODO - Utilizar a Lib Loadash para comparar a consulta como cache no futuro
	if (localStorage.getItem("Weather") === null) 
		cache(cityData);

	console.log(cityData)
}

async function querryGen(latitude?:number, longitude?:number): Promise<object> {
  let url: string =
    `https://api.open-meteo.com/v1/forecast?
			latitude=${latitude}
			&longitude=${longitude}
			&hourly=temperature_2m&current_weather=true&forecast_days=1&timezone=auto`;

	let response = await fetch(url);
	let cityData = await response.json();

	return cityData;
}

// function querryGen(): Promise<object> {
//   let url: string =
//     "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.64&hourly=temperature_2m&current_weather=true&forecast_days=1&timezone=auto";

//   return window
//     .fetch(url)
//     .then((response) => response.json())
//     .then((json) => {
//       if (localStorage.getItem("Weather") === null) 
// 				cache(json);

//       return json;
//     });
// }

function cache(obj: object[]): void {
  localStorage.setItem("Weather", JSON.stringify(obj));
}
