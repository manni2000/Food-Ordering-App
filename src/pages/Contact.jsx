import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

const Contact = () => {
  return (
    <Helmet title="Contact">
      <div className="content">
        <CommonSection title="Contact" />
        <section>
          <Container>
            <Col lg="12">
              <p>
                You can contact us via hotline <span className="fw-bold fs-4">96XXXXXXXX</span> or{' '}
                <Link to="/checkout" className="fw-bold fs-4">
                  PAY HERE
                </Link>{' '}
                for more information.
              </p>
            </Col>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default Contact;
