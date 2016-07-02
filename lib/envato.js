var request = require("request");
var path = require('path');
var fs = require('fs');

var configFilePath = path.join(process.env.HOME, '.envato-cli.json');
var envatoApiBase = 'http://marketplace.envato.com/api/edge/';
var configFile, envatoUser, envatoApiKey;

/**
 * Load config file
 */

var loadConfigFile = function(path) {
  var configFile;
  configFile = fs.readFileSync(path);
  return JSON.parse(configFile);
};


/**
 * Load config file & read credentials
 */

configFile = loadConfigFile(configFilePath);
envatoUser = configFile.username;
envatoApiKey = configFile.apikey;


module.exports = {

	/**
	 * Validate license by id
	 */

  check: function(env){
    env = env || false;
    var url = envatoApiBase + envatoUser + '/' + envatoApiKey + '/verify-purchase:' + env + '.json';

    //If license id argument passed
    if( env ) {
			
			//Get the API json reponse
	    request({
			    url: url,
			    json: true,
			    headers: {
				    'User-Agent': 'Node.js - Envato API Consumer'
				  }
			}, function (error, response, api) {
			    if (!error && response.statusCode === 200) {

			        var purchase = api['verify-purchase'];

			        if( Object.keys(purchase).length !== 0 ){

				        //Display purchase data
				        console.log('Item name: \t' + purchase.item_name);
				        console.log('Item id: \t' + purchase.item_id);
				        console.log('Created at: \t' + purchase.created_at);
				        console.log('Buyer: \t\t' + purchase.buyer);
				        console.log('License: \t' + purchase.licence);
				        console.log('Supported until: \t' + purchase.supported_until);

				      }else{
				      	console.log('No data found for license id: ' + env);
			        }
			    }else if( response.statusCode === 403 ){
			    	console.log('Username and/or API Key invalid');
			    }else{
			    	console.log( response.statusCode + " - Error trying to get the API reponse");
			    }
			});

    }else{
    	console.log('Please provide a valid envato license id');
    }
  }
};