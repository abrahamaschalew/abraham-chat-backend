# Abraham-Chat Backend

> Simple real time chat appliction using node js & angular

---

[Live Demo](https://github.com/abrahamaschalew/abraham-chat-backend.git)

- [Description](#description)
- [How To Use](#how-to-use)
- [References](#api-reference)
- [License](#license)
- [Author Info](#author-info)

## Description

> Abraham-Chat is a chat application that perform in two partys can cominicate in real time connectionn. The project also include authnication & mongoDB collection to store user data & messages.

#### Technologies

- Node Js
- MongoDB
- Angular 11

## How To Use

### Installation

#### Backend Installation

```bash
    git clone https://github.com/abrahamaschalew/abraham-chat-backend.git abraham-chat-backend
    cd abraham-chat-backend
    npm i
    npm start
```

#### Front-end(Angular) Installation

```bash
    sudo npm i -g @angular/cli
    git clone https://github.com/abrahamaschalew/abraham-chat-backend.git abraham-chat-frontend
    cd abraham-chat-frontend
    npm i
    ng serve --open

```

##### Config
- Windows
> set mongoURL = "mongodb://localhost:27017/abraham-chat"
- Liux or Mac
> export mongoURL = "mongodb://localhost:27017/abraham-chat"

> Head over to [https:/localhost:4200](https:/localhost:4200)

#### API Reference

> URL http://localhost:5000

##### Register

###### Method

> POST /api/register

Body

```json
{
  "username": "abraham",
  "password": "abraham",
  "email": "fake@gmail.com"
}
```

###### Success Response

- Code: 200
- contenet

```json
{
  "msg": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCIkpXVCJ9..."
}
```

##### Login

###### Method

> POST /api/login

Body

```json
{
  "username": "abraham",
  "password": "abraham"
}
```

###### Success Response

- Code: 200
- contenet

```json
{
  "msg": "You are logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCIkpXVCJ9..."
}
```

##### Get Sent Messages

###### Method

> Get /api/messages

###### Success Response

- Code: 200
- contenet

```json
  [
    {
        "_id": "604d09c9735f480bec82ab43",
        "sender": "Abraham",
        "type": "Sent Message",
        "message": "Hi !",
        "createdAt": "2021-03-13T18:51:53.657Z",
        "updatedAt": "2021-03-13T18:51:53.657Z"
    },
    ...
  ]
```

##### Web Socket Client

```js
const webSocket = new WebSocket("ws://localhost:5000");
webSocket.onopen = function () {
  // Web Socket is connected
};

webSocket.onmessage = function (evt) {
  console.log(typeof evt.data)
  let received_msg = JSON.parse(evt.data);

  console.log("Message is received...");
  console.log(received_msg);

  // the server response different types of response the first one is authnicate
  if (received_msg.type == "register") {
    webSocket.send(JSON.stringify({
      type: "register_response",
      token: `Bearer ${localStorage.getItem("access_token")}`,
    }));

    // access_token is come from login api or register api after you receive you have to store the token some where to use it again. In this case we use localStorage
  }

  if (received_msg.type == "message") {
    // Incoming Message
    console.log(`Incoming Message`);
    console.log(received_msg)
  }

  if (received_msg.type == "onlineUsers") {
    // Incoming Message
    console.log(`User online status changed`);
    console.log(received_msg)
  }

  if (received_msg.type == "typing") {
    // Incoming Message
    console.log(`User is typing`);
    console.log(received_msg);
  }


  // if you want to send to other users message
  webSocket.send(JSON.stringify({
      type: "message",
      token: `Bearer ${localStorage.getItem("access_token")}`,
      message: "Your Message"
    }))
};

webSocket.onclose = function () {
  // websocket is closed.
  console.log("Connection is closed...");
};
```

[Back To The Top](#abraham-chat-backend)

#### [License](https://abrahamaschalew.com)

## Author Info

- Twitter - [@AschalewAbraham](https://twitter.com/aschalewabraham)
- Website - [Abraham Aschalew](https://abrahamaschalew.com)

[Back To The Top](#abraham-chat-backend)
