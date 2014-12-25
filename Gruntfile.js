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
                        src: ['styles.less'],
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
                src: ['css/styles.css']
            }
        },

        csscomb: {
            dist: {
                expand: true,
                cwd: 'css/',
                src: ['styles.css'],
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
                    src: ['styles.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            'dist-css': {
                files: 'src/less/*.less',
                tasks: 'dist-css'
            },
            'dist-images': {
                files: ['src/images/**/*.{jpg,JPG}'],
                tasks: 'dist-images'
            }
        },

        responsive_images: {
            jpg: {
                options: {
                    sizes: [{
                        name: 'xs',
                        width: 414,
                        quality: 80
                    }, {
                        name: 'xs-2x',
                        width: 828,
                        quality: 30
                    }, {
                        name: 'sm',
                        width: 720,
                        quality: 80
                    }, {
                        name: 'sm-2x',
                        width: 1440,
                        quality: 30
                    }, {
                        name: 'md',
                        width: 940,
                        quality: 80
                    }, {
                        name: 'md-2x',
                        width: 1880,
                        quality: 30
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.jpg', '!**/*-jumbotron-*.{jpg,JPG}'],
                    dest: 'images/'
                }]
            },
            JPG: {
                options: {
                    sizes: [{
                        name: 'xs',
                        width: 414,
                        quality: 80
                    }, {
                        name: 'xs-2x',
                        width: 828,
                        quality: 30
                    }, {
                        name: 'sm',
                        width: 720,
                        quality: 80
                    }, {
                        name: 'sm-2x',
                        width: 1440,
                        quality: 30
                    }, {
                        name: 'md',
                        width: 940,
                        quality: 80
                    }, {
                        name: 'md-2x',
                        width: 1880,
                        quality: 30
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.JPG', '!**/*-jumbotron-*.{jpg,JPG}'],
                    dest: 'images/'
                }]
            },
            jumbotron: {
                options: {
                    sizes: [{
                        name: 'i6',
                        width: 414,
                        quality: 80
                    }, {
                        name: 'i6-2x',
                        width: 828,
                        quality: 30
                    }, {
                        name: 'xs',
                        width: 768,
                        quality: 80
                    }, {
                        name: 'xs-2x',
                        width: 1536,
                        quality: 30
                    }, {
                        name: 'sm',
                        width: 992,
                        quality: 80
                    }, {
                        name: 'hd',
                        width: 1920,
                        quality: 30
                    }, {
                        name: 'md',
                        width: 1200,
                        quality: 80
                    }, {
                        name: '100',
                        width: 100,
                        height: 100,
                        aspectRatio: false,
                        quality: 80
                    }, {
                        name: '100-2x',
                        width: 200,
                        height: 200,
                        aspectRatio: false,
                        quality: 50
                    }]                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*-jumbotron-*.{jpg,JPG}'],
                    dest: 'images/'
                }]
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
    grunt.registerTask('dist-css', ['less', 'autoprefixer', 'csscomb', 'cssmin']);

    // image resize task.
    grunt.registerTask('dist-images', 'responsive_images');

    // Default task.
    grunt.registerTask('default', ['dist-css', 'dist-images']);
};
