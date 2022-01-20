const metalsmith = require('metalsmith');
const assets = require('metalsmith-assets');
const markdown = require('metalsmith-markdown');
const nunjucks = require("nunjucks");
const inplace = require('metalsmith-in-place');
const static = require('metalsmith-static');
const sass = require('metalsmith-sass');
const browserSync = require('metalsmith-browser-sync');

nunjucks.configure('src', { watch: false, noCache: true });

// Dev Note: To debug metalsmith, remove browsersync
const args = process.argv;
let path = args[2];
if (!(path && path !== "")) {
  path = "downloads/ShowcaseApp";
}

metalsmith(__dirname)
  .source("./src")
  .destination("./dist/" + path)
  .clean(true)
  .metadata({
    "title": "Showcase App",
    "description": "Showcase App for Crestron Components",
    "siteurl": "/" + path + "/"
  })
  .use(assets({
    "source": "./node_modules/@crestron/ch5-crcomlib/build_bundles/umd/",
    "destination": "./cr-com-lib"
  }))
  .use(assets({
    "source": "./node_modules/@crestron/ch5-theme/output/",
    "destination": "./crestron-components-assets"
  }))
  .use(markdown())
  .use(inplace({}))
  .use(static({
    "src": "./static",
    "dest": "."
  }))
  .use(sass({
    "outputDir": "css/",
    "sourceMap": true,
    "sourceMapContents": true
  }))
  .use(browserSync({
    server: {
      baseDir: "dist/"
    },
    startPath: path + "/",
    port: 8080,
    files: ["src/**/*.njk", "partials/**/*.njk", "layouts/**/*.njk", "emulator-scenarios/**/*.json"]
  }))
  .build(function (err, files) {
    if (err) { throw err; }
  });
