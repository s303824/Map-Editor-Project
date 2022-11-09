const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema(
    {
        first_name: {             // first name of the user
            type: String, 
            required: true,
            maxlength: 100
        },
        last_name: {              // last name of the user
            type: String,
            required: true,
            maxlength: 100
        }, 
        liked_projects: [{type: Schema.Types.ObjectId, ref: 'MapInfo'}], //type: array - list of maps liked by the user\
        disliked_projects: [{type: Schema.Types.ObjectId, ref: 'MapInfo'}], //type: array - list of maps disliked by the user
    
        myprojects: [{type: Schema.Types.ObjectId, ref: 'Map'}],  //type: array  -        list of maps created by the user 
    
        passwordHash: {               // password of the user
            type: String,
            required: true,
            minlength: 8
        },
        profile_picture: {     // image will be stored in cloudinary, and link to the image 
            type: String       // will be stored in the database
        },
    
        publishedMaps: [String],  //type: array - list of user’s published maps
        
        email: {             // Email account of the user
            type: String,
            required: true,
        maxlength: 100,
        unique: true
        },
        username: {              // user name of the user
            type: String,
            required: true,
            maxlength: 100,
        unique: true
        }
  }
)

module.exports = mongoose.model('User', userSchema)
