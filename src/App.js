import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
