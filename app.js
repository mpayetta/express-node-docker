const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const users = require('./routes/users')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)
const isDevEnv = app.get('env') === 'development'

// catch 404 and forward to error handler in development environment
app.use(function(req, res, next) {
  if (isDevEnv) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  } else {
    res.send('404 - not found')
  }
})

// error handlers
app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: isDevEnv ? err : {} // will print stacktrace in development environment
  })
})

module.exports = app
