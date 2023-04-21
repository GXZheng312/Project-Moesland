const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports = {
    async getEventByTitleAndDate(title, startdate) {
        return await Event.findOne({ title, startdate })
            .catch(err => console.log("Cannot find events by title and date in Event dataset.", err));
    },
    async updateEventById(id, title, description, startdate, enddate, location) {
        return await Event.findOneAndUpdate(
            { _id: { $eq: id } }, 
            { 
              title: { $eq: title }, 
              description: { $eq: description },
              startdate: { $eq: startdate }, 
              enddate: { $eq: enddate }, 
              location: { $eq: location } 
            }, { new: true })
            .catch((err) => {
                console.error(err);
            });
    },
    async deleteEvent(event) {
        return await Event.deleteOne(event)
            .catch(err => console.error(err));
    },
    async createEvent(title, description, startdate, enddate, location){
        const newEvent = new Event({
            title: title,
            description: description,
            startdate: startdate,
            enddate: enddate,
            location: location
        });
        await newEvent.save();
    }
};