import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

function convert(date: any) {
    const d = Date.parse(date)
    const date_obj = new Date(d)
    return `${date_obj.getFullYear()}-${date_obj.toLocaleString("default", { month: "2-digit" })}-${date_obj.toLocaleString("default", { day: "2-digit" })}`
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    var curr = new Date();
    var dayOfWeek = curr.getDay();
    var first = curr.getDate() - dayOfWeek;
    if (dayOfWeek > 0) {
        first += 1;
    }
    var last = first + 5;

    var weekStart = new Date(curr.getFullYear(), curr.getMonth(), first);
    var weekEnd = new Date(curr.getFullYear(), curr.getMonth(), last);

    // refetch the current week each time the current one has ended
    if (weekEnd < curr) {
        weekStart.setDate(weekStart.getDate() + 7);
        weekEnd.setDate(weekEnd.getDate() + 7);
    }

    // console table these vars

    const url = `https://api.open-meteo.com/v1/forecast?latitude=34.01&longitude=-6.83&daily=weathercode,apparent_temperature_max,apparent_temperature_min&timezone=auto&start_date=${convert(weekStart)}&end_date=${convert(weekEnd)}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
        return [];
    }

    const { data } = response;

    // filter the data
    let filteredData = data.daily.time.map((date: any, index: number) => {
        // Get day name
        const dayDate = date;
        const day = new Date(dayDate);
        const dayName = day.toLocaleDateString("en-US", {
            weekday: "long"
        })


        let Weather = null;
        let Icon = null;
        let ShortWeather = null;

        // Find Icon with WeatherCode
        switch (data.daily.weathercode[index]) {
            case 0:
                Weather = "Ciel clair";
                ShortWeather = "Clair";
                Icon = "Sun";
                break;
            // Cas 1, 2 ou 3
            case 1:
                Weather = "Principalement clair";
                ShortWeather = "Clair";
                Icon = "Sun Cloudy";
                break;
            case 2:
                Weather = "Partiellement nuageux";
                ShortWeather = "Nuageux";
                Icon = "Cloudy";
                break;
            case 3:
                Weather = "Couvert";
                ShortWeather = "Couvert";
                Icon = "CloudySun";
                break;
            case 45:
                Weather = "Brouillard";
                ShortWeather = "Brouillard";
                Icon = "Fog";
                break;
            case 48:
                Weather = "D??p??t de brouillard de Rime";
                ShortWeather = "Brouillard";
                Icon = "Fog";
                break;
            case 51:
                Weather = "L??g??re bruine";
                ShortWeather = "Bruine";
                Icon = "Fog";
                break;
            case 53:
                Weather = "Bruine mod??r??e";
                ShortWeather = "Bruine";
                Icon = "Fog";
                break;
            case 55:
                Weather = "Forte bruine";
                ShortWeather = "Bruine";
                Icon = "Fog";
                break;
            case 56:
                Weather = "L??g??re bruine vergla??ante";
                ShortWeather = "Bruine";
                Icon = "Fog";
                break;
            case 57:
                Weather = "Bruine vergla??ante mod??r??e";
                ShortWeather = "Bruine";
                Icon = "Fog";
                break;
            case 61:
                Weather = "L??g??re pluie";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 63:
                Weather = "Pluie mod??r??e";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 65:
                Weather = "Forte pluie";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 66:
                Weather = "L??g??re pluie vergla??ante";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 67:
                Weather = "Pluie vergla??ante mod??r??e";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 71:
                Weather = "L??g??re chute de neige";
                ShortWeather = "Neige";
                Icon = "Snow";
                break;
            case 73:
                Weather = "Chute de neige mod??r??e";
                ShortWeather = "Neige";
                Icon = "Snow";
                break;
            case 75:
                Weather = "Forte chute de neige";
                ShortWeather = "Neige";
                Icon = "Snow";
                break;
            case 80:
                Weather = "L??g??re pluie";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 81:
                Weather = "Pluie mod??r??e";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 82:
                Weather = "Forte pluie";
                ShortWeather = "Pluie";
                Icon = "Rain";
                break;
            case 85:
                Weather = "L??g??res averses de neige";
                ShortWeather = "Neige";
                Icon = "Snow";
                break;
            case 86:
                Weather = "Fortes averses de neige";
                ShortWeather = "Neige";
                Icon = "Heavy Snow Showers";
                Icon = "Snow";
                break;
            case 95:
                Weather = "Orage";
                ShortWeather = "Orage";
                Icon = "Thunder";
                break;
            // Plus de 95
            case 96:
                Weather = "L??ger orage";
                ShortWeather = "Orage";
                Icon = "Thunder";
                break;
            case 99:
                Weather = "Fort orage";
                ShortWeather = "Orage";
                Icon = "Thunder";
                break;
            default:
                Weather = "Ciel clair";
                ShortWeather = "Clair";
                Icon = "Sun";
                break;
        }

        // if not sunday
        if (dayName != "Sunday") {
            return {
                date: dayDate,
                day: dayName,
                temperature: {
                    max: Math.floor(parseFloat(data.daily.apparent_temperature_max[index])),
                    min: Math.floor(parseFloat(data.daily.apparent_temperature_min[index])),
                    avg: Math.floor((parseFloat(data.daily.apparent_temperature_max[index]) * 1.25 + parseFloat(data.daily.apparent_temperature_min[index])) / 2)
                },
                icon: Icon,
                weather: Weather,
                shortWeather: ShortWeather
            }
        }
    });

    // Remove null values
    filteredData = filteredData.filter((item: any) => {
        return item != null;
    });


    res.status(200).json(filteredData);
}
