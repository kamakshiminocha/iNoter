const express = require('express')

const connectToMongoDB = require('./db')
const cors = require('cors')
PORT=9669;
const app = express()
connectToMongoDB()

app.use(express.json())
app.use(cors())

//Routes
app.get('/',(req,res) => {
    res.send("This is backend")
})

app.use('/users', require('./routes/users'))
app.use('/notes', require('./routes/notes'))

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})
