module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                debug: true
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.js': ['game/main.js']
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        clean: {
            build: {
                src: ['build/**/*']
            }
        },

        watch: {
            scripts: {
                files: ['common/**/*.js', 'client/**/*.js', 'game/**/*.js'],
                tasks: ['default']
            },
            livereload: {
                files: ['index.html']
            },
            options: {
                livereload: {
                    port: 35729
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['browserify']);
    grunt.registerTask('production', ['browserify', 'uglify']);
};
