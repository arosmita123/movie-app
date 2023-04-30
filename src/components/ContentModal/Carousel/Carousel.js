
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([])

  const items = credits.map((c) => (
    <div className='carouselItem'>
      <img src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem_img"
      />
      <b className='carouselItem_txt'>{c?.name}</b>
    </div>
  ))

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  }
  const fetchCredits = () => {
    fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=55202b0de190bb5a5f4f504e103b7197&language=en-US`)
      .then((response) => {
        return response.json();
      }).then((data) => {

        setCredits(data.cast)

      })
  }


  useEffect(() => {

    fetchCredits();
    // eslint-disable-next-line
  }, [])
  return (
    <AliceCarousel mouseTracking disableButtonsControls disableDottControls responsive={responsive} infinite items={items} />
  );
}
export default Carousel;