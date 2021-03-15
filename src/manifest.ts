export default {
    limiter:30,
    title: "Paróquia São Joaquin",
    email: "luanstaner.apps@gmail.com",
    baseUrlFrontEnd:  process.env.BASE_URL_FRONT_END,
    auth:{
        sendgrid: {
            user: "apikey",
            pass: process.env.PASS_SENDGRID
        }
    }
}