//native node modules
const fs = require('fs')

//npm modules
const express = require('express');
const hbs = require('hbs')

//init express instance
const port = process.env.PORT || 3000;
const app = express();

//app config + middleware
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`
	
	console.log(log);

	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log')
		}
	})

	next();
})

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'))

//helper funcs
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

//routes
app.get('/', (req, res) => {
	res.render('home.hbs', {
		welcomeMessage: 'Welcome to my website!',
		pageTitle: 'Home Page',
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	})
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Project Page'
	})
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to process request'
	});
});



app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`)
});