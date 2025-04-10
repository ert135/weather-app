export interface CityWeatherItem {
    id: number,
    name: string,
    temperature: string,
    windSpeed: string,
    lat: number, 
    lon: number,
    minTemp: string,
    maxTemp: string,
    currentWeather: {
        icon: string,
        title: string,
        description: string
    }
}