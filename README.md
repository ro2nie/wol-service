Description:
This is a small node express app, that allows you to send WOL packets to nodes in your network.
I personally use this app in one of my raspberry PIs to wake my NAS with Tasker from my phone. When any of the photos in the phone exceed an age of 1 month, tasker calls the HTTP endpoint which wakes the NAS. It then waits until it is awake, and lastly, it copies over all those photos that are greater than 1 month in age.

Running on docker:

Run `docker build -t wol-service .` and then run it with `docker -p <local-port-of-choice>:3000 run -d wol-service`

Alternatively you can use docker compose by running `docker-compose build` later followed by `docker-compose up -d`