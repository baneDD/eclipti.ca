import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import "../components/all.sass";
import logo from "../../static/img/EclipticaLogo.svg";

const ComingSoon = ({ image, title, heading, subheading, description }) => {
  return (
    <div style={{ height: "100%" }}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />

        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
      </Helmet>
      <div className="coming-soon">
        <div className="coming-soon-left">
          <img className={"logo-img"} src={logo} alt={"Ecliptica Incorporated"} />
          <h1>{heading}</h1>
          <h3>{subheading}</h3>
        </div>
        <div
          className="coming-soon-right"
          style={{
            background: `url(${image.childImageSharp ? image.childImageSharp.fluid.src : image}) no-repeat top left`,
            backgroundSize: "cover"
          }}
        ></div>
      </div>
    </div>
  );
};

ComingSoon.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return <ComingSoon image={frontmatter.image} title={frontmatter.title} heading={frontmatter.heading} subheading={frontmatter.subheading} />;
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    markdownRemark(frontmatter: { templateKey: { eq: "coming-soon" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
      }
    }
  }
`;
