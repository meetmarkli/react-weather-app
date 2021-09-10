import React, { Component } from 'react'
import Weather from './components/Weather'
import Search from './components/Search'
import './App.css'
// 不要index.js
export default class App extends Component {
  render() {
    return (
      <div className="container">
				<Search/>
				<Weather/>
			</div>
    )
  }
}
