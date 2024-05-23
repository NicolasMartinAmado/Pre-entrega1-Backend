const jwt = require('jsonwebtoken')
const { configObject } = require('../config/config')

const JWT_PRIVATE_KEY = configObject.jwt_secret_key


exports.generateToken = user => jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: '24h' })