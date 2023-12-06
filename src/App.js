import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './pages/Login';
import Main from './pages/Main';
import Admin from './pages/Admin';
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies();
  const roles = cookies.roles;
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
             path='/main'
             element={
               roles === 'ADMIN' ? <Admin /> :
               roles === 'USER' ? <Main /> :
               <Login />}
          />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
