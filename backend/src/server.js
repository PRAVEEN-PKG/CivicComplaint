require('dotenv').config()

const cors = require('cors')
const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CivicComplaint API is running',
  })
})

app.listen(port, () => {
  console.log(`CivicComplaint API listening on port ${port}`)
})
