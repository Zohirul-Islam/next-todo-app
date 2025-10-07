const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
        description:{
        type:String,
        require:true
    },
        isCompleted:{
        type:Boolean,
        default:false
    },

},{timestamps:true})

const TodoModel =mongoose.models.todo || mongoose.model("todo",schema);
export default TodoModel