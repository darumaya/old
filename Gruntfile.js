module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var fs = require('fs');
    var path = require('path');

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        // NOTE: This jqueryCheck code is duplicated in customizer.js; if making changes here, be sure to update the other copy too.

        // Task configuration.
        less: {
            'darumaya': {
                options: {
                    strictMath: true,
                    sourceMap: false
                },
                files: [{
                        expand: true, // 展開を有効に
                        cwd: 'src/less/',
                        src: ['*.less', '!*.min.css', '!mixins.less', '!variables.less'],
                        dest: 'css/',
                        ext: ".css"
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            dist: {
                options: {
                    map: false
                },
                src: ['css/*.css', '!css/*.min.css', '!css/bootstrap.min.css']
            }
        },

        csscomb: {
            dist: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css', '!bootstrap.min.css'],
                dest: 'css/'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            dist: {
                files: [{
                    expand: true, // 展開を有効に
                    cwd: 'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            'dist-css': {
                files: 'src/less/*.less',
                tasks: 'dist-css'
            }
        }

    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);

    // Docs HTML validation task
    grunt.registerTask('validate-html', ['jekyll', 'validation']);

    var runSubset = function (subset) {
        return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
    };
    var isUndefOrNonZero = function (val) {
        return val === undefined || val !== '0';
    };

    // CSS distribution task.
    grunt.registerTask('less-compile', 'less');
    grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'csscomb', 'cssmin']);

    // Default task.
    grunt.registerTask('default', 'dist-css');
};
