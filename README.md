# arduino-node-server

Control a string of WS2812 LEDs (Neopixels) from anywhere in the world using a WiFi capable arduino and a website! The website has a UI to control your strip of LED and it serves an API to talk to the arduinos and any application you want!

## Description

***Tech used:*** HTML, CSS, JavaScript, NodeJS, Express, Heroku, MongoDB, Arduino, WifiNina
This project is a full-stack web application using a NodeJS server hosted on Heroku. It has a web interface where you can build a sequence of pre-built animations for your LEDs. It serves an API with the data on the sequences you create. This API is used to communicate with arduino clients or any other application you desire. Together the web interface and the API allow you to control your LEDs from anywhere.

This application also interacts with a MongoDB database where it stores information about the animation sequences, and the connected devies. This project does NOT allow for remote programming of the arduinos.

## Getting Started with Controlling a Strip of LEDs

### Materials needed

- Arduino IDE (latest version)
- Arduino Uno WiFi Rev 2 (only tested on this device for now)
  - Wifi NiNA Library
  - Updated firmware to the latest version
      1. Check the current version with [this](https://www.arduino.cc/en/Tutorial/CheckWiFi101FirmwareVersion)
      2. Update to the latest version with [this](https://www.arduino.cc/en/Tutorial/WiFiNINAFirmwareUpdater)

### Installing

- Clone this repository
- Flash the .ino file to the arduino
- npm install the server
- (Any modifications needed to be made to files/folders)

### Executing program

- (How to run the program)
- (Step-by-step bullets)

    ```
    code blocks for commands

    ```

### Help

- (Any advise for common problems or issues.)

    ```
    command to run if program contains helper info

    ```

# Design

## Mission Statement

This project aims to create a web application that a single Arduino device can communicate with. It will allow the arduinos to retrieve information about RGB led so it can be executed. It needs to be accessible from any web browser or application in the world.

## What is the problem?

A way to control a string of Neopixels remotely from anywhere in the world using the internet and an arduino Wi-Fi capable arduino

### Relevant Context

- Convenient way to have Internet controlled RGB LED lights that you can control via a a web interface
- University or highschool that courses teach Internet of Things
- Commercial and Industrial needs for displaying LED signs and controlling lighting based on data
- (Define circumstances. State the purpose. Define value of solution)

### Why this project?

- Create my own IoT Dashboard to manage my home LED strings.
- Create real application that microcontrollers can use

## Customers & Stakeholders

- Makers and tinkerer's
- IoT people
- Future employers

### Customer & Design connection

### What challenges must be overcome

Machine-to-Human Interaction

- Arduinos can interact with and securely connect to the server to download data
- Dashboard that humans can use to view control the LED and preview them

    Human-to-Machine Interaction

- Humans can a dashboard use to send data and commands to arduino

    Machine-to-Machine Interaction

- Arduinos can send data and commands to each other.

### How does the customer interact?

- Human customer must NOT write code in the dashboard. Human should be able to control their arduino through the use of buttons, sliders, inputs, and forms.
- Programming of the Arduino is to be done separately using the Arduino IDE
- Humans can use the dashboard to set up new devices and connect them together using a simple API key.

### What technologies and knowledge must be understood to solve the problem?

- What is the internet?
- HTML. CSS. JS
- Arduino
- APIs
- Servers
- Scripting
- Databases

### Risks that could lead to failure

- The server and arduinos are incompatible in their communication standards
- User doesn't know how to program an arduino

### Ethical dilemmas

- Data privacy and storage

### Desired Result

- Acceptance tests

## Architecture

### System Overview

- Front-end
    - HTML, CSS, JS
- Back-End
    - NodeJS and Express
- API - CRUD
    - Create
        - Create a new device
        - Create a new animation for a device
    - Read
        - Arduino reads the animations for its device numner
        - UI reads the animations for a set device
    - Update
        - Change the animation details
    - Delete
        - Remove a device
        - Remove an animation

### Plan

- Plan the most basic API( get the neopixels to Blink)
- Any questions that come up, write them down and update them with the answer when resolved
- Heavily document code to allow easy understanding and use
- Push to git everyday

## Authors

Diego Espinoza Rodriguez (diespinoza)

## Version History

- 0.0
    - Project Creation

## License

This project is licensed under the [NAME HERE] License - see the [LICENSE.md](http://license.md/) file for details

## Acknowledgments

Inspiration, code snippets, etc.
