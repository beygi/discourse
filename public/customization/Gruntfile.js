module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['dev/*.ttf'],
                        dest: 'build/',
                        flatten: true
                    }
                ]
            }
        },

        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['customize.css'],
                    dest: 'build/'
                }]
            }

        },

        uglify: {
            development: {
                options: {
                    /*apply if you want to prevent changes to your variable and function names.
          mangle: false
          */
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['customize.js'],
                    dest: 'build/'
                }]
            }
        },

        clean: {
            build: ["build/*"]
        },

        concat: {
            dist: {
                src: ['dev/js/*.js'],
                dest: 'build/customize.js'
            },

            css: {
                src: ['dev/css/*.css'],
                dest: 'build/customize.css'
            }

        },
        watch: {
            change: {
              files: ['dev/**/*'],
              tasks: ['fast']
            },
            livereload: {
              options: { livereload: true },
              files: ['static/**/*']
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean','copy', 'concat' , 'cssmin','uglify']);

};
