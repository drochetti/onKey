module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'dist/onKey.js':        ['src/main.js'],
                    'examples/build.js':    ['examples/example.js']
                },
                options: {
                    standalone: 'onKey'
                }
            },
            test: {
                files: {
                    'test/build.js':        ['test/test.js']
                },
                options: {
                    debug: true
                }
            }
        },
        watch: {
            files: [ "src/**/*", "examples/example.js", "test/test.js"],
            tasks: [ 'browserify' ]
        },
        jshint: {
            options: {
                curly:  true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            uses_defaults: ['src/**/*.js']
        },
        uglify: {
            dist: {
                files: {
                    'dist/onKey.min.js': ['dist/onKey.js']
                },
                options: {
                    sourceMap: true
                }
            }
        },
        qunit: {
            files: ['test/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', [
        'browserify:test',
        'qunit',
        'jshint'
    ]);

    grunt.registerTask('build', [
        'test',
        'browserify:dist',
        'uglify'
    ]);
};

