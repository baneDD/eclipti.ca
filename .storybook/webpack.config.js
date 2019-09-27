module.exports = ({ config, mode }) => {
  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main']

  // add typescript support
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
      plugins: [
        require.resolve('@babel/plugin-proposal-class-properties'),
        // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
        require.resolve('babel-plugin-remove-graphql-queries'),
      ],
    },
  })

  // add typescript extensions
  config.resolve.extensions.push('.ts', '.tsx')

  // find existing file load rule
  const fileRule = config.module.rules.find((rule) => {
    if (!rule.test) {
      return
    }
    if (rule.test.toString().indexOf('svg|') < 0) {
      return
    }
    return true
  })

  // remove svg loading from file loading rule
  fileRule.test = new RegExp(
    fileRule.test
      .toString()
      .replace('svg|', '')
      .slice(1, -1)
  )

  // add custom svg file processing
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              { prefixIds: false },
              {
                cleanupIDs: {
                  remove: true,
                  force: true,
                },
              },
              { inlineStyles: false },
              { removeStyleElement: true },
            ],
          },
        },
      },
      {
        loader: 'url-loader',
        options: fileRule.options || fileRule.query,
      },
    ],
  })

  return config
}
