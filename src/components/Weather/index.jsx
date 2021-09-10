import React, { Component } from "react";
import PubSub from "pubsub-js";
import './index.css'
export default class Weather extends Component {
    state = {
        currentWeather: [],
        firstWeather: [],
        secondWeather: [],
        thirdWeather: [],
        cityName: [],
        isFirst: true, //是否为第一次打开页面
        isLoading: true, //标识是否处于加载中
        err: "", //存储请求相关的错误信息
    };

    componentDidMount() {
        this.token = PubSub.subscribe("markli", (_, stateObj) => {
            this.setState(stateObj);
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }
    render() {
        const { fetchData, cityName, isFirst, isLoading, err } = this.state;
        // const temp = fetchData[0].main.temp
        console.log(fetchData);

        return (
            <div className="row">
                {isFirst ? (
                    <h2>Welcome Please Enter City Name</h2>
                ) : isLoading ? (
                    <h2>Loading......</h2>
                ) : err ? (
                    <h2 style={{ color: "red" }}>{err}</h2>
                ) : (
                    <div className="card">
                        <div className="left">
                            <div>{cityName} <span> <img
                                className="img-fluid"
                                alt="weather-icon"
                                src={`http://openweathermap.org/img/w/${fetchData[0].weather[0].icon}.png`}
                            /></span></div>
                            <div>{fetchData[0].weather[0].description}</div>
                            <div>temperature<br />{fetchData[0].main.temp}&#176;C</div> 
                            <div>feelslike<br />{fetchData[0].main.feels_like}&#176;C</div>
                            <div>humidity<br />{fetchData[0].main.humidity}%</div>
                            <div>windspeed<br />{fetchData[0].wind.speed}m/s</div>
                        </div>
                        <div className="right">
                            <div className="tomorrow">
                            {new Date(fetchData[8].dt*1000).toLocaleDateString('en-GB')}&nbsp;{fetchData[8].weather[0].description}<br />
                                {fetchData[8].main.temp}&#176;C&nbsp;&nbsp;&nbsp;
                                <img
                                    className="img-fluid"
                                    alt="weather-icon"
                                    src={`http://openweathermap.org/img/w/${fetchData[8].weather[0].icon}.png`}
                                />
                               
                            </div>
                            <div className="third">
                            {new Date(fetchData[16].dt*1000).toLocaleDateString('en-GB')}&nbsp;{fetchData[16].weather[0].description}<br />
                                {fetchData[16].main.temp}&#176;C&nbsp;&nbsp;&nbsp;
                                <img
                                    className="img-fluid"
                                    alt="weather-icon"
                                    src={`http://openweathermap.org/img/w/${fetchData[16].weather[0].icon}.png`}
                                />
                            </div>
                            <div className="fourth">
                            {new Date(fetchData[24].dt*1000).toLocaleDateString('en-GB')}&nbsp;{fetchData[24].weather[0].description}<br />
                                {fetchData[24].main.temp}&#176;C&nbsp;&nbsp;&nbsp;
                                <img
                                    className="img-fluid"
                                    alt="weather-icon"
                                    src={`http://openweathermap.org/img/w/${fetchData[24].weather[0].icon}.png`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
