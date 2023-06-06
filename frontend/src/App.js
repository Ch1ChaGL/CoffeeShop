import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context/index';
import { useState, useContext, useEffect } from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import Header from './components/Header/Header';
import './styles/App.css';
import { check } from './API/userAPI';
import Footer from './components/Footer/Footer';
import Spinner from './components/UI/Spinner/Spinner';
const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('При обновлении страницы' + user.isAuth);
    check()
      .then(data => {
        console.log('я попал сюда');
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(() => {
        user.setUser({});
        user.setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='appWrapper'>
      <BrowserRouter>
        <Header />
        <div className='contentWrapper'>
          <AppRouter />
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
});

export default App;
