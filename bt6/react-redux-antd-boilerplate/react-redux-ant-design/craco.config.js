const CracoLessPlugin = require("craco-less");
const modifyVars = require("./src/styles/variables");
const CracoAlias = require("craco-alias");

module.exports = {
  eslint: {
    enable: false,
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { ...modifyVars },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        /* tsConfigPath should point to the file where "baseUrl" and "paths"
        are specified*/
        tsConfigPath: "./tsconfig.path.json",
      },
    },
  ],
};
