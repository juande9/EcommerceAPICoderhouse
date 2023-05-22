import passport from "passport";
import local from 'passport-local'
import UsersManager from '../managers/UsersManager.js'
import { isValidPassword } from "../helpers/index.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const manager = new UsersManager()
                const users = await manager.getUsersPassport()

                let emailExists = users.some(user => user.email === req.body.email);

                if (emailExists) {
                    console.log('User already exist')
                    return done(null, false)
                }

                let newUser = await manager.createUser(req.body)
                return done(null, newUser)
            }
            catch (e) {
                done('Error al obtener el usuario' + e)
            }
        }))

    passport.use('login', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {

                const manager = new UsersManager()
                const user = await manager.getOneByEmail(username)

                if (!user.id) {
                    console.log('User doesnt exist')
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) return done(null, false)

                return done(null, user)
            }
            catch (e) {
                done('Log in failed:' + e)
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const manager = new UsersManager()
        let user = await manager.getUserById(id)
        done(null, user)
    })
}

export default initializePassport