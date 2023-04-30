import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./ContentModal.css";
import Carousel from './Carousel/Carousel';
import { Paper } from '@mui/material';
import "./ContentModal.css"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'grey',
    border: '5px solid #000',
    boxShadow: 28,

    p: 4,
};

export default function ContentModal({ children, media_type, id }) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState()
    const [video, setVideo] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchSearch = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=55202b0de190bb5a5f4f504e103b7197&language=en-US`)
            .then((response) => {
                return response.json();
            }).then((data) => {

                // let res = data.results
                // console.log(data)
                setData(data)
                // setNumOfPages(data.total_pages)

            })
    }
    const fetchVideo = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=55202b0de190bb5a5f4f504e103b7197&language=en-US`)
            .then((response) => {
                return response.json();
            }).then((data) => {

                console.log(data)
                setVideo(data.results[0]?.key)

            })
    }
    useEffect(() => {
        fetchSearch();
        fetchVideo();
        // eslint-disable-next-line
    }, [])


    return (
        <>

            <div className='movie' onClick={handleOpen}>{children}</div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {data && (<div className={Paper}>
                            <div className='ContentModal'>
                                {/* <img alt={data.name || data.title} className="data_potrait" src={data.poster_path ? `${img_500}/${data.poster_path}` : unavailable} /> */}
                                <img src={data.backdrop_path ? `${img_500}/${data.backdrop_path}` : unavailableLandscape} alt={data.name || data.title} className="dataModal_landscape" />

                                <div className='dataModal-about'>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        <span className='dataModal_title'>{data.title || data.name} (
                                            {(data.first_air_date || data.release_date || "-----").substring(0, 4)}
                                            )</span>
                                    </Typography>
                                </div>

                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    <div className='tagline'>{data.tagline && (<i>{data.tagline}</i>)}</div>
                                    <span className='dataModal-description'>{data.overview}</span>

                                    <div><Carousel media_type={media_type} id={id} /></div>

                                    <Button variant='contained'
                                        startIcon={<YouTubeIcon />}
                                        color="error"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}>
                                        Watch the Trailer
                                    </Button>
                                </Typography>
                            </div>
                        </div>)}
                    </Box>

                </Fade>
            </Modal>

        </>
    );
}