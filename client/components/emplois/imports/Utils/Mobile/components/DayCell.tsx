import * as WeatherIcon from "../../Shared/WeatherIcons";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";

export default function DayCell(props: any) {
    const Day = props.dataDay;
    const Temperature = props.dataTemperature;
    const Weather = props.dataWeather;

    // Switch function
    function SwitchIcon(Icon: string) {
        switch (Icon) {
            case "Sun":
                return <WeatherIcon.Sunny />;
            case "Fog":
                return <WeatherIcon.Fog />;
            case "Rain":
                return <WeatherIcon.Rainy />;
            case "Thunder":
                return <WeatherIcon.Thunder />;
            case "Cloudy":
                return <WeatherIcon.Cloudy />;
            case "Sun Cloudy":
                return <WeatherIcon.CloudySun />;
            case "Snow":
                return <WeatherIcon.Snowy />;
            default:
                return <WeatherIcon.Sunny />;
        }
    }

    // Get weather icon
    const FinalWeatherIcon = SwitchIcon(props.dataIcon);

    // Date from props dataDate - formatted to (01 Jan 2023);
    // Convert date to (01 Jan 2023)
    const date = new Date(String(props.dataDate));

    const FinalDate = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Capitalize final date
    const CapitalizedFinalDate =
        FinalDate.charAt(0).toUpperCase() + FinalDate.slice(1);

    return (
        <Tooltip title={Weather + " - " + CapitalizedFinalDate} arrow>
            <div {...props}>
                <span className="Day">{Day}</span>
                <span className="Temperature">
                    {Temperature}° C{/* - {Weather} */}
                </span>
                <div className="Icon">{FinalWeatherIcon}</div>

                <div className="Banner">
                    <div className="Clouds">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/img/cloud1.png"
                            alt=""
                            style={{ zIndex: 1 }}
                        />

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/img/cloud2.png"
                            alt=""
                            style={{ zIndex: 2 }}
                        />

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/img/cloud3.png"
                            alt=""
                            style={{
                                zIndex: 3,
                            }}
                        />

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/img/cloud4.png"
                            alt=""
                            style={{ zIndex: 4 }}
                        />

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/img/cloud5.png"
                            alt=""
                            style={{ zIndex: 5 }}
                        />
                    </div>
                </div>
            </div>
        </Tooltip>
    );
}
