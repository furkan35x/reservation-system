const User=require("../models/User.js");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res) => {
    const{name,email,password} =req.body;
    if(!name || !email || !password){
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    try{
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:'User already exist'})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });

        if(user){
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token:generateToken(user.id),
            });
        }else{
            res.status(400).json({message:'Invalid user data'});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateToken=(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
};
module.exports={
    registerUser,
    loginUser,
};

