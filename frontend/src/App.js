import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context/index';
import { useState } from 'react';
import Header from './components/Header/Header';
import './styles/App.css';
import Footer from './components/Footer/Footer';
function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className='appWrapper'>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
        }}
      >
        <BrowserRouter>
          <Header />
          <div className='contentWrapper'>
            <AppRouter />
          </div>
          <div className='footer'>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
