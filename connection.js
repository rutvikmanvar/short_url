const mongoose = require('mongoose')

async function connectToMongo(url) {
    return mongoose.connect(url)
    .then(console.log('Connected successfully'))
    .catch(err => console.log(err))
}

module.exports = {
    connectToMongo
}