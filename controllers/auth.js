const User = require('../models/User');
const { options } = require('../routes/auth');

exports.register=async(req,res,next)=>{
    try {
        const {name, email, password, role} = req.body;

        //create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        //create JWT token
        // const token = user.getSignedJwtToken();

        // res.status(200).json({success:true, token});

        //call function to create JWT token, send response (like the above 2 lines) and store JWT token to cookie.
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({success:false});
        console.log(error.stack);
    }
}

//@desc   Login user
//@routs    POST /api/v1/auth/login
//@access   Public
exports.login = async (req,res,next) =>{
    const {email, password} = req.body;

    //validate email & pw(password)
    if(!email || !password){
        return res.status(400).json({success:false, msg:'Please provide an email and password'});
    }

    //check for user
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).json({success:false, msg:'Invalid credentials'});
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(400).json({success:false, msg:'Invalid credentials'});
    }

    //create token
    // const token = user.getSignedJwtToken();

    // res.status(200).json({success:true, token});

    //call function to create JWT token, send response (like the above 2 lines) and store JWT token to cookie.
    sendTokenResponse(user, 200, res);
}

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) =>{
    //create token
    const token = user.getSignedJwtToken();

    //creat options
    const options = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure=true;
    }

    //send status and set information to cookie
    res.status(statusCode).cookie('token', token, options).json({
        success:true,
        token
    })
}

exports.getMe = async (req, res, next) =>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        data:user
    })
}