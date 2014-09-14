
## Manual ##

* grunt dev // watching sass/css
* grunt staging // pushing to staging server
* grunt production // pushing to production server

* grunt db_push --target="staging" // moves local database to a remote database location e.g. from local to staging
* grunt db_pull --target="production" // pulls a remote database into a local environment  e.g. from production to local


!!! Tip: add Gruntfile.js to .gitignore !!!




## 1. Preparing ##

* npm install grunt-cli -g 
* npm install load-grunt-tasks

## 2. Project ##

* mkdir <yourProjectDir>
* cd <yourProjectDir>
* npm init
* new-item readme.MD
* npm install grunt --save-dev 
* npm install grunt-contrib-clean --save-dev
* npm install grunt-contrib-compass --save-dev // requires ruby, sass, compass
* npm install grunt-contrib-jshint --save-dev
* npm install grunt-contrib-imagemin --save-dev
* npm install grunt-contrib-watch --save-dev
* npm install grunt-contrib-uglify --save-dev
* npm install grunt-contrib-cssmin --save-dev
* npm install grunt-shell --save-dev
* npm install grunt-deployments --save-dev
* npm install grunt-express --save-dev
* ...
* mkdir sass ... // making folder structure
* new-item Gruntfile.js // making and editing Grundfile.js

