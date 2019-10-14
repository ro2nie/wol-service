const express = require('express')
const wol = require('wol')
const app = express()
const port = 3000
app.use(express.json())

app.post('/', async (req, res) => {

  if (!req || !req.body || !req.body.macAddresses || !req.body.macAddresses.length || req.body.macAddresses.length === 0) {
    res.status(400);
    res.send({ message: 'Invalid request' });
    return
  }

  let successes = []

  try {
    const macs = req.body.macAddresses.filter(value => value !== 'FF:FF:FF:FF:FF:FF') //Remove broadcast mac

    if (macs) {      
      for (let mac of macs) {
        await wol.wake(mac, (err, res) => {
          if (err) {
            console.error(err)
          } else {
            successes.push(mac)
          }
        });
      }
      res.send({ successes })
    }
  } catch (error) {
    res.status(400);
    res.send({ message: 'Invalid request' });
    return
  }
})

app.listen(port, () => console.log(`WOL service listening on port ${port}!`))