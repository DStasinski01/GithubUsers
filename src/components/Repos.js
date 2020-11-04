import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  let languages = repos.reduce((total, next) => {
    const { language, stargazers_count } = next;
    if (!language) {
      return total;
    }

    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  let mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  let mostStars = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .slice(0, 5)
    .map((item) => {
      return {
        ...item,
        value: item.stars,
      };
    });

  let { stars, forks } = repos.reduce(
    (total, next) => {
      const { stargazers_count, name, forks } = next;
      total.stars.push({ label: name, value: stargazers_count });
      total.forks.push({ label: name, value: forks });
      return total;
    },
    { stars: [], forks: [] }
  );

  stars = stars.sort((a, b) => b.value - a.value).slice(0, 5);
  forks = forks.sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStars} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
