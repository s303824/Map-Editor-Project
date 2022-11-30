const postmark = require("postmark");
const client = new postmark.ServerClient("e6e0a7f9-eaed-43f2-986c-a4a8267fef50");

sendEmail = async (req, res) => {
    const {email, message} = req.body;
    try{
    client.sendEmail({
        "From": "sean.yang@stonybrook.edu",
        "To": email,
        "Subject": "Tileslate Email Verification",
        "HtmlBody": "<strong>Hello</strong> dear user.",
        "TextBody": message,
        "MessageStream": "outbound"
      });
      return res.status(200);
    }catch(error){
        return res.status(404).json({errorMessage:"Email error"});
    }
}

module.exports = {
    sendEmail
}