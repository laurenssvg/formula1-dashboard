import React from "react";
import styled from "styled-components";

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Welcome to <br />
          your F1 dashboard
        </h1>
        <p>
          Follow your favourite drivers, stay up to date with results during the
          season and inspect all the circuits. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Soluta sit maiores amet iste reiciendis,
          facere dolorem deleniti aliquam nemo exercitationem porro quibusdam
          eum. Nobis, repellendus incidunt soluta veritatis aliquam quasi
          suscipit nesciunt nemo doloribus fugiat a animi labore sapiente
          nostrum qui eligendi iste, voluptates libero ipsam accusantium?
          Consequuntur, rem quos!
        </p>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  margin-top: 30px;

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
  }
`;

export default Hero;
