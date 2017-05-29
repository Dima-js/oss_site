// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    sass: { // Begin Sass Plugin
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.sass'],
          dest: 'css',
          ext: '.css'
      }]
      }
    },
    postcss: { // Begin Post CSS Plugin
      options: {
        map: false,
        processors: [
      require('autoprefixer')({
            browsers: ['last 2 versions']
          })
    ]
      },
      dist: {
        src: 'css/style.css'
      }
    },
    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
    }]
      }
    },
    uglify: { // Begin JS Uglify Plugin
      build: {
        src: ['src/*.js'],
        dest: 'js/script.min.js'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '*.css',
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    },
      // htmlbuild: {
      //     dist: {
      //         src: 'index.html',
      //         dest: 'samples/',
      //         options: {
      //             beautify: true,
      //             prefix: '//some-cdn',
      //             relative: true,
      //             basePath: false,
      //             scripts: {
      //                 bundle: [
      //                     '<%= fixturesPath %>/scripts/*.js',
      //                     '!**/main.js',
      //                 ],
      //                 main: '<%= fixturesPath %>/scripts/main.js'
      //             },
      //             styles: {
      //                 bundle: [
      //                     '<%= fixturesPath %>/css/libs.css',
      //                     '<%= fixturesPath %>/css/dev.css'
      //                 ],
      //                 test: '<%= fixturesPath %>/css/inline.css'
      //             },
      //             sections: {
      //                 views: '<%= fixturesPath %>/views/**/*.html',
      //                 templates: '<%= fixturesPath %>/templates/**/*.html',
      //                 layout: {
      //                     header: '<%= fixturesPath %>/layout/header.html',
      //                     footer: '<%= fixturesPath %>/layout/footer.html'
      //                 }
      //             },
      //             data: {
      //                 // Data to pass to templates
      //                 version: "0.1.0",
      //                 title: "test",
      //             },
      //         }
      //     }
      // },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: '**/*.sass',
        tasks: ['sass', 'postcss', 'cssmin']
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify']
      }

    },
      sprite:{
          all: {
              src: 'img/sprites/*.png',
              dest: 'im/spritesheet.png',
              destCss: 'sass/_sprites.sass'
          }
      }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-html-build');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Register Grunt tasks
  grunt.registerTask('default', ['browserSync','watch']);
};
