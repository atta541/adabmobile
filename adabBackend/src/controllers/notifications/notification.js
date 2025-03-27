const admin = require("../../../firebase");  

async function sendNotificationToDevice(deviceToken, title, body) {  
  const message = {  
    notification: {  
      title: title,  
      body: body,  
    },  
    data: { name: "CODE_CATY" },  
    token: deviceToken, // FCM device token  
  };  

  try {  
    const response = await admin.messaging().send(message);  
    console.log("Notification sent successfully:", response);  
  } catch (error) {  
    console.error("Error sending notification:", error);  
  }  
}  
module.exports = sendNotificationToDevice;


  // added