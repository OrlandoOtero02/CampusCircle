//eventController.js
const Event = require('../models/eventModel')
const User = require('../models/userModel'); // Adjust the path as per your project structure
const mongoose = require('mongoose')


const getEvents = async (req, res) => {
    console.log("events:")
    const events = await Event.find({}).sort({createdAt: -1})
    res.status(200).json(events)    
}

const forAdmin1 = async (req, res) => {
  console.log("fuck:");
  try {
      console.log("aaa")
      const unapprovedEvents = await Event.find({ approved: false }).sort({ createdAt: -1 });

      res.status(200).json(unapprovedEvents);
  } catch (error) {
      console.error('Error fetching unapproved events:', error.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};





// get a single event
const getEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findById(id)

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}


// create new event
const createEvent = async (req, res) => {
    const {title, description, approved, date, time, location, circle_id} = req.body
    console.log()
    //error for empty fields
    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(!date) {
        emptyFields.push('date')
    }
    if(!time) {
        emptyFields.push('time')
    }
    if(!location) {
        emptyFields.push('location')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const participants = req.user._id
        const event = await Event.create({title, description, approved, date, time, location, participants, circle_id})
        res.status(200).json(event)
        console.log(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a event
const deleteEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findOneAndDelete({_id: id})

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json()
}



// update a circle
const updateEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!evente) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}


// const joinEvent = async (req,res) => {
//     const { id }  = req.params
//     const userId = req.user._id
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such event'})
//     }
//     try {
//     const event = await Event.findByIdAndUpdate({_id: id},
//         { $push: { participants: userId }})
//         res.status(200).json(event)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }
// const joinEvent = async (req, res) => {
//     console.log("hi please")
//     const { id } = req.params;
//     const userId = req.user._id;

//     console.log("id of event is ", id)
//     console.log("id of user is ", userId)

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such event' });
//     }

//     try {
//         const event = await Event.findByIdAndUpdate(
//             { _id: id },
//             { $push: { participants: userId } },
//             { new: true }
//         );

//         if (!event) {
//             return res.status(404).json({ error: 'No such event' });
//         }

//         res.status(200).json(event);
//     } catch (error) {
//         console.error('Error joining event:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
// const joinEvent = async (req, res) => {
//     console.log("hi please");
//     const { eventId } = req.params;  // Change id to eventId
//     const userId = req.user._id;

//     console.log("id of event is ", eventId);
//     console.log("id of user is ", userId);

//     if (!mongoose.Types.ObjectId.isValid(eventId)) {
//         return res.status(404).json({ error: 'No such event' });
//     }

//     try {
//         const event = await Event.findByIdAndUpdate(
//             { _id: eventId },  // Change id to eventId
//             { $push: { participants: userId } },
//             { new: true }
//         );

//         if (!event) {
//             return res.status(404).json({ error: 'No such event' });
//         }

//         res.status(200).json(event);
//     } catch (error) {
//         console.error('Error joining event:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const joinEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(404).json({ error: 'No such event' });
    }

    try {
        // Check if the user is already a participant in the event
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'No such event' });
        }

        const isParticipant = event.participants.includes(userId);

        if (isParticipant) {
            // User is already a participant, so remove them from the event
            const updatedEvent = await Event.findByIdAndUpdate(
                { _id: eventId },
                { $pull: { participants: userId } },
                { new: true }
            );

            res.status(200).json(updatedEvent);
        } else {
            // User is not a participant, so add them to the event
            const updatedEvent = await Event.findByIdAndUpdate(
                { _id: eventId },
                { $push: { participants: userId } },
                { new: true }
            );

            res.status(200).json(updatedEvent);
        }
    } catch (error) {
        console.error('Error joining/unjoining event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const approveEvent = async (req, res) => {
  const eventId = req.params.eventId;

  try {
      const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          { approved: true },
          { new: true } // Return the updated document
      );

      if (!updatedEvent) {
          return res.status(404).json({ success: false, error: 'Event not found' });
      }

      res.status(200).json({ success: true, event: updatedEvent });
  } catch (error) {
      console.error('Error approving event:', error.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};





module.exports = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    approveEvent,
    forAdmin1,
}