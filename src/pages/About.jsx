import React from "react";
import { styled } from "styled-components";
import PageHero from "../components/PageHero";
import aboutImage from "../assets/hero-bcg.jpeg";

const About = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImage} alt="about" />
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            sequi cupiditate deserunt expedita saepe. Cum vel commodi fuga sequi
            expedita exercitationem ad cumque placeat tempora nam quidem omnis
            minima at facere, excepturi eum autem doloribus accusamus recusandae
            consectetur vitae! Consequuntur quaerat voluptate magni, distinctio
            earum facilis natus repellendus velit error?
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default About;
