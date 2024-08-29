import React from 'react';
import '../../../styles/product-card.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../store/shopping-cart/cartSlice';
import { auth } from '../../../firebase/firebase-config';

const ProductCard = (props) => {
  const { id, title, image01, price, sale, salePercent } = props.item;
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = () => {
    if (user) {
      dispatch(
        addItem({
          id,
          title,
          image01,
          price,
        })
      );
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product__item">
      {sale && <div className="product__sale">Hot</div>}
      <div className="product__img">
        <Link to={`/foods/${id}`}>
          <img src={image01} alt="product-img" className="w-50" />
        </Link>
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
        <div className="d-flex align-items-center justify-content-between">
          {sale === true ? (
            <div className="d-flex align-items-center justify-content-center ">
              <span className="product__price">
                ${(price * (1 - Number(salePercent / 100))).toFixed(1)}
              </span>
              <span className="product__price-sale">-{salePercent}%</span>
            </div>
          ) : (
            <span className="product__price">${price}</span>
          )}
          <button className="addToCart__btn" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
