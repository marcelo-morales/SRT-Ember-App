# cosmology-class

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd cosmology-class`
* `npm install`
* `node .\api\MySQL\setup.js` this ensures that the database to be used is already setup

You will need to create a file in root folder named __.env__ and fill out the following variables

```
SRT_username="" #Username for the camera feed
SRT_password="" #Password for the camera feed
```

[localconfig.js](https://user-images.githubusercontent.com/68576850/142791881-748ff663-c08e-4e22-a34b-0b6c96ea502d.png)


## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

# Structure

## Components
* Reusable UI elements
  ### Livefeed
   * Controls the display of the livefeed for the controller. 

### Login
* Controls the display of the login popup. 

### Nav-Bar
* Component that controls the navigation bar. 

## Templates
* Html for the defined routes.
	### Application
	* Base template for the entire application. Inherited by all other templates.
	### Admin
	* Only accessible by an admin user. 
	* Displays list of all users in the database. 
	* Allows for the creation and deletion of users.
	### Class
		* Accessible to anyone. 
		* Displays all materials related to CLASS as well as images of the telescope.
	### Srt
		* Allows for the submission of commands to the srt telescope. 
		* Accessible to anyone but only logged in users can submit commands.

## Routes
* Sets up the context for the corresponding template, i.e. required models or application states.

## Services
* Allows for the sharing of private component states with the entire application.
	### Livestream
	* Shares whether the livestream viewer is visible or not
	### Login
	* Shares whether the login popup is visible or not

## Serializers
* Used to transform network responses from its corresponding template to Ember's model responses.

## Models. 
* Ember structure for defining and storing data.
	### Authenticate
	* Stores information of a user who uses username and password to login.
	### Query
	* Stores the command to be sent to the telescope as well as the email. 
	### Result **TODO**
	* Stores results of telescope readings from previous command submissions. 
	### Source
	* Stores the sources acquired from the telescope.
	### User
	* Stores user information accessed by the admin from the database.
	### Verify
	* Stores information of a user who uses a token to login.

## Adapters.
* Used to transform network requests from its corresponding template to match backends url structure.

## Controllers
* Used to define behavior for its corresponding template

## Helpers
* Helper functions not belonging to any controllers or components. 

# Development
### Adding new files to the website
* Place the pdf file under the correct public folder. "./public/"
* Under the CLASS route, add the filename to the files array.
* Build ember app and deploy it to the file system.
## TODO 
* Add a results template that displays previously submitted commands. 
* Overlay the command provided by the user on a starmap. Allows user to see how the commands move the telescope.
* Try deploying the backend to the SRT computer connected to the telescope. You would need an outfacing ip address or domain to connect to it. 
