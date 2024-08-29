import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import NotifyMessage from '../components/UI/notify-message/NotifyMessage';
import '../styles/login.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [showNotify, isShowNotify] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email!')
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter your email a valid!'),
    password: yup
      .string()
      .required('Please enter your password!')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Please enter your password at least eight characters includes one letter, one number and one special character!'
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate('/home');
      } catch (error) {
        resetForm();
        isShowNotify(true);
      }
    },
  });

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      isShowNotify(true);
    }
  };

  useEffect(() => {
    setTimeout(() => isShowNotify(false), 2000);

    return () => {
      clearTimeout();
    };
  }, [showNotify]);

  return (
    <>
      {showNotify && <NotifyMessage content={'signed in'} status={'failure'} />}

      <Helmet title="Login">
        <div className="content">
          <CommonSection title="Login" />

          <section>
            <Container>
              <Row>
                <Col lg="6" md="6" sm="12" className="m-auto text-center">
                  <form className="form mb-5" onSubmit={formik.handleSubmit}>
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
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.password && <p>{formik.errors.password}</p>}
                    </div>
                    <button type="submit" className="addToCart__btn">
                      Login
                    </button>
                  </form>
                  <div className="login">
                    <button className="login__with-google" onClick={signInWithGoogle}>
                      Sign in with Google
                    </button>
                  </div>
                  <Link to="/register">Don't have an account? Create an account</Link>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </Helmet>
    </>
  );
};

export default Login;
