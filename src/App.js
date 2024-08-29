import React from 'react';

import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Routes from '../src/routes/Routers';

import Carts from '../src/components/UI/cart/Carts';
import { useSelector } from 'react-redux';

function App() {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  return (
    <div>
      <Header />

      {showCart && <Carts />}

      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
