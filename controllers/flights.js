import { Flight } from "../models/flight.js";

import { Meal } from "../models/meal.js";

function index(req,res){
  Flight.find({})
  .then(flights =>{
    res.render('flights/index',{
      title: 'Flight Tracker',
      flights
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('flights/index')
  })
}

function newFlight(req, res){
  res.render('flights/new',{
    title: 'Add Flight'
  })
}

function create(req, res){
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  console.log(req.body.departs,'departs')
  Flight.create(req.body)
  .then(flight =>{
    res.redirect('/flights')
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/flights/new')
  })
}

function show(req, res){
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight =>{
    Meal.find({_id: {$nin: flight.meals}})
    .then( meals =>{
    res.render('flights/show', {
      title: 'Flight',
      flight,
      meals
    })})
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.id)
  .then( flight =>{
    res.redirect('/flights')
  }
  )
}

function edit(req, res){
  Flight.findById(req.params.id)
  .then(flight =>{
    res.render('flights/edit',{
      title: 'Edit Flight',
      flight
    })
  })
}

function update(req, res){
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight =>{
    res.redirect('/flights/'+req.params.id)
  })
}

function addTickets(req, res){
  Flight.findById(req.params.id)
  .then(flight =>{
    flight.tickets.push(req.body)
    flight.save()
    .then(() =>{
      res.redirect('/flights/'+ flight._id)
    })
  })
}

function addMeal(req, res){
  Flight.findById(req.params.id)
  .then(flight =>{
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() =>{
      res.redirect('/flights/'+req.params.id)
    })
  })
}


export{
  index,
  newFlight as new,
  create,
  show,
  deleteFlight as delete,
  edit,
  update,
  addTickets,
  addMeal
}