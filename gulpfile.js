const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// Images
const cache = require("gulp-cache");
const imageMin = require("gulp-imagemin");
const webp = require("gulp-webp");

function css(done) {
  //src("src/scss/app.scss") Localise just the sass file
  src("src/scss/**/*.scss") // Localise all sass files
    .pipe(plumber()) // Prevent to stop the workflow when founds errors
    .pipe(sass()) // Compile the sass file
    .pipe(dest("build/css")); // Save the result

  done(); // The call of this function indicates that we finish the task.
}

function minifyImages(done) {
  const options = {
    optimizationLevel: 3,
  };

  src("assets/img/**/*.{png,jpg}")
    .pipe(cache(imageMin(options)))
    .pipe(dest("build/img"));

  done();
}

function convertWebp(done) {
  const options = {
    quality: 50,
  };
  src("assets/img/**/*.{png,jpg}").pipe(webp(options)).pipe(dest("build/img"));
  done();
}

function dev(done) {
  // We are only watching for changes in app.scss
  watch("src/scss/**/*.scss", css);
  done();
}

exports.css = css;
exports.minifyImages = minifyImages;
exports.convertWebp = convertWebp;
exports.dev = parallel(minifyImages, convertWebp, dev);
