require('dotenv').config()

const cors = require('cors')
const express = require('express')
const { MongoClient } = require('mongodb')
const createComplaintsRouter = require('./routes/complaints')

const app = express()
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CivicComplaint API is running',
  })
})

async function startServer() {
  let mongoClient
  try {
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set. Add it to backend/.env before starting the API.')
    }

    mongoClient = new MongoClient(mongoUri)
    await mongoClient.connect()
    const database = mongoClient.db()
    await database.collection('complaints').createIndex({ id: 1 }, { unique: true })
    app.use('/api/complaints', createComplaintsRouter(database))
    console.log('MongoDB connected successfully.')
    app.listen(port, () => {
      console.log(`CivicComplaint API listening on port ${port}`)
    })
  } catch (error) {
    let safeMessage = error.message
    if (mongoUri) safeMessage = safeMessage.replace(mongoUri, '[redacted MongoDB URI]')
    safeMessage = safeMessage
      .replace(/mongodb(?:\+srv)?:\/\/\S+/gi, '[redacted MongoDB URI]')
    console.error(`MongoDB connection failed: ${safeMessage}`)
    if (mongoClient) {
      try {
        await mongoClient.close()
      } catch (closeError) {
        console.error(`MongoDB client cleanup failed: ${closeError.name}`)
      }
    }
    process.exitCode = 1
  }
}

startServer()
