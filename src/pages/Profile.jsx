import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendEmailVerification, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

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
  });

  const formik = useFormik({
    initialValues: {
      fullName: user?.displayName ? user.displayName : '',
      email: user?.email ? user.email : '',
      emailVerified: user?.emailVerified ? user.emailVerified : false,
      imageUrl: user?.photoURL
        ? user.photoURL
        : 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        if (user.fullName !== values.fullName || user.imageUrl !== values.imageUrl) {
          await updateProfile(user, { displayName: values.fullName, photoURL: values.imageUrl });
        }
        if (user.email !== values.email) {
          await updateEmail(user, values.email);
        }
        if (user.emailVerified !== values.emailVerified) {
          await sendEmailVerification(user);
        }
        navigate('/home');
      } catch (error) {
        resetForm();
      }
    },
  });

  return (
    <Helmet title="Profile">
      <div className="content">
        <CommonSection title="Your Profile" />

        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={formik.handleSubmit}>
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
                  <div className="form__group d-flex align-items-center">
                    <span
                      style={{
                        color: '#212245',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        padding: '0 20px',
                      }}
                    >
                      <label>Email Verified: </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        placeholder="Email Verified"
                        id="emailVerified"
                        name="emailVerified"
                        value={formik.values.emailVerified}
                        onChange={formik.handleChange}
                      />
                    </span>
                    {formik.errors.emailVerified && <p>{formik.errors.emailVerified}</p>}
                  </div>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Image Url"
                      id="imageUrl"
                      name="imageUrl"
                      value={formik.values.imageUrl}
                      onChange={formik.handleChange}
                    />
                    <p
                      style={{
                        color: '#212245',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        paddingTop: '15px',
                      }}
                    >
                      Description Image
                    </p>
                    <input
                      type="image"
                      src={formik.values.imageUrl}
                      alt="avatar"
                      height="500px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="form__group">
                    <p className="text-start fs-5">
                      <Link to="/change-password">Change to password</Link>
                    </p>
                  </div>

                  <button type="submit" className="addToCart__btn">
                    Update
                  </button>
                </form>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default Profile;
