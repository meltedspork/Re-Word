'use strict';

var
  LIVERELOAD_PORT = 35729,
  lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
  mountFolder = function( connect, dir ) {
    return connect.static(require('path').resolve(dir));
  };

module.exports = function( grunt ) {

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-requirejs');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-react');

  //grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      livereload: {
        files: [
          '{,*/}*.html'//,
          //'static/{,*/}*.{css,js,png,jpg,gif,svg}'
        ],
        //tasks: ['jshint'],
        options: {
          livereload: LIVERELOAD_PORT
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function( connect ) {
            return [
              lrSnippet,
              mountFolder(connect, 'app')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: [
        'Gruntfile.js',
        'app/scripts/{,*/}*.js',
      ]
    },
    //useminPrepare: {
    //  html: 'dist/index.html',
    //  options: {
    //    dest: 'dist'
    //  }
    //},
    //concat: {
    //  options: {
    //    separator: ';',
    //  },
    //  dist: {
    //    files: {
    //      'dist/scripts/theme.js': [
    //        'app/scripts/{,*/}*.js'
          //],
          //'dist/scripts/main.js': [
          //  'app/bower_components/requirejs/require.js',
          //  'app/bower_components/jquery/dist/jquery.min.js',
          //  'app/bower_components/backbone/backbone.js',
          //  'app/bower_components/requirejs-text/text.js',
          //  'app/bower_components/lodash/dist/lodash.min.js',
          //  'app/bower_components/react/react-with-addons.min.js',
          //  'app/bower_components/jsx-requirejs-plugin/js/JSXTransformer.js',
          //  'app/bower_components/jsx-requirejs-plugin/js/jsx.js',
            //'app/scripts/{,*/}*.js'
    //      ]
    //    }
    //  },
    //},
    requirejs: {
      compile: {
        options: {
          baseUrl: "app/scripts",
          out: "dist/scripts/main.js",
          name: "../bower_components/almond/almond",
          stubModules: ['jsx', 'text', 'JSXTransformer'],
          include: 'main',
          mainConfigFile: "app/scripts/main.js"
        }
      }
    },
    processhtml: {
      options: {
        data: {
          message: 'Hello world!'
        }
      },
      dist: {
        files: {
          'dist/index.html': ['app/index.html']
        }
      }
    },
    //react: {
    //  dis: {
    //    files: {
    //      'dist/scripts/theme.js': 'dist/scripts/theme.js'
    //    }
    //  }
    //},
    copy: {
      main: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            'index.html',
            //'*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            //'styles/fonts/{,*/}*.*',
            //'bower_components/sass-bootstrap/fonts/*.*',
            //'server.js'
          ]
        }]
      }
    }
  });

  grunt.registerTask('server', function() {
    grunt.task.run([
      'connect:livereload',
      'open',
      'watch'
    ]);
  });
  grunt.registerTask('default', [ 'server' ]);

  grunt.registerTask('build', [
    //'copy',
    'processhtml',
    //'concat',
    //'react',
    'requirejs'
  ]);

  //grunt.registerTask('require', [ 'requirejs' ]);
};