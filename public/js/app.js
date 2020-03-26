console.log('client side script is loaded')

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data)
//     })
// })

let weatherForm = document.querySelector('form')
let search = document.querySelector('input')
let locationName = document.getElementById('location')
let text = document.getElementById('message')

weatherForm.addEventListener('submit', (e) => {
    locationName.textContent = ''
    text.textContent = 'LOADING...'
    e.preventDefault()
    console.log(search.value)
    fetch('http://localhost:3000/weather?adress=' + search.value).then( (response) => {
        response.json().then( (data) => {
            if(data.error) {
                locationName.textContent = ''
                text.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecastData)
                locationName.textContent = 'Location: ' + data.location
                text.textContent = data.forecastData
            }
        })
    })
})



// let cityName = window.prompt('What city do you want to know the weather for?', 'Moscow')


// let city = cityName

// const geocode = (adress, callback) => {
//     const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + adress + ".json?access_token=pk.eyJ1IjoiYXphemFtYXN0ZXIiLCJhIjoiY2s3enJwYXV3MDhqMzNscnU5dXdpYXkwbyJ9.Uzv4nqGDihL3R1LlmNZRgw&limit=1"

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (body.features.length == 0) {
//             callback('Unable to find location. Try another search', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: body.features[0].center[1],
//                 longitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

// const forecast = (latitude, longitude, callback) => {

//     const url = 'https://api.darksky.net/forecast/9b3323bbc49a34b958b01ccb6dd2fdd1/'+ latitude + ',' + longitude + '?units=si'

//     request({ url, json: true }, (error, { body }) => {

//         if (error) {
//             callback('Unable to connect to the internet', undefined)
//         } else if (body.currently.temperature == 0) {
//             callback('Unable to find location. Please try another one', undefined)
//         } else {
//             callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
//         }
//     })

// }

// geocode(city, (error, { latitude, longitude, location }) => {
//     if (error) {
//         return console.log(error)
//     }
//     forecast(latitude, longitude, (error, forecastData) => {
//         if (error) {
//             return console.log(error)
//         }
//         let paragraph = document.getElementById('weather')
//         paragraph.textContent = location + forecastData
//     })
// })