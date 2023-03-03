type Geolocation = {
    lat: number;
    lng: number;
};

type WeatherData = {
    temp: number;
    description: string;
    city: string;
};

export const enumLabels = {
    metric: "Celsius",
    imperial: "Fahrenheit",
    standard: "Standard",
} as const;

export type Unit = keyof typeof enumLabels;

const API_KEY: string = "dc16838b78f7aba9e2513d2df0f6994d";
  
export async function getTempByZipCode(
    zipCode: string,
    countryCode: string = "US",
    units: Unit = "standard"
  ) {
    const { lat, lng } = await getLatLngByZipCode(zipCode, countryCode);
    const weatherData = await getWeatherByLatLng(lat, lng, units);
  
    return weatherData;
}
  
async function getLatLngByZipCode(
    zipCode: string,
    countryCode: string = "US"
  ): Promise<Geolocation> {
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${API_KEY}`;
    const { lat, lon } = await fetch(geocodingUrl)
      .then((res) => res.json())
      .catch(console.log);
  
    return { lat, lng: lon };
}
  
async function getWeatherByLatLng(
    lat: number,
    lng: number,
    units: Unit
  ): Promise<WeatherData> {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=${units}`;
    const weatherData = await fetch(weatherUrl)
      .then((res) => res.json())
      .catch(console.log);
  
    return {
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
      city: weatherData.name,
    };
}
  