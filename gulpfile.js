/*
//////// PHASE 001 > INSTALLATION DES DEPENDANCES
Atteindre votre dossier de travail via le terminal et lancer cette ligne :
npm init
npm install --save-dev gulp gulp-rename gulp-sass gulp-htmlhint gulp-csslint gulp-imagemin imagemin-pngquant gulp-notify gulp-cssnano gulp-uglify gulp-htmlmin gulp-autoprefixer gulp-plumber browser-sync
*/

//////// PHASE 002 > CHARGEMENT DES DEPENDANCES
var gulp = require("gulp"); // Il faut Gulp... Bah oui hein !
var rename = require("gulp-rename"); // Renommage des fichiers
var sass = require("gulp-sass"); // Conversion des SCSS en CSS
var autoprefixer = require("gulp-autoprefixer"); // Ajout des prefixes des vendeurs pour le css
var cssnano = require("gulp-cssnano"); // Minification des CSS
var uglify = require("gulp-uglify"); // Minification des JS
var plumber = require("gulp-plumber"); // Verification des erreurs dans le terminal
var browserSync = require("browser-sync"); // Syncronisation de l'apercu

//////// PHASE 003 > PARAMETRAGE DES DEPENDANCES
var autoprefixerOpts = {
  browsers: ["last 3 versions"]
};

//////// PHASE 004 > DESCRIPTION DES TÂCHES A EFFECTUER

//Tâche pour les fichiers scss
gulp.task("css", function() {
  //EXPLICATION DE LA TÂCHE SCSS :
  return gulp
    .src("src/css/sass/*style.scss") //Va me chercher, dans le dossier edit/scss, tous les fichiers terminant par ".src.scss",
    .pipe(
      plumber({
        errorHandler: function(err) {
          // display the error message
          console.log(err);
          // end the errored task
          this.emit("end");
        }
      })
    ) //dis-moi dans le terminal si ils contiennent des erreurs,
    .pipe(sass()) //traduits les de sass à css,
    .pipe(autoprefixer(autoprefixerOpts)) //ajoute-moi les prefixes de vendeurs,
    .pipe(cssnano()) //minifie le CSS qui a ete genere,
    .pipe(gulp.dest("dist/css/")); //et sauvegarde le tout dans le dossier src/css
});

//Tâche pour les fichiers javascript
gulp.task("js", function() {
  //EXPLICATION DE LA TÂCHE JAVASCRIPT :
  return (
    gulp
      .src("src/js/*.js") //Va me chercher, dans le dossier edit/js, tous les fichiers terminant par ".src.js",
      .pipe(
        plumber({
          errorHandler: function(err) {
            // display the error message
            console.log(err);
            // end the errored task
            this.emit("end");
          }
        })
      ) //dis-moi dans le terminal si ils contiennent des erreurs,
      .pipe(gulp.dest("dist/js/"))
      //et sauvegarde le tout dans le dossier src/js

      // .pipe(uglify())                                             //minifie le JS qui a ete genere,
  );
});

//Tâche pour les fichiers img
gulp.task("img", function() {
  return (
    gulp
      .src("src/img/*")
      .pipe(gulp.dest("dist/img/"))
  );
});

//Tâche pour les fichiers font
gulp.task("font", function() {
  return (
    gulp
      .src("src/font/*")
      .pipe(gulp.dest("dist/font/"))
  );
});

//Tâche browsersync
gulp.task("browser-sync", function() {
  //EXPLICATION DE LA TÂCHE BROWSERSYNC :
  browserSync.init(
    [
      //Gentil browsersync, focalise-toi sur les fichiers :
      "dist/css/*.css", // .css contenus dans le dossier src/css,
      "dist/js/*.js", // .js contenus dans le dossier src/js,
      "*.html", // .html contenus dans le dossier src,
      "dist/*.php" // .php contenus dans le dossier src,
    ],
    {
      // ATTENTION, ON NE PEUT SPECIFIER QUE L'UNE DES OPTIONS SUIVANTES, DONC METTRE CELLE QUE L'ON NE VEUT PAS EN COMMENTAIRE :
      server: {
        //Dans le cas ou on est pas sur un serveur Apache,
        baseDir: "./" //balance le résulat du dossier src sur localhost:3000
      }
      //    proxy: "localhost/00_folio",                               //Sinon, balance le tout sur localhost:8000/src, ADAPTER "src" ET METTRE LE NOM DU DOSSIER DANS LEQUEL WP EST INSTALLE
      //    injectChanges: true                                   //et injecte les changements css
    }
  );
});

//////// PHASE 005 > CES TÂCHES SE LANCENT LORSQUE UN FICHIER EST MODIFIE :
gulp.task("watch", ["js", "img", "font", "css", "browser-sync"], function() {
  gulp.watch("src/css/sass/*.scss", ["css"]); //Si un fichier scss            est modifié dans 'edit/scss' > lance la tâche 'css'
  gulp.watch("src/css/sass/styles/base/*.scss", ["css"]); //Si un fichier scss            est modifié dans 'edit/scss' > lance la tâche 'css'
  gulp.watch("src/css/sass/styles/element/*.scss", ["css"]); //Si un fichier scss            est modifié dans 'edit/scss' > lance la tâche 'css'
  gulp.watch("src/css/sass/styles/page/*.scss", ["css"]); //Si un fichier scss            est modifié dans 'edit/scss' > lance la tâche 'css'
  gulp.watch("src/js/*.js", ["js"]); //Si un fichier js              est modifié dans 'edit/js'   > lance la tâche 'js'
  gulp.watch("src/img/*", ["img"]);
  gulp.watch("src/font/*", ["font"]);
  gulp.watch("./*.html").on("change", browserSync.reload); //Si un fichier html            est modifié dans 'src'       > recharge completement la page
});

//////// PHASE 006 > LES TÂCHES QUI SE LANCENT PAR DEFAUT LORSQUE GULP SE LANCE :
gulp.task("default", ["watch"]);
