const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type:String,
        required: [true,"Please add name value"]
    },
    email:{
        type: String,
        required: [true, "Please provide email value"]
    },
    phone:{
        type: String,
        required: [true, "Please provide phone value"]
    }
},{
    timestamps: true
}
);

module.exports = mongoose.model('Contact',contactSchema);