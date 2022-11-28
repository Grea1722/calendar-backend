const { Schema, model} = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    notes: {
        type:String,
    },
    start:{
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EventoSchema.method('toJSON',function(){
    const {_v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Event',EventoSchema);