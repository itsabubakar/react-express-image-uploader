const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

app.use(fileUpload())
app.use(cors())

// upload end point
app.post('/upload', (req, res) => {
    // return res.status(200)
    if (req.files === null) res.status(400).json({ msg: 'No file uploaded' })


    const file = req.files.file

    file.mv(`${__dirname}/client/public/assets/${file.name}`, err => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/assets/${file.name}` })
    })
})

app.listen(3500, () => console.log('Server started'))