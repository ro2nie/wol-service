const express = require('express')
const { NodeSSH } = require('node-ssh')
const envVars = require('./env-vars.json')
const app = express()
const port = 3000
app.use(express.json())

const ssh = new NodeSSH()

app.post('/', async (req, res) => {

  if (!req || !req.body || !req.body.macAddresses || !req.body.macAddresses.length || req.body.macAddresses.length === 0) {
    res.status(400);
    res.send({ message: 'Invalid request' });
    return
  }

  try {
    const macs = req.body.macAddresses.filter(value => value.toUpperCase() !== 'FF:FF:FF:FF:FF:FF')
    if (macs) {
      await ssh.connect(envVars)

      for (let mac of macs) {
        ssh.execCommand(`./send-magic-packet.sh ${mac} 255.255.255.255`).then(result => {
          if (result.stderr) {
            console.error(`STDERR: ${result.stderr}`)
            throw new Error()
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