const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/inputModels/user');
const opts = {};

//Bearer string
//JWT token from users.js will be appended
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        const userType = jwt_payload.userType ? jwt_payload.userType : 'user';
        if(userType == 'user') {
          User.findOne({
            UniqueCode: jwt_payload.uniqueCode,
            id: jwt_payload.id,
            ...(jwt_payload.buildersUC ? {
              [jwt_payload.buildersUC]: {
                $exists: 1
              }
            } : {}),
          })
          .lean()
          .then(user => {
            if (user) {
              let object = {
                ...user,
                uniqueCode: user.UniqueCode,
                classification: user.Classification,
              };
              if(user.Classification === User.Classification.LogbuildStaff) {
              }
              else if(user.Classification === User.Classification.BuilderStaff) {
                const buildersUC = jwt_payload.buildersUC;
                object = {
                  ...object,
                  buildersUC: buildersUC,
                  name: user[buildersUC].Name,
                  auth: user[buildersUC].Auth.MasterAuth,
                  buildersUCs: Object.entries(user).filter(([k, v]) => v.Name).map(([k, v]) => k),
                };
              }
              else if(user.Classification === User.Classification.SupplierStaff) {
                object = {
                  ...object,
                  ...Object.entries(user).filter(([k, v]) => v.Name).reduce((p, [k, v]) => ({...p, ...{[k]: v}}), {}),
                };
              }
              return done(null, object);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
        }          
      })
    );
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });  
  };
  
  function isNotAuthPath(path) {
    return [
      '/Account',
    ].some(pattern => new RegExp(pattern).test(path));
  }
  
  function isUnauthorized(req) {
    const user = req.user;
    if(!user)
      return true;
    return true;
  }
  
  module.exports.isNotAuthPath = isNotAuthPath;
  
  module.exports.isUnauthorized = isUnauthorized;
  