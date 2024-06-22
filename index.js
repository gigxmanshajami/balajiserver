// this is the sevrer code to send the messgae to the admin application using tokens of fcm 
const express = require('express');

var admin = require("firebase-admin");

var messaging = require('firebase-admin/messaging');

const cors = require("cors");

var serviceAccount = require('./webvelop-balajihotel-firebase-adminsdk-c4ai9-e24095abf5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);
app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);
app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.post("/send", function (req, res) {
    const receivedToken = req.body.fcmToken || "dpcOuOtpRJ6h6g8u8r7Cgz:APA91bFJ9l_lpYLbdB1JmVjfLYG5ePsYOih0g2R1HwlOTwE6lbh6N1Amb0r4k8Dm1LRhf5EuOlrLlgJvVZIbgzzFEPb-RB8_k9XVjcr_WHWAJeneVXNb-YqYaD0w1LybSIxF6ejCmUkp";

    const message = {
        notification: {
            title: 'New Order Arrived!',
            body: `A new order has been placed.`,
        },
        token: "dpcOuOtpRJ6h6g8u8r7Cgz:APA91bFJ9l_lpYLbdB1JmVjfLYG5ePsYOih0g2R1HwlOTwE6lbh6N1Amb0r4k8Dm1LRhf5EuOlrLlgJvVZIbgzzFEPb-RB8_k9XVjcr_WHWAJeneVXNb-YqYaD0w1LybSIxF6ejCmUkp"
    };

    messaging.getMessaging()
        .send(message)
        .then((response) => {
            res.status(200).json({
                message: "Successfully sent message",
                token: receivedToken,
            });
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            res.status(400);
            res.send(error);
            console.log("Error sending message:", error);
        });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});