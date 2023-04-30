import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@material-ui/core'
import { Button, Tab, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/Content/Content';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
  const [type, setType] = useState(0)
  const [page, setPage] = useState(1)
  const [searchName, setSearchName] = useState("")
  const [data, setData] = useState()
  const [numofPages, setNumOfPages] = useState()



  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {main: '#757ce8' }
    }
  })

  const fetchMovieSearch = () => {
    fetch(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=55202b0de190bb5a5f4f504e103b7197&language=en-US&query=${searchName}&page=${page}&include_adult=false`)
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
    window.scroll(0, 0)
    fetchMovieSearch();
    // eslint-disable-next-line
  }, [type, page])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', margin: '15px 0' }}>
          <TextField
            style={{ flex: 2 }}
            className="searchBox"
            label='Search Here'
            variant='filled'
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant='contained' style={{ marginLeft: 10 }} onClick={fetchMovieSearch}><SearchIcon /></Button>
        </div>

        <Tabs value={type} indicatorColor='primary' textColor="secondary" onChange={(event, newValue) => {
          setType(newValue)
          setPage(1)
        }}>
          <Tab style={{ width: "50%" }} label="Search Movie" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className='displayData'>
        {data && data.map((blog) => (
          <Content key={blog.id} id={blog.id} title={blog.title || blog.name} date={blog.first_air_date || blog.release_date} poster={blog.poster_path} media_type={type ? "tv" : "movie"} vote_average={blog.vote_average} />
        ))}
        {searchName && !data && (type ? <h2>No Series Found</h2> : <h1>No Movies Found</h1>)}
      </div>
      {numofPages > 1 &&
        (<CustomPagination setPage={setPage} numofPages={numofPages} />
      )}
    </div>
  )
}

export default Search

