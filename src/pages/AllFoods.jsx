import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

import { Container, Row, Col } from 'reactstrap';

import products from '../assets/fake-data/products';
import ProductCard from '../components/UI/product-card/ProductCard';
import ReactPaginate from 'react-paginate';

import '../styles/all-foods.css';
import '../styles/pagination.css';

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('');

  const [pageNumber, setPageNumber] = useState(0);

  const searchedProduct = products.filter((item) => {
    if (searchTerm.valueOf === '') {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log('not found');
    }
  });

  const sortedProduct = searchedProduct.sort((itemA, itemB) => {
    if (sortValue === 'ascending') {
      const titleA = itemA.title.toUpperCase();
      const titleB = itemB.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    }

    if (sortValue === 'descending') {
      const titleA = itemA.title.toUpperCase();
      const titleB = itemB.title.toUpperCase();

      if (titleA < titleB) {
        return 1;
      }
      if (titleA > titleB) {
        return -1;
      }
      return 0;
    }

    if (sortValue === 'low-price') {
      return (
        (itemA.price * (1 - Number(itemA.salePercent / 100))).toFixed(1) -
        (itemB.price * (1 - Number(itemB.salePercent / 100))).toFixed(1)
      );
    }

    if (sortValue === 'high-price') {
      return (
        (itemB.price * (1 - Number(itemB.salePercent / 100))).toFixed(1) -
        (itemA.price * (1 - Number(itemA.salePercent / 100))).toFixed(1)
      );
    }
  });

  const handleSortClick = (e) => {
    setSortValue(e.target.value);
  };

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = sortedProduct.slice(visitedPage, visitedPage + productPerPage);

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-Foods">
      <div className="content">
        <CommonSection title="All Foods" />
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6" xs="12">
                <div className="search__widget d-flex align-items-center">
                  <input
                    type="text"
                    placeholder="I'm looking for...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                <div className="sorting__widget text-end">
                  <select className="w-50" onClick={(e) => handleSortClick(e)}>
                    <option>Default</option>
                    <option value="ascending">Alphabetically, A-Z</option>
                    <option value="descending">Alphabetically, Z-A</option>
                    <option value="high-price">High Price</option>
                    <option value="low-price">Low Price</option>
                  </select>
                </div>
              </Col>

              {displayPage.length > 0 ? (
                displayPage.map((item) => (
                  <Col lg="3" md="4" sm="6" xs="12" key={item.id} className="mb-4">
                    <ProductCard item={item} />
                  </Col>
                ))
              ) : (
                <span className="text-center fw-bold fs-4">Not found...!</span>
              )}

              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName=" paginationBttns "
                />
              </div>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default AllFoods;
