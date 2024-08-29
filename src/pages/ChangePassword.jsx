import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const Login = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Please enter your password!')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Please enter your password at least eight characters includes one letter, one number and one special character!'
      ),
    newPassword: yup
      .string()
      .required('Please enter your password!')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Please enter your password at least eight characters includes one letter, one number and one special character!'
      ),

    confirmedNewPassword: yup
      .string()
      .required('Please retype your new password!')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match!'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmedNewPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await updatePassword(auth.currentUser, values.newPassword);
        navigate('/profile');
      } catch (error) {
        resetForm();
      }
    },
  });

  return (
    <Helmet title="Change Password">
      <div className="content">
        <CommonSection title="Change Password" />

        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={formik.handleSubmit}>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your old password"
                      id="oldPassword"
                      name="oldPassword"
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.oldPassword && <p>{formik.errors.oldPassword}</p>}
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your new Password"
                      id="newPassword"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.newPassword && <p>{formik.errors.newPassword}</p>}
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Retype new password"
                      id="confirmedNewPassword"
                      name="confirmedNewPassword"
                      value={formik.values.confirmedNewPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedNewPassword && (
                      <p>{formik.errors.confirmedNewPassword}</p>
                    )}
                  </div>
                  <button type="submit" className="addToCart__btn">
                    Update
                  </button>
                </form>
                <Link to="/profile">Go your profile ?</Link>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default Login;
