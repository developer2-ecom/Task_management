
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  
},
},{
  versionKey:false
});

const Task = mongoose.model('Task', taskSchema);


module.exports={Task}
