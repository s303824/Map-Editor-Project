const postmark = require("postmark");
const Email = require('../model/email-model')


sendEmail = async (req, res) => {
    const {email} = req.body;
    try{
    let code = Math.floor(1000000 + Math.random() * 9000000);
    const client = new postmark.ServerClient("e6e0a7f9-eaed-43f2-986c-a4a8267fef50");
    client.sendEmail({
        "From": "sean.yang@stonybrook.edu",
        "To": email,
        "Subject": "Tileslate Email Verification",
        "HtmlBody": "Your Tileslate passcode is (will expire after 10 minutes): " + code,
        "MessageStream": "outbound"
      });

      const newEmail = new Email({email: email, passcode: code})
      Email.create(newEmail)
      return res.status(200)
    }catch(error){
        return res.status(404).json({errorMessage:"Email error"});
    }
}

passcodeVerify = async (req, res) => {
    const {email, attempt} = req.body;
    try{
        const requestedEmail = await Email.findOne({ email: email });       // find email
        if(!requestedEmail){                                                // if not there, return false
            return res.status(200).json({success: false})
        }
        let check = attempt == requestedEmail.passcode                  // check passcode
        if(check){                                                      // if true, delete
            await User.findOneAndDelete({email: email}); 
        }
        return res.status(200).json(                                    // and return boolean
            {success: check}    
        )

    }catch(error){
        return res.status(404).json({errorMessage:"Email error"});
    }
}


module.exports = {
    sendEmail,
    passcodeVerify
}