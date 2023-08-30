const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  module: {
    type: Number,
    required: true
  },
  questionNo: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctOptionIndex: {
    type: Number,
    required: true
  }
},{timestamps:true});

const Quiz = mongoose.model('Quiz', quizSchema);

export {Quiz};

