const jwt = require('jsonwebtoken');
const { removeListener } = require('../models/User');
const User = require('../models/User');
const user = require('../models/User')

//protect  routes
exports.protect=async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    //Make sure token exists
    if(!token){
        return res.status(401).json({success:false, message:"Not authorize to acces this route"});
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        console.log(error.stack);
        return res.status(401).json({success:false, message:"Not authorize to access this route"});
    }
}

exports.authorize=(...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return res.status(403).json({success:false, message:`User role ${req.user.role} is not authorized to access this route`});
        }
        next();
    }
}