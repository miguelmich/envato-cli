#!/usr/bin/env node

/**
 * Module dependencies.
 */
 
var cli = require('commander');
var prompt = require('prompt');
var fs = require('fs');
var path = require('path');
var configFilePath = path.join(process.env.HOME, '.envato-cli.json');

/**
 * Check if config file exists
 */
if ( !fs.existsSync(configFilePath) ) {

	prompt.start();

  //Get username & API Key
  prompt.get(['username', 'apikey'], function (err, result) {

		var config;
		config = {
		  username: result.username,
		  apikey: result.apikey
		};

		fs.writeFileSync(configFilePath, JSON.stringify(config), 'utf8');
    console.log('Config file succesfully created in: ' + configFilePath);

    process.exit();
  });

}else{

	var envato = require('./envato.js');

	cli
	  .version('1.0.3')


	/**
	 * Validate license by id
	 */

	cli
	  .command('check [license_id]')
	  .description('Validate the license by id')
	  .action(envato.check);


	/**
	 * Show help if executes with no arguments
	 */

	if (!process.argv.slice(2).length) {
	    cli.outputHelp();
	}

	cli.parse(process.argv);
}