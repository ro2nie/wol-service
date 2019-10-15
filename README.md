# Description
This is a small node express app, that allows you to send WOL packets to nodes in your network.
I personally use this app in one of my raspberry PIs to wake my NAS with Tasker from my phone. When any of the photos in the phone exceed an age of 1 month, tasker calls the HTTP endpoint which wakes the NAS. It then waits until it is awake, and lastly, it copies over all those photos that are greater than 1 month in age.

# Running on docker

Run `docker build -t wol-service .` and then run it with `docker run --name wol-service --network host -d --restart=always wol-service`

NOTE: `network --host` is used so that the magic packet can make it out onto the same network that the host is running on.

Alternatively you can use docker compose by running `docker-compose build` later followed by `docker-compose up -d`
