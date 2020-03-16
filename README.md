
## 📃 Idea in brief: Question to be resolved and why

Track each user to detect the GPS position on a map (google).
Also track sick users and history location.

check https://github.com/jorgelaranjo/resources/blob/patch-1/software/proposals/whereamI_solution.md

### 💥 Problem

This time we need to avoid as much people as we can... so we can share our location  using our phone.
Will be useful also if we add a option (simple button) to report an infection, so based on the history
we can look at potential users nearby and warn them.

This will also be very useful to see how the virus could travel.  

### 👨‍🔬Hypothesis

A simple app to track GPS (lat/lon) and push to a server or google timeline url (a bit more tricky)
to detect your daily locations. https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m2!2m1!1s2020-03

A Backend server with a frontend that uses google maps with a key to provide a user the visualization of
other users in an area (food suply, street, specific location, etc)
  

### 🤔 Assumptions

Just install the mobile app and enable the GPS sharing feature. The user needs to have a data plan 
or wifi connection. 


## 💻Implementation Suggestion

Mobile App: IONIC PWA
 - nodejs       13.2.0
 - ionic        6.2.1
 - capacitor    1.5.1
 - npm          6.13.1
 - angular      9.0.6
 - yarn         1.22.0
 
## Features .


### install
yarn

Add a google maps api key's for auth + maps + geolocation in src/environments.ts  file

### Install
yarn

### Run
ng start

### Deploy to PWA
ionic build --prod

