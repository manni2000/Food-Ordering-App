import React, { useRef, useState } from 'react';

import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import logo from '../../assets/images/res-logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggle } from '../../store/shopping-cart/cartUiSlice';

import '../../styles/header.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { resetCart } from '../../store/shopping-cart/cartSlice';

const nav__links = [
  {
    display: 'Home',
    path: '/home',
  },
  {
    display: 'Foods',
    path: '/foods',
  },
  {
    display: 'Cart',
    path: '/cart',
  },
  {
    display: 'Contact',
    path: '/contact',
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signedIn, isSignedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const toggleCart = () => {
    if (signedIn) {
      dispatch(toggle());
    } else {
      navigate('/login');
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isSignedIn(true);
      setImageUrl(
        user.photoURL
          ? user.photoURL
          : 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
      );
    } else {
      isSignedIn(false);
    }
  });

  const logout = async () => {
    await signOut(auth);
    dispatch(resetCart());
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="logo" />
              <h5>Food Fusion</h5>
            </Link>
          </div>

          <div className="navigation" ref={menuRef}>
            <ul className="menu">
              <li>
                <span className="show__close" onClick={toggleMenu}>
                  <i className="ri-close-line"></i>
                </span>
              </li>
              {nav__links.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) => (navClass.isActive ? 'active__menu' : '')}
                    onClick={toggleMenu}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            <div className="user">
              {signedIn ? (
                <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                  <DropdownToggle caret tag="div">
                    <img src={imageUrl} alt="avatar" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to="/profile">Your profile</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/cart">Your cart</Link>
                    </DropdownItem>
                    <DropdownItem onClick={logout}>Sign out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                  <div className="user__sign-in">
                    <Link to="/login">Sign In</Link>
                  </div>
                  <div className="user__sign-up">
                    <Link to="/register">Sign Up</Link>
                  </div>
                </>
              )}
            </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
