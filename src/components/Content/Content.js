import { Badge } from '@mui/material'
import React from 'react'
import { img_300, unavailable } from '../config/config'
import ContentModal from '../ContentModal/ContentModal'
import './Content.css'

const Content = ({
    id, title, date, poster, media_type, vote_average
}) => {
    
  return (
    <ContentModal media_type={media_type} id={id} className='movie'>
        <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary': 'secondary'} />
        <img className='poster' src={poster ? `${img_300}${poster}` : unavailable} alt={title}/>
        <b className='title'>{title}</b>
        <span className='movieSeries'>{media_type === "tv" ? 'TV Series' : 'Movie'}
        <span className='movieSeries'>{date}</span>
        </span>
    </ContentModal>
  )
}

export default Content;