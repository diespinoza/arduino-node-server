# arduino-node-server

Full-stack application built using node. Designed for 30+ arduinos to communicate at the same time, to upload/download data from a database, to send commands to each other.

## Description

This project aims to create a full-stack web application using nodeJS server-side, and HTML, CSS, and JS client-side. The project will allow the arduinos to send data online so it can be stored, retrieved later, and plotted inside a dashboard. 

Arduino devices will also be able to communicate with each other. The server will allow human users to view data and control their arduino. The server will store data about the connected arduinos, including any data and commands uploaded. This web application is designed for a wifi-capable Arduinos. This project will NOT allow for remote programming of the arduinos.

## Getting Started

### Dependencies

- Node and npm
- Arduino IDE
- Arduino with WiFi capabilities
- (Describe any prerequisites, libraries, OS version, etc., needed before installing program.)
- TODO

### Installing

- Clone this repository
- (How/where to download your program)
- (Any modifications needed to be made to files/folders)
- TODO

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
\
&nbsp;


# Design

## Mission Statement

This project aims to create a web application that 30+ Arduinos devices can communicate with the server simultaneously. It will allow the arduinos to send data online so it can be stored, retrieved later, and plotted inside a dashboard. It needs to be accessible from any web browser or application in the world.

## What is the problem?

Creating a web application that can be accessed from anywhere, can manage user profiles, contains a dashboard, can control arduino devices.

### Relevant Context

- University or highschool courses teach Internet of Things or distributed networks or work from home
- Commercial and Industrial needs for collecting data from sensors distributed throughout a city
- (Define circumstances. State the purpose. Define value of solution)

### Why this project?

- Create my own IoT Dashboard to manage my home devices.
- Create real application that microcontrollers can use
- Application I can present on my portfolio
- Challenge myself

## Customers & Stakeholders

- Makers and tinkerer's
- IoT people
- Future employers

### Customer & Design connection

### What challenges must be overcome

Machine-to-Human Interaction

- Arduinos can interact with and securely connect to the server to upload data
- Dashboard that humans can use to view data

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
    - NodeJS

### Plan

- Build from the ground up
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
