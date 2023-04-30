
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import SimpleBottomNavigation from './components/Footer';

import Header from './components/Header/Header';
import Movies from './Options/Movies/Movies';
import Trending from './Options/Trending/Trending';
import Tvseries from './Options/Tvseries/Tvseries';
import Search from './Options/Search/Search';
function App() {
  return (
    <BrowserRouter>
     <Header />
     <div className="app">
      <Switch>
        <Route exact path='/'> 
         <Trending />
        </Route>
        <Route path='/movies'> 
         <Movies />
        </Route>
        <Route path='/tvseries'> 
         <Tvseries />
        </Route>
        <Route path='/search'> 
         <Search />
        </Route>
      </Switch>
     </div>
     <SimpleBottomNavigation />
    </BrowserRouter>
   
  );
}

export default App;
