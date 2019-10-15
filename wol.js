const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const exec = require('child_process').exec;

app.post('/', async (req, res) => {

  if (!req || !req.body || !req.body.macAddresses || !req.body.macAddresses.length || req.body.macAddresses.length === 0) {
    res.status(400);
    res.send({ message: 'Invalid request' });
    return
  }

  try {
    const macs = req.body.macAddresses.filter(value => value.toUpperCase() !== 'FF:FF:FF:FF:FF:FF')
    if (macs) {
      for (let mac of macs) {
        exec(`wakeonlan ${mac}`, (error, stdout, stderr) => {
          if (stdout) {
            console.log('INFO:', stdout)
          }
          if (stderr) {
            console.error('ERROR:', stderr)
          }
          if (error) {
            console.error('ERROR:', error)
          }
        })
      }
      res.send({ message: 'Success' })
    }
  } catch (error) {
    res.status(400);
    res.send({ message: 'Invalid request' });
    return
  }
})

app.listen(port, () => console.log(`WOL service listening on port ${port}!`))