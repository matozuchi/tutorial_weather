const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/9b3323bbc49a34b958b01ccb6dd2fdd1/'+ latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to the internet', undefined)
        } else if (body.currently.temperature == 0) {
            callback('Unable to find location. Please try another one', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })

}

module.exports = forecast