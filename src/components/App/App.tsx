import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import Home from '@pages/Home/Home';
import Favorites from '@pages/Favorites/Favorites';
import { ROUTES } from '@src/constants';
import { observer } from 'mobx-react-lite';
import Nav from '@components/Nav/Nav';

const App = observer(() => (
  <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  </div>
));

export default App;
