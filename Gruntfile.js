module.exports = function(grunt) {
  // config tasks
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'client/src/*.js'],
    }
  });

  // load plugin for 'uglify' task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // defaults
  grunt.registerTask('default', ['jshint']);
};
