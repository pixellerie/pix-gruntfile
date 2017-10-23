/*global module:false*/
module.exports = function(grunt) {

  var config = {
    dirSrc: 'src/',
    dirDist: 'dist/'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    {% if (min_concat) { %}
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [config.dirSrc + 'js/FILENAME.js'],
        dest: config.dirDist + 'js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: config.dirDist + 'js/main.js',
        dest: config.dirDist + 'js/main.min.js'
      }
    },{% } %}
    {% if(sass) { %}
    compass: {
      options: {
        sassDir: config.dirSrc + 'scss',
        cssDir: config.dirDist + 'css',
        imagesDir: config.dirSrc + 'images',
        javascriptsDir: config.dirDist + 'js',
        fontsDir: config.dirSrc + 'fonts',
        relativeAssets: true,
        require: [
          'breakpoint',
          'susy'
        ]
      },
      dist: {
        options: {
          environment: 'production',
          sourcemap: false,
          outputStyle: 'compressed'
        }
      },
      dev: {
        options: {
          outputStyle: 'expanded',
          noLineComments: true,
          sourcemap: true,
          environment: 'development',
        }
      }
    }, {% } %}
    watch: {
      {% if(min_concat) { %}
      js: {
        files: [config.dirSrc + 'js/*.js'],
        tasks: ['concat', 'uglify']
      }, {% } %}
      {% if(sass) { %}
      css: {
        files: config.dirSrc + 'scss/**/*.scss',
        tasks: ['compass:dev']
      } {% } %}
    }
  });

  {% if(min_concat) { %}
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify'); {% } %}
  {% if(sass) { %}
  grunt.loadNpmTasks('grunt-contrib-compass'); {% } %}
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', [{%= min_concat ? "'concat', 'uglify'," : "" %}{%= sass ? "'compass:dev'," : "" %} 'watch']);

};
