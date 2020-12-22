const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class CustomerController {
    static register(req, res, next) {
        const userObj = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password
        }
        User.create(userObj)
          .then((data) => {
              res.status(201).json({ id: data.id, email: data.email });
          })
          .catch((err) => {
              next(err);
          })
    }
    
    static login(req, res, next) {
        User.findOne({
          where: {
            email: req.body.email,
            role: "customer"
          }
        })
        .then((data) => {
            if(!data) {
                throw {
                    status: 401,
                    message: "Email or password is invalid."
                }
            } else if (compare(req.body.password, data.password)) {
                    const access_token = sign(data.id, data.email, data.role);
                    res.status(200).json({ access_token });
            } else {
                throw {
                    status: 401,
                    message: "Email or password is invalid."
                }
            }
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
    }

    static getProfile(req, res, next) {
      User.findOne({
        where: {
          id: req.loggedInUser.id
        }
      })
      .then((data) => {
        res.status(200).json({ fullName: data.getFullName() });
      })
      .catch((err) => {
          console.log(err);
          next(err);
      });
  }

  static googleLogin(req, res, next) {
    let payload = {};
    client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then((ticket) => {
        payload = ticket.getPayload();
        return User.findOne({
            where: {
                email: payload.email
            }
        })
    })
    .then((user) => {
        if(user) {
            return user;
        } else {
            return User.create({
                first_name: payload.given_name,
                last_name: payload.family_name,
                email: payload.email,
                password: process.env.GOOGLE_PASSWORD
            })
        }
    })
    .then((user) => {
        const access_token = sign(user.id, user.email, user.role);
        res.status(200).json({ access_token })
    })
    .catch((err) => {
        next(err);
    })
  }
}

module.exports = CustomerController;