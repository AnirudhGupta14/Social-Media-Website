const User = require('../models/user');
const Post = require('../models/post');

module.exports.upload = async function(req, res)
{
    try
    {
        return res.status(200).json("File uploaded successfully");
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}


module.exports.create = async function(req, res)
{
    const newPost = new Post(req.body);
    try
    {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.change = async function(req, res)
{
    try
    {
        const post = await Post.findById(req.params.id);
        await post.updateOne({ $set: req.body });
        return res.status(200).json({"message": "the post has been updated"});
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.destroy = async function(req, res)
{
    try
    {
        const post = await Post.findById(req.params.id);
        await post.deleteOne();
        return res.status(200).json({"message": "the post has been deleted"});
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.likepost = async function(req, res)
{
    const post = await Post.findById(req.params.id);
    try
    {
        if(!post.likes.includes(req.body.userId)) 
        {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The post has been liked");
        } 
        else 
        {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("The post has been disliked");
        }
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.getsinglepost = async function(req, res)
{
    try
    {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.getallpost = async function(req, res)
{
    try
    {
        const currentUser = await User.findById(req.params.id);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
        currentUser.friends.map((friendId) => {
          return Post.find({ userId: friendId });
        }));
        return res.status(200).json(userPosts.concat(...friendPosts))
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

module.exports.userspost = async function(req, res)
{
    try
    {
        const user = await User.findById(req.params.id);
        const posts = await Post.find({userId: user._id});
        return res.status(200).json(posts);
        
    }
    catch(err)
    {
        console.log('Error occured', err);
        return res.status(500).json({"error": "Error occured"});
    }
}

