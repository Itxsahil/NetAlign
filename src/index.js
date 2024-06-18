import 'dotenv/config'
import connectDB from './configs/db.config.js'
import { app } from './app.js'

connectDB()
    .then(app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`)
    }))
    .catch(err => console.error(err))