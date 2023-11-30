import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
