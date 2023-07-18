const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done) {
  //src("src/scss/app.scss") Localise just the sass file
  src("src/scss/**/*.scss") // Localise all sass files
    .pipe(plumber()) // Prevent to stop the workflow when founds errors
    .pipe(sass()) // Compile the sass file
    .pipe(dest("build/css")); // Save the result

  done(); // The call of this function indicates that we finish the task.
}

function dev(done) {
  // We are only watching for changes in app.scss
  watch("src/scss/**/*.scss", css);
  done();
}

exports.css = css;
exports.dev = dev;
