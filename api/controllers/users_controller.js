const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
  
module.exports.signUp = async function(req, res)
{
    if(req.body.first_name == "" || req.body.last_name == "" || req.body.email == "" || req.body.password == "" || req.body.confirm_password == "")
    {
        console.log('All input fields are required');
        return res.status(400).json({"error": "All input fields are required"});
    }
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({"error": errors.array()});
    }
    if(req.body.password != req.body.confirm_password)
    {
        console.log('Password is not matching');
        return res.status(400).json({"error": "Password is not matching"});
    }
    try
    {
        let user = await User.findOne({email: req.body.email});
        if(!user)
        {
            const salt = await bcrypt.genSalt(10);
            var secpass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: secpass
            });
            let newUser = await user.save();
            console.log('User is created');
            return res.status(200).json(newUser);
        }
        else
        {
            console.log('You are already signed up please login');
            return res.status(200).json({"message": "Already signedup user"});
        }
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.signIn = async function(req, res)
{
    if(req.body.email == "" || req.body.password == "")
    {
        console.log('All input fields are required');
        return res.status(400).json({"error": "All input fields are required"});
    }
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({"error": errors.array()});
    }
    try
    {
        let user = await User.findOne({email: req.body.email});
        if(!user)
        {
            console.log('Invalid email address');
            return res.status(400).json({"error": "Invalid email entered"});
        }
        else
        {
            const password_compare = await bcrypt.compare(req.body.password, user.password);
            if(!password_compare)
            {
                console.log('Password is not matching');
                return res.status(400).json({"error": "Password is not matching"});
            }
            console.log('You are successfully logged in');
            return res.status(200).json(user);
        }
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": err});
    }
}

module.exports.update = async function(req, res)
{
    try 
    {
        const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body,});
        return res.status(200).json({"message": "Account has been updated"});
    } 
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.follow = async function(req, res)
{
    try
    {
        if(req.body.userId !== req.params.id) 
        {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.friends.includes(req.body.userId))
            {
                await user.updateOne({ $push: { friends: req.body.userId } });
                await currentUser.updateOne({ $push: { friends: req.params.id } });
                return res.status(200).json({"message": "you are now following this user"});
            }
            else
            {
                res.status(200).json({"message": "you are already following each other"});
            }
        }
        else
        {
            res.status(200).json({"message": "you can't follow yourself"});
        }

    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.unfollow = async function(req, res)
{
    try
    {
        if(req.body.userId !== req.params.id) 
        {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.friends.includes(req.body.userId))
            {
                await user.updateOne({ $pull: { friends: req.body.userId } });
                await currentUser.updateOne({ $pull: { friends: req.params.id } });
                return res.status(200).json({"message": "you have unfollowed this user"});
            }
            else
            {
                res.status(200).json({"message": "you are not following this user"});
            }
        }
        else
        {
            res.status(200).json({"message": "you can't unfollow yourself"});
        }

    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.profile = async function(req, res)
{
    try
    {
        const user =  await User.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.status(200).json(user);
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.fetchprofile = async function(req, res)
{
    try
    {
        let user = await User.findOne({email: req.params.email});
        const { password, ...other } = user._doc;
        res.status(200).json(user);
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.findusers = async function(req, res)
{
    try
    {
        const users = await User.find();
        const all_users = users.filter((e) => {return e._id != req.params.id});
        const sugg_users = all_users.filter((e) => {return !e.friends.includes(req.params.id)});
        res.status(200).json(sugg_users);
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.friends = async function(req, res)
{
    try
    {
        const users = await User.find();
        const all_friends = users.filter((e) => {return e.friends.includes(req.params.id)});
        res.status(200).json(all_friends);
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.isfriends = async function(req, res)
{
    try
    {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(user.friends.includes(req.body.userId))
        {
            return res.status(200).json(true);
        }
        else
        {
            res.status(200).json(false);
        }
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}