module.exports = function(grunt){

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
			production: {
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
			production: {
				files: {
					'build/assets/js/app.min.js': [
						'assets/js/vender/jquery.js',
						'assets/js/app.js'
					]
				}
			}
		},

		cssmin: {
			production: {
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
			production: {
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
				].join('&&'),
				options: {
					config: 'staging'
				}
			},

			production: {
				command: [
					'cd /home/someuser/app',
					'git pull origin master'
				].join('&&'),
				options: {
					config: 'production'
				}
			}
			
		},

		deployments: {
			options: {
				//
			},
			"local": {
		      "title": "Local",
		      "database": "local_db_name",
		      "user": "local_db_username",
		      "pass": "local_db_password",
		      "host": "local_db_host",
		      "url": "local_db_url"
		      // note that the `local` target does not have an "ssh_host"
		    },
		    "staging": {
		      "title": "Stage",
		      "database": "stage_db_name",
		      "user": "stage_db_username",
		      "pass": "stage_db_password",
		      "host": "stage_db_host",
		      "url": "stage_db_url",
		      "ssh_host": "ssh_user@ssh_host"
		    },
		    "production": {
		      "title": "Production",
		      "database": "production_db_name",
		      "user": "production_db_username",
		      "pass": "production_db_password",
		      "host": "production_db_host",
		      "url": "production_db_url",
		      "ssh_host": "ssh_user@ssh_host"
		    }
		},

		express:{ // live browser reload
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
	grunt.loadNpmTasks('grunt-deployments');
	*/

	// == TASKS ==
	grunt.registerTask('dev',['watch']);
	grunt.registerTask('staging',['clean:build','compass:production','sshexec:staging']);
	grunt.registerTask('production',['clean:build','compass:production','cssmin:production','uglify:production','imagemin:dist','sshexec:production']);

}