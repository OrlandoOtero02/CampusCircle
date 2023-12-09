//circleController.js
const Circle = require('../models/circleModel')
const User = require('../models/userModel'); // Adjust the path as per your project structure
const mongoose = require('mongoose')

// get all circles
const getCircles = async (req, res) => {
    const user_id = req.user._id

    const circles = await Circle.find({}).sort({createdAt: -1})

    res.status(200).json(circles)
}

const getUserCircles = async (req, res) => {
    const user_id = req.user._id

    const circles = await Circle.find({"members" : { $in : user_id}}).sort({createdAt: -1})

    res.status(200).json(circles)
}

const getJoinableCircles = async (req, res) => {
    const user_id = req.user._id;
  
    // Step 1: Query the User collection to retrieve the 'following' array
    const user = await User.findOne({ _id: user_id });
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const following = user.following;
  
    // Step 2: Use the retrieved 'following' array to query the Circle collection
    const query = {
      $or: [
        { isPrivate: false, members: { $nin: user_id } }, // Check if isPrivate is false
        { isPrivate: true, user_id: { $in: following }, members: { $nin: user_id } } // Check if isPrivate is true and user_id is in 'following' array
      ]
    };
  
    const circles = await Circle.find(query).sort({ createdAt: -1 });
  
    res.status(200).json(circles);
  };

// get a single circle

const getCircle = async (req, res) => {
    const { id } = req.params;

    try {
        const circle = await Circle.findById(id)
                             .populate('members', 'username'); // Populate only the usernames of the members

        if (!circle) {
            return res.status(404).json({ error: 'No such circle' });
        }

        res.status(200).json(circle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// create new circle
const createCircle = async (req, res) => {
    const {title, description} = req.body

    //error for empty fields
    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const members = req.user._id
        const circle = await Circle.create({title, description, user_id, members})
        res.status(200).json(circle)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a circle
const deleteCircle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }

    const circle = await Circle.findOneAndDelete({_id: id})

    if (!circle) {
        return res.status(404).json({error: 'No such circle'})
    }

    res.status(200).json(circle)
}


// update a circle
const updateCircle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }

    const circle = await Circle.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!circle) {
        return res.status(404).json({error: 'No such circle'})
    }

    res.status(200).json(circle)
}


const joinCircle = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such circle' });
    }

    try {
        // First, retrieve the circle without updating it
        const circle = await Circle.findById(id);

        // Check if the user is already in the circle's members list
        if (circle.members.includes(userId)) {
            return res.status(400).json({ error: 'User already a member of this circle' });
        }

        // User is not a member, so proceed to add them to the circle
        const updatedCircle = await Circle.findByIdAndUpdate(
            { _id: id },
            { $push: { members: userId }},
            { new: true }  // Return the updated document
        );

        res.status(200).json(updatedCircle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addEventToCircle = async (req, res) => {
    const { circleId, eventId } = req.params;
    console.log("hiiiii")
    // Validation and error handling goes here
    try {
        const updatedCircle = await Circle.findByIdAndUpdate(
            circleId,
            { $push: { approvedEvents: eventId } },
            { new: true }
        );
        if (!updatedCircle) {
            return res.status(404).json({ error: 'Circle not found' });
        }
        res.status(200).json(updatedCircle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const leaveCircle = async (req,res) => {
    const { id }  = req.params
    const userId = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }
    try {
    const circle = await Circle.findByIdAndUpdate({_id: id},
        { $pull: { members: userId }})
        res.status(200).json(circle)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getCircles,
    getUserCircles,
    getJoinableCircles,
    getCircle,
    createCircle,
    deleteCircle,
    updateCircle,
    addEventToCircle,
    joinCircle,
    leaveCircle,
}