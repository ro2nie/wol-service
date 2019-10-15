const express = require('express')
const wol = require('wake_on_lan')
const app = express()
const port = 3000
app.use(express.json())

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
        await wol.wake(mac, { address: "255.255.255.255" }, (error) => {
          if (error) {
            console.log('ERROR', mac)
            // handle error
          } else {
            // done sending packets
            console.log('SUCCESS', mac)
          }
        });
      }
      res.send({message: 'Success'})
    }
  } catch (error) {
    res.status(400);
    res.send({ message: 'Invalid request' });
    return
  }
})

app.listen(port, () => console.log(`WOL service listening on port ${port}!`))