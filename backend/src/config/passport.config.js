const passport = require('passport')
const userDaoMongo = require('../daos/mongo/userDaoMongo')
const userService = new userDaoMongo()
const GithubStrategy = require('passport-github2')
exports.initializePassport = () => {

    passport.use('github', new GithubStrategy({
        clientID: ' Iv23ctU9T3UGoH2dA0pc',
        clientSecret: '6aaab288a8ae5fef85c77409873fec9f243f3f6f',
        callbackURL: 'https://backend-mern-s3ql.onrender.com/api/session/githubcallback'
    }, async (accesToken, refreshToken, profile, done)=>{
        try{
            console.log(profile)
            let user = await userService.getBy({email: profile._json.email})
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: '1234',
                }
                let result = await userService.create(newUser)
                console.log("Este es el nuevo usaurio", result)
                return done(null, result)
            }
            done(null, user)
        }catch(err){
            return done(console.log(err))
        }
    }))

    // save and take sessions user credentials
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userService.getBy({_id: id})
        done(null, user)
    })

} 