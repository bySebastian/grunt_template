module.exports = function(grunt){

	require('time-grunt')(grunt); // shows time spent on tasks 
	require('load-grunt-tasks')(grunt); // loading all grunt modules base on package.json
	
	grunt.initConfig({

		pkg:grunt.file.reasJSON('package.json'),

		// == CONFIG ==
		clean: {
			build: [
				'build'
			]
		},

		compass: {
			dist: {
				options: {
					sassDir: 'assets/sass',
					cssDir: 'build/assets/css',
					environment: 'production',
					// require: 'zurb-foundation'
				}
			},
			dev: {
				options: {
					sassDir: 'assets/sass',
					cssDir: 'build/assets/css',
					envirionment: 'development',
					// require: 'zurb-foundation'
				}
			}
		},

		jshint: {
			work: [
				'assets/js/*.js',
				'Gruntfile.js'
			]
		},

		imagemin: {
			dist: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: 'build/',
						src: ['**/*.jpg'],
						dest: 'build/',
						ext: '.jpg'
					},
					{
						expand: true,
						cwd: 'build/',
						src: ['**/*.png'],
						dest: 'build/',
						ext: '.png'
					}
				]
			}
		},

		uglify: {
			dist: {
				files: {
					'build/assets/js/app.min.js': [
						'assets/js/vender/jquery.js',
						'assets/js/app.js'
					]
				}
			}
		},

		cssmin: {
			dist: {
				expand: true,
				cwd: 'assets/css',
				src: ['*.css'],
				dest: 'build/assets/css'
			}
		}

		watch:{
			options: {
				lifereload: true
			}

			compass: {
				files: ['assets/sass/**/*.{scss,sass}'],
				tasks: ['compass:dev']
			},

			js: {
				files: ['assets/js/*.js'],
				tasks: ['jshint:work','uglify']
			}
		},

		sshconfig: {
			dist: {
				host: 'someserver.com',
				username: 'someuser',
				agent: process.env.SSH_AUTH_SOCK
			},

			staging: {
				host: 'someserver.com',
				username: 'someuser',
				agent: process.env.SSH_AUTH_SOCK
			},
		}

		sshexec: {
			staging: {
				command: [
					'cd /home/someuser/app',
					'git pull origin master'
					'npm install'
					'forever stop server.js'
					'forever start server.js'
					'forever list'
				].join('&&'),
				options: {
					config: 'staging'
				}
			},

			dist: {
				command: [
					'cd /home/someuser/app',
					'git pull origin master'
					'npm install'
					'forever stop server.js'
					'forever start server.js'
					'forever list'
				].join('&&'),
				options: {
					config: 'dist'
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
	grunt.loadNpmTesks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	*/

	// == TASKS ==
	grunt.registerTask('dev',['watch']);
	grunt.registerTask('staging',['clean:build','compass:dist','sshexec:staging']);
	grunt.registerTask('production',['clean:build','compass:dist','cssmin:dist','uglify:dist','sshexec:dist']);

}