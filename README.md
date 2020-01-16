# Wintr Api Abstraction
Unofficial [Wintr scrapper service](https://wintr.com) abstraction

## Installation
`npm i wintr`

## Usage
Wintr object should be instantiated with default options, including at least an Api key. See below for options description.
 
```ecmascript 6
const w = new Wintr(options)
```

Two public methods are then available to interact with the Api :

- Fetch Api
```ecmascript 6
w.fetch(options)
    .then(data => {})
    .catch(error => {})
```
Get account data
```ecmascript 6
w.getAccountData(options)
    .then(data => {})
    .catch(error => {})
```

### Options
Options are detailed [here](https://www.wintr.com/api-documentation), and are available as constants in the module for easy rules writing

## Development
Tests and examples are not included in the Npm release to keep it lightweight.
Use the repository for development

### Tests
Tests are handled by [ava](https://github.com/avajs/ava), and coverage by [nyc](https://github.com/istanbuljs/nyc).

Commands includes : 
- `npm run test` : Run tests
- `npm run coverage` : Run tests through nyc, and output lcov file

### Example
An example application is included. Run it with : 

`npm run dev` 

and open your browser at [localhost:8080](http://localhost:8080)

### Contributing
Issue reports, pull requests, suggestions and comments are very welcome, don't hesitate !

Please keep in mind that this repo use [commitizen](https://github.com/commitizen/cz-cli) -style commit messages and follow js [standard](https://standardjs.com/)'s style

### License

[ISC](https://choosealicense.com/licenses/isc/)

Copyright (c) 2020, [121593](https://github.com/121593)
