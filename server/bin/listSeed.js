require("dotenv").config();

const Card = require("../api/card/card.model")
const mongoose = require('mongoose')
const List = require("../api/list/list.model")

mongoose.connect(process.env.MONGODB_URI)

const list = [  
{ title: 'Objetivo más importante de Pepe'}  
]

List.create(list, (err, arrayList) => {
  if(err){
    throw err;
  }
  console.log('Se ha añadido una lista')
  const cards = [ {
    title: 'carta1',
    description: 'blablabla',
  dueDate: new Date,
  position: 0,
  list: arrayList[0]._id}
  ]
  Card.create(cards, (err, arrayCard) => {
    if(err){
      throw err;
    }
    console.log("Se ha añadido una carta")
    arrayList[0].update({$push:{cards:arrayCard[0]._id}}).then(() => mongoose.connection.close())
    // List.findByIdAndUpdate(arrayList[0]._id,{$push:{cards:arrayCard[0]._id}})
    // .then(() => mongoose.connection.close())
    
  })
  

})