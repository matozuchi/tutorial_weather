const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')
const publicPath = path.join(__dirname, '/public')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        content: 'Weather forcast'
    })
})

app.get('/products', (req, res) => {
    if (req.query.search) {
        res.send('<h1>The search has been made</h1>')
    } else {
        res.send('<p>no search has been made</p>')
    }
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        res.send({
            error: 'Please enter an adress'
        })
    } else {
        let city = req.query.adress
        geocode(city, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                res.send({
                    error: error
                })
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        res.send({
                            error: error
                        })
                    } else {
                        res.send({
                            location: location,
                            forecastData: forecastData
                        })
                        // res.send(`<p>${location} ${forecastData}</p>`)
                        // res.render('index', {
                        //     location: location,
                        //     forecastData: forecastData
                        // })
                    }

                })
            }
        })
    }
})

app.get('/about', (req, res) => {
    res.render('index', {
        content: 'ABOUT'
    })
})

app.get('*', (req, res) => {
    res.render('index', {
        content: '404'
    })
})

app.listen(port, () => {
    console.log('The server is up on ' + port)
})