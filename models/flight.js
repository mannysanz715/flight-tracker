import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    index: true,
    unique: true,
    match: /[A-F][1-9]\d?/,
  },
  price: {
    type: Number,
    min: 0
  } 
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum : ['American', 'Southwest', 'United', '']
  },
  airport:{
    type: String,
    default: 'LAX',
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
  },
  flightNo: {
    type: Number,
    require: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: String,
    default: function() {
      return new Date().getFullYear() + 1
    },
  },
  tickets: [ticketSchema],
  meals:[{type: Schema.Types.ObjectId, ref: 'Meal'}]
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight,
}