import React, { useState, useEffect } from 'react';

import products from '../assets/fake-data/products';
import { useNavigate, useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/shopping-cart/cartSlice';

import '../styles/product-details.css';

import ProductCard from '../components/UI/product-card/ProductCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { post } from '../store/review-comments/commentSlice';
import { auth } from '../firebase/firebase-config';

const FoodDetails = () => {
  const [tab, setTab] = useState('desc');
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const commentList = useSelector((state) => state.comment.commentList);

  const product = products.find((product) => product.id === id);
  const [previewImg, setPreviewImg] = useState(product.image01);
  const { title, price, category, desc, image01 } = product;

  const relatedProduct = products.filter((item) => category === item.category);

  const increaseItem = () => {
    if (user) {
      dispatch(
        addItem({
          id,
          title,
          price,
          image01,
        })
      );
    } else {
      navigate('/login');
    }
  };

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name!')
      .min(4, 'Please enter your full name at least four characters!')
      .max(30, 'Too long!'),
    email: yup
      .string()
      .required('Please enter your email!')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter your email a valid!'),
    reviewText: yup
      .string()
      .required('Please write your reviews!')
      .min(10, 'Please write your reviews at least ten characters!'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      reviewText: '',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatch(post(values));
      resetForm();
    },
  });

  useEffect(() => {
    setPreviewImg(product.image01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <div className="content">
        <CommonSection title={title} />

        <section>
          <Container>
            <Row>
              <Col lg="2" md="2">
                <div className="product__images ">
                  <div className="img__item mb-3" onClick={() => setPreviewImg(product.image01)}>
                    <img src={product.image01} alt="" className="w-50" />
                  </div>
                  <div className="img__item mb-3" onClick={() => setPreviewImg(product.image02)}>
                    <img src={product.image02} alt="" className="w-50" />
                  </div>

                  <div className="img__item" onClick={() => setPreviewImg(product.image03)}>
                    <img src={product.image03} alt="" className="w-50" />
                  </div>
                </div>
              </Col>

              <Col lg="4" md="4">
                <div className="product__main-img">
                  <img src={previewImg} alt="" className="w-100" />
                </div>
              </Col>

              <Col lg="6" md="6">
                <div className="single__product-content">
                  <h2 className="product__title mb-3">{title}</h2>
                  <p className="product__price">
                    Price: <span>${price}</span>
                  </p>
                  <p className="category mb-5">
                    Category: <span>{category}</span>
                  </p>
                  <button onClick={increaseItem} className="addToCart__btn">
                    Add to Cart
                  </button>
                </div>
              </Col>

              <Col lg="12">
                <div className="tabs d-flex align-items-center gap-5 py-3">
                  <h6
                    className={` ${tab === 'desc' ? 'tab__active' : ''}`}
                    onClick={() => setTab('desc')}
                  >
                    Description
                  </h6>
                  <h6
                    className={` ${tab === 'rev' ? 'tab__active' : ''}`}
                    onClick={() => setTab('rev')}
                  >
                    Review
                  </h6>
                </div>

                {tab === 'desc' ? (
                  <div className="tab__content">
                    <p>{desc}</p>
                  </div>
                ) : (
                  <div className="tab__form mb-3">
                    {commentList.length > 0 ? (
                      commentList.map((comment, idx) => (
                        <div className="review" key={idx}>
                          <p className="user__name mb-0">{comment.fullName}</p>
                          <p className="user__email">{comment.email}</p>
                          <p className="feedback__text">{comment.reviewText}</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-review">No anyone review.</p>
                    )}

                    <form className="form" onSubmit={formik.handleSubmit}>
                      <div className="form__group">
                        <input
                          type="text"
                          placeholder="Full Name"
                          id="fullName"
                          name="fullName"
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.fullName && <p>{formik.errors.fullName}</p>}
                      </div>
                      <div className="form__group">
                        <input
                          type="email"
                          placeholder="Email"
                          id="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && <p>{formik.errors.email}</p>}
                      </div>

                      <div className="form__group">
                        <textarea
                          rows={5}
                          type="text"
                          placeholder="Write your review"
                          id="reviewText"
                          name="reviewText"
                          value={formik.values.reviewText}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.reviewText && <p>{formik.errors.reviewText}</p>}
                      </div>

                      <button type="submit" className="addToCart__btn">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </Col>

              <Col lg="12" className="mb-5 mt-4">
                <h2 className="related__product-title">You might also like</h2>
              </Col>

              {relatedProduct.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                  <ProductCard item={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default FoodDetails;
