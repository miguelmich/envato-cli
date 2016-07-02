# envato-license-check

This is a command line client Envato API license validator, useful when you need to validate a purchase with the license id.

## Getting Started

*  Install with npm: `npm install -g envato-license-check`
*  Run it with `envato [command] [arguments]`

### Initial Setup
When running the first time (or if you didn't create a config file), it will ask you for your Envato username and API Key and a new config file will be created in `~/.envato-cli.json` with this data. You can create or modify this file manually.

## Usage

There is only one main command `check [license_id]` if no command is provided help is shown:

```
  Usage:  [options] [command]


  Commands:

    check [license_id]  Validate the license by id

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

## License

Copyright (c) 2016 Miguel Mich  
Licensed under the MIT license.