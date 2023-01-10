import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema({
  flightNum: String,
  date: Date,
  destination: [String],
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight,
}