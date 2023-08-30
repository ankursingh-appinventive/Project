const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submissionText: {
    type: String,
    required: true
  }
},{timestamps:true});

const AssignmentSubmission = mongoose.model('AssignmentSubmission', submissionSchema);

export {AssignmentSubmission};

