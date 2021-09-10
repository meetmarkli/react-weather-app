import React, { Component } from "react";
import PubSub from "pubsub-js";
import { Button } from "@material-ui/core";
import './index.css'

export default class Search extends Component {
  search = async () => {
    const {
      keyWordElement: { value: keyWord },
    } = this;
    PubSub.publish("markli", { isFirst: false, isLoading: true });
    try {
      const API_key = "c8e76c9b4fa36112b0d8aff693cee1fc";
      const api = `http://api.openweathermap.org/data/2.5/forecast?q=${keyWord}&units=metric&appid=${API_key}`;
      const response = await fetch(api);
      const data = await response.json();
      console.log(data);
      PubSub.publish("markli", {
        isLoading: false,
        fetchData: data.list,
        cityName: data.city.name,
      });
    } catch (error) {
      console.log("ERROR", error);
      PubSub.publish("markli", { isLoading: false, err: error.message });
    }
  };
  render() {
    return (
      <section className="search">
       
        <div className="search-body">
          <input
            ref={(c) => (this.keyWordElement = c)}
            type="text"
            placeholder="Please Input City Name"
          />
          &nbsp;
          <Button variant="contained" color="primary" onClick={this.search}>
            Search
          </Button>
        </div>
      </section>
    );
  }
}
