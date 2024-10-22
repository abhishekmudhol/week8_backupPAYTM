const express = require("express");
const cors = require('cors');
const apiRouter = require("./routes/index");
const PORT = 5000 || process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1' , apiRouter )

app.all('*' , (req,res)=>{
    res.status(404).json({
        message : 'Route is not found'
    })
})

app.listen(PORT , ()=>{
    console.log(`paytm server is running on port ${PORT}`);
})