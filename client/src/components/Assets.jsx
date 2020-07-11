
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import {Image} from './styledComponents.jsx';



const Assets = (props) => {

  // props.assets = props.assets.split(',');

  return (

    <Carousel showIndicators={true} showArrows={true} showThumbs={false} showStatus={false}>
      {props.assets.split(',').map(asset => {
        return (
          <div>
            <Image src={asset}/>
          </div>
        );
      })}
    </Carousel>




  );


};


export default Assets;