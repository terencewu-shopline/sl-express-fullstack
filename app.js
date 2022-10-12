const express = require('express')
const { App } = require('@shopline/sl-express')

class MyApp extends App {
}

const app = new MyApp()

module.exports = app;
