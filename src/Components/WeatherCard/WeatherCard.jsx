import './WeatherCard.css';

import React, { Fragment } from 'react';

export const WeatherCard = ({title,detail}) => {
  return (
    <Fragment>
        <div className="weather-card">
        <h1>{title}</h1>
        <p>{detail}</p>
        </div>
    </Fragment>
  )
}
