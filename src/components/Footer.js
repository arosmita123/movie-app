import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';


export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const history = useHistory()
  // const handleRedirect=()=> {
  //   history.push('/movies')
  // }
  const handleClick=()=> {
   
    history.push('/movies')
   
   
  }
  useEffect(() => {
    // if (value === 0) {
    //   history.push('/')
    // } else if (value === 1) {
    //   history.push('/movies')
    // }
    // else if (value === 2) {
    //   history.push('/tvseries')
    // }
    // else if (value === 3) {
    //   history.push('/search')
    // }
    // handleClick()
    // handleRedirect()
   
  }, [ history])

  return (

    <Box sx={{ width: "100%", position: 'fixed', bottom: 0, backgroundColor: 'black' }} className="bottomBar">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />}  />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} onClick={handleClick}/>
        <BottomNavigationAction label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction label="Search Here" icon={<SearchIcon />}/>
      </BottomNavigation>
    </Box>
  );
}