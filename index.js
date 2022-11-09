const express = require('express')
const req = require('express/lib/request')

const app = express()

app.use(express.static('views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let events = {}


app.post('/events',(req,res)=>{
	const id = `event_${Date.now()}_${Math.random()}`
	const newEvent = {
		id,
		...req.body
	};
	events[id] = newEvent
	res.send(id)
})

app.get('/events/:id',(req,res)=>{
	const event = events[req.params.id]
	if(event === undefined){
		res.status(404).send('error')
	}else{
		res.send(event)
	}

})


app.put('/events/:id',(req,res)=>{
	const event = events[req.params.id]
	if(event === undefined){
		res.status(404).send('error')
	}else{
		const updatedEvent = req.body
		events[req.params.id]  = updatedEvent
		res.send(updatedEvent)
	}
})


app.delete('/events/:id',(req,res)=>{
	const event = events[req.params.id]
	if(event === undefined){
		res.status(404).send('error page not found')
	}else{
		delete events[req.params.id]
		res.send()
	}
})












app.listen(process.env.PORT,(err)=>{
	err ? console.log('error'): console.log(`listenning  ${process.env.PORT}`)
})