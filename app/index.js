'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var AutobahnGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},
	askFor: function () {
		var done = this.async();

		// have Yeoman greet the user
		this.log(this.yeoman);

		// replace it with a short and sweet description of your generator
		this.log(chalk.magenta('You\'re using the fantastic Autobahn generator.'));

		var prompts = [{
			name: 'author',
			message: 'Author name?',
		},
		{
			name: 'initials',
			message: 'Your initials?',
		},
		{
			name: 'email',
			message: 'Author email?',
		},
		{
			name: 'organisation',
			message: 'Your organisation name?',
		},
		{
			name: 'country',
			message: 'Your country?',
		},
		{
			name: 'applicationName',
			message: 'Name of your application?',
			default: 'myApp'
		},
		{
			name: 'version',
			message: 'version number of your application?',
			default: '0.0.0'
		},
		{
			name: 'description',
			message: 'Description of your application?'
		},
		{
			name: 'githubURL',
			message: 'github URL of the repository?'
		},
		{
			name: 'certifName',
			message: 'name of the generated certification?'
		},
		{
			name: 'certifPassword',
			message: 'password of the generated certification?'
		}];

		this.prompt(prompts, function (props) {
			this.author = props.author;
			this.initials = props.initials;
			this.email = props.email;
			this.organisation = props.organisation;
			this.country = props.country;
			this.applicationName = props.applicationName;
			this.version = props.version;
			this.description = props.description;
			this.githubURL = props.githubURL;
			this.certifName = props.certifName;
			this.certifPassword = props.certifPassword;

			done();
		}.bind(this));

	},
	app: function () {
		this.template('AIRAliases.js', 'AIRAliases.js');
		this.template('AIRIntrospector.js', 'AIRIntrospector.js');
		this.template('app.js', 'app.js');
		this.template('bower.json', 'bower.json');
		this.template('compile.sh', 'compile.sh');
		this.template('debug.sh', 'debug.sh');
		this.template('gen-certif.sh', 'gen-certif.sh');
		this.template('index.html', 'index.html');
		this.template('README.md', 'README.md');
		this.template('YOUR_APP.xml', this.applicationName + '.xml');
		this.directory('badges', 'badges');
		this.directory('icons', 'icons');
		this.directory('templates', 'templates');
	},
	projectfiles: function () {
		//this.copy('jshintrc', '.jshintrc');
		//this.copy('gitignore', '.gitignore');
	},
	runNpm: function () {
		var done = this.async();
		this.bowerInstall('', function () {
			console.log('\nEverything Setup !!!\n');
			done();
		});
	}
});

module.exports = AutobahnGenerator;