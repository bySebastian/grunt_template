module.exports = function(grunt){

	require('time-grunt')(grunt); // shows time spent on tasks 
	require('load-grunt-tasks')(grunt); // loading all grunt modules base on package.json
	
	grunt.initConfig({

		pkg:grunt.file.reasJSON('package.json'),

		// == CONFIG ==
		watch:{
			options: {
				lifereload: true
			}

			compass: {
				files: ['**/*.{scss,sass}'],
				tasks: ['compass:dev']
			},

			js: {
				files: ['js/**/*.js'],
				tasks: ['uglify']
			}
		},

		compass: {
			dev: {
				options: {
					sassDir: ['styles/sass'],
					cssDir: ['styles/css'],
					environment: 'development'
				}
			},
			prod: {
				options: {
					sassDir: ['styles/sass'],
					cssDir: ['styles/css'],
					environment: 'production'
				}
			}
		},

		uglify: {
			all: {
				files: {
					'js/min/main.min.js': [
						'js/libs/jquery.js',
						'js/main.js'
					]
				}
			}
		}

		express:{
			all:{
				options:{
					port: 9000,
					hostname: 'localhost',
					bases: ['.'],
					livereload: true
				}
			}
		}

	});

	/*
	// == DEPENDENT PLUGINS == 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	*/

	// == TASKS ==
	grunt.registerTask('default',['compass:dev','uglify','express','watch']);
	grunt.registerTask('staging',['compass:dev','uglify']);
	grunt.registerTask('production',['compass:prod','uglify']);

}