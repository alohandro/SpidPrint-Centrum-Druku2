// netlify/functions/send-email.js
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    const { orderData, paymentMethod } = JSON.parse(event.body);

    const msg = {
        to: 'xclusivestoreofficial@gmail.com',
        from: 'no-reply@spidprint.com',
        subject: 'New Order Notification',
        text: `New order received: 
        Name: ${orderData.firstName} ${orderData.lastName}
        Email: ${orderData.email}
        Phone: ${orderData.phone}
        Address: ${orderData.address}, ${orderData.city}, ${orderData.postalCode}
        Payment Method: ${paymentMethod}`,
    };

    try {
        await sendgrid.send(msg);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email' }),
        };
    }
};
