const { Router } = require('express')
const passport = require('passport')
const { passportCall } = require('../passport-jwt/passportCall.Middleware')
const { authorization } = require('../passport-jwt/authorization')
const SessionController = require('../controllers/session.controllers')
const { isAuthenticated } = require('../middlewars/auth.middleware')


const router = Router()

const {
    register,
    login,
    logout,
    current,
    github,
    githubCallback,
    toggleUserRole
} = new SessionController()


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/current', [passportCall('jwt'), authorization(['ADMIN', 'PUBLIC'])], current)
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), github)
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), githubCallback)
router.get('/premium/:uid', toggleUserRole)
router.get('/protected-route', isAuthenticated, (req, res) => {
    res.json({ message: 'Protected route' })
})

module.exports = router