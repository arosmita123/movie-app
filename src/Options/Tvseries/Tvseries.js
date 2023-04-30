import React, {useEffect, useState} from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genre from '../../components/Genre'
import useGenIds from '../../useGenIds'
import Content from '../../components/Content/Content'



function Tvseries() {
  
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [clickedGenres, setClickedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL=useGenIds(clickedGenres)
  
    const fetchMovie = () => {
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=55202b0de190bb5a5f4f504e103b7197&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        .then((response) => {
          return response.json();
        }).then((data) => {
  
          let res = data.results
          console.log(data)
          setData(res)
          setNumOfPages(data.total_pages)
  
        })
    }
    useEffect(() => {
      fetchMovie();
      // eslint-disable-next-line
    }, [page, genreforURL])
  
  return (
    <>
    <h1 className='heading'>TV SERIES</h1>
   
    <Genre type="tv" clickedGenres={clickedGenres} setClickedGenres={setClickedGenres} genres={genres} setGenres={setGenres} setPage={setPage} />
    <div className='displayData'>
      {data && data.map((blog) => (
        <Content key={blog.id} id={blog.id} title={blog.title || blog.name} date={blog.first_air_date || blog.release_date} poster={blog.poster_path} media_type="tv" vote_average={blog.vote_average} />
      ))}
      
    </div>
    {numOfPages > 1 &&
      (<CustomPagination setPage={setPage} numOfPages={numOfPages} />
    )}
    </>
  )
}

export default Tvseries