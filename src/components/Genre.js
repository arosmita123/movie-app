import React, { useEffect } from 'react'
import { Chip } from '@mui/material'

const Genre = ({
    clickedGenres, setClickedGenres, genres, setGenres, type, setPage
}) => {

    const handleAdd = (genre) => {
        setClickedGenres([...clickedGenres, genre])
        setGenres(genres.filter((n) => n.id !== genre.id))
        setPage(1);
    }
    const handleDelete = (genre) => {
        setGenres([...genres, genre])
        setClickedGenres(clickedGenres.filter((n) => n.id !== genre.id))
        setPage(1);
    }
    
    const fetchGenreType = () => {
        fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=55202b0de190bb5a5f4f504e103b7197&language=en-US`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                //   console.log(data)
                setGenres(data.genres)
            })
    }

    useEffect(() => {
        fetchGenreType()
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ padding: "10px 0" }}>
            { clickedGenres && clickedGenres.map((genre) => (<Chip label={genre.name}
                color='secondary'
                style={{ margin: 3, fontSize: "18px" }}
                key={genre.id}
                clickable
                onDelete={()=>handleDelete(genre)}
            />))}
            {genres && genres.map((genre) => (<Chip label={genre.name}
                color='primary'
                style={{ margin: 3, fontSize: "18px" }}
                key={genre.id}
                clickable
               onClick ={() => handleAdd(genre)}
            />))}
            {/* {console.log(genres.name)} */}
        </div>
    )
}

export default Genre