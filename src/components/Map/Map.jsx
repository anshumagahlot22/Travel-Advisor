import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import mapStyles from './mapStyles';
import useStyles from "./styles.js";

const Map = ({ setCoordinates, setBounds, coordinates, places,setChildClicked,weatherData }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI:true,zoomControl:true, styles: mapStyles}}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng,
          });
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
          });
        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {/* !isDesktop ? (
            <LocationOnOutlinedIcon color="primary" fontSize="large" />
            )  :( */}
            <Paper elevation={3} className={classes.paper}>
              <Typography
                className={classes.Typography}
                variant="subtitle2"
                gutterBottom
              >
                {place.name}
              </Typography>
              <img
                className={classes.pointer}
                src={
                  place.photo
                    ? place.photo.images.large.url
                    : "https://bgr.com/wp-content/uploads/2020/09/bgrpic-copy-19.jpg?quality=70&strip=all"
                }
                alt={place.name}
              />
              <Rating size="small" value={Number(place.rating)} readOnly/>
            </Paper>
            {/* ) */}
          </div>
        ))}
        {
          weatherData?.list?.map((data,i) => (
            <div key={i} lat={data.coord.lat}lng={data.coord.lng}>
              <img alt="weather" src={`../../../public/icons/${data.weather[0].icon}.png`}  className="weather-icon" />
            </div>
          ))
        }
      </GoogleMapReact>
    </div>
  );
};

export default Map;
