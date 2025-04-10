// View model used by the weather detail presentation component
export interface CityWeatherDetail {
    cityName: string,
    icon: string,
    title: string,
    currentTemp: string
    max_temp: string,
    min_temp: string,
    description: string,
    windSpeed: string
}