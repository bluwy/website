module.exports = {
  siteMetadata: {
    title: `Bjorn Lu`,
    description: `Bjorn Lu is a tech enthusiast working with various projects of interest`,
    author: `Bjorn Lu`,
    siteUrl: `https://bjornlu.com`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          "@": `src`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- endexcerpt -->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          `gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 60,
              icon: `<svg width="24" height="24" fill="currentColor"><path d="M14.828 12l1.414 1.414 2.828-2.828a4 4 0 0 0-5.657-5.657l-2.828 2.828L12 9.172l2.828-2.828a2 2 0 0 1 2.828 2.828L14.828 12zM12 14.83l1.414 1.414-2.828 2.828a4 4 0 0 1-5.657-5.657l2.828-2.828L9.172 12l-2.828 2.83a2 2 0 0 0 2.828 2.828L12 14.83zm2.83-4.244a1 1 0 1 0-1.414-1.414l-4.243 4.243a1 1 0 0 0 1.414 1.414l4.243-4.243z"/></svg>`,
              isIconAfterHeader: true,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-137893328-2`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bjorn Lu`,
        short_name: `Bjorn Lu`,
        start_url: `/`,
        background_color: `#f7fafc`,
        theme_color: `#ffbbdd`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`,
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          ...(process.env.NODE_ENV === `production`
            ? [require("autoprefixer")]
            : []),
        ],
      },
    },
  ],
}
