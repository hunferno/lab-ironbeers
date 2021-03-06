const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded());

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const arrOfBeers = await punkAPI.getBeers(25);
    res.render('beers', { arrOfBeers });
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beers', async (req, res) => {
  try {
    const randomOfBeers = await punkAPI.getRandom();
    console.log(randomOfBeers);
    res.render('random-beers', { randomOfBeers });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
