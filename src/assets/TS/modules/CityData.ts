export interface CityData {
  cityName: string
  currentWeather: {
    temperature: number;
    weathercode: number;
  };
  daily: {
    time: Date;
    weathercode: number;
    tempMax: number;
    tempMin: number;
    riskOfRain: number;
  };
}
