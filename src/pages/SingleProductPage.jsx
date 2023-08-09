import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import PageHero from "../components/PageHero";
import { styled } from "styled-components";
import { useProductsContext } from "../context/products_context";
import { singleproducturl } from "../utils/constants";
import ProductImages from "../components/ProductImages";
import AddToCart from "../components/AddToCart";
import Stars from "../components/Stars";
import { formatPrice } from "../utils/helpers";

const SingleProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  //console.log(id);
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    //beacuse url is defined like that
    fetchSingleProduct(`${singleproducturl}${id}`);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  //console.log(product);
  const {
    name,
    price,
    id: sku,
    description,
    stock,
    stars,
    reviews,
    company,
    images,
  } = product;
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center">
        <Link to="/products" className="btn">
          back to products
        </Link>

        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available :</span>
              {stock > 0 ? "In stock" : "Out of stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
