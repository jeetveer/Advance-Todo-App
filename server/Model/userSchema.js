const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true
    },
    notesId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notes',
            required: true
        }
    ]
    
})


//WE ARE GENERATING TOKEH HERE
userSchema.methods.generateAuthToken = async function () {
    try {
        let token12 = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // this.tokens = this.tokens.concat({ token: token12 });
        // await this.save();
        return token12;
    } catch (error) {
        console.log(error);
    }
}

const user = new mongoose.model("users", userSchema);

module.exports = user;