module.exports = function(config) {
	config.set({
		basePath: '',

		frameworks: ['jasmine'],

		plugins: ["karma-coverage", "karma-ng-html2js-preprocessor", "karma-jasmine",
			'karma-chrome-launcher'],

		files: [
			'dist/vendor/vendor.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'src/**/*.html',
			'src/**/*.module.js',
			'src/**/*.js',
			'test/unit/**/*.js'
		],

		exclude: [''],

		preprocessors: {
			'src/**/*.html': ['ng-html2js'],
			'src/**/*.js': ['coverage']
		},

		ngHtml2JsPreprocessor: {
			moduleName: 'templates'
		},

		reporters: ['progress', 'coverage'],

		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: true,

		browsers: ['Chrome'],

		singleRun: false
	});
};