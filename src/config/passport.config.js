import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import local from 'passport-local'
import GithubStrategy from 'passport-github2';
import UsersManager from '../managers/UsersManager.js'
import { isValidPassword } from "../helpers/index.js";

const LocalStrategy = local.Strategy

const { GITHUB_CLIENT_ID, GITHUB_SECRET_ID, GITHUB_CALLBACK_URL } = process.env;
const credentials = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_SECRET_ID,
    callbackURL: GITHUB_CALLBACK_URL
};

const github = new GithubStrategy(credentials, async (accessToken, refreshToken, profile, done) => {
    try {
        const manager = new UsersManager()
        let user = await manager.getOneByEmail(profile._json.email);

        if (user.id) {
            return done(null, user)
        }

        const dto = {
            firstName: profile._json.name,
            lastName: '',
            age: 18,
            email: profile._json.email,
            password: '',
            enabled: true
        }

        let newUser = await manager.createUser(dto)
        return done(null, newUser);
    }
    catch (e) {
        done('Error al obtener el usuario: ' + e);
    }
});

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
                done(null, newUser)
                return newUser
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

                if (!isValidPassword(user.email, password)) return done(null, false)

                return done(null, user)
            }
            catch (e) {
                done('Log in failed:' + e)
            }
        }))

    passport.use('github', github);

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