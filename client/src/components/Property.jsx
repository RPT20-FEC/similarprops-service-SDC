import React, { useState } from 'react';
import ReactDom from 'react-dom';

import Assets from './Assets.jsx';


import Favorite from './Favorite.jsx';
import {Details, SleepArrangement, Star, Reviews, HeadlinePricing, ImageContainer} from './styledComponents.jsx';

const Property = (props) => {
  const [FavIsShown, setIsShown] = useState(false);

  return (
    <div id='property-details'>
      <ImageContainer onMouseEnter={() =>  setIsShown(true)} onMouseLeave={() =>  setIsShown(false)}>
        <Assets assets ={props.property.assets}/>
        {FavIsShown && <Favorite></Favorite>}
      </ImageContainer>
      <Details>
        <SleepArrangement>
          {props.property.typeOfRoom + ' · '}
          {props.property.totalBeds} {props.property.totalBeds === 1 ? 'bed' : 'beds'}
        </SleepArrangement>
        <Star> {<img src='https://host-service.s3-us-west-1.amazonaws.com/star-xsm.png'/>} {props.property.stars} <Reviews>{'(' + props.property.reviews + ')'}</Reviews></Star>
        <HeadlinePricing>
          <div>{props.property.headline}</div>
          <div> <b> ${props.property.pricing}</b> / night</div>
        </HeadlinePricing>
      </Details>

    </div>
  );
}



export default Property;