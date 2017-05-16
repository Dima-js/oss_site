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
    htmlbuild: {
        dist: {
            src: 'index.html',
            dest: './',
            options: {
                beautify: true,
                scripts: {
                    bundle: [
                        'js/*.js'
                    ],
                    main: 'scripts/common.js'
                },
                styles: {
                    bundle: [
                        'css/style.css'
                    ],
                    test: 'css/style.css'
                },
                sections: {
                    views: 'views/*.html',
                    templates: 'templates/*.html'
                },
                data: {
    			// Data to pass to templates
                    version: "0.1.0",
                    title: "test"
                }
            }
        }
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: '**/*.sass',
        tasks: ['sass', 'postcss', 'cssmin']
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify']
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
  grunt.loadNpmTasks('grunt-browser-sync');

  // Register Grunt tasks
  grunt.registerTask('default', ['browserSync','watch']);
};
