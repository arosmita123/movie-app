import React, { useEffect, useState } from 'react'
import Content from '../../components/Content/Content';
import CustomPagination from '../../components/Pagination/CustomPagination';

import './Trending.css'


function Trending() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const fetchData = () => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=55202b0de190bb5a5f4f504e103b7197&page=${page}`)
      .then((response) => {
        return response.json();
      }).then((data) => {

        let output = data.results
        console.log(data)
        setData(output)
      })
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page])

  return (
    <div>
      <h1 className='heading'>TRENDING</h1>
      <div className='displayData'>
      {data && data.map((blog) => (
        <Content key={blog.id} id={blog.id} title={blog.title || blog.name} date={blog.first_air_date || blog.release_date} poster={blog.poster_path} media_type={blog.media_type} vote_average={blog.vote_average} />
      ))}
    </div>
   <CustomPagination setPage={setPage} />
 {/* { console.log(setPage)} */}
    </div>
  )
}

export default Trending