const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')
// const { router: memberRouter } = require('./routers/member')
const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config')

const app = express()

app.use(express.static(__dirname + '/public'))

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
)

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth/', authRouter)
// app.use('/api/member/', memberRouter)

const runServer = (port = PORT) => {
    const server = app
    .listen(port, () => {
        mongoose.connect(DATABASE_URL)
        console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
        console.error('Express failed to start');
        console.error(err);
    })
}

if (require.main === module) {
    runServer()
}
