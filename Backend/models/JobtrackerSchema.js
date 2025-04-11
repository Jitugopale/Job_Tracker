import mongoose, { Schema } from 'mongoose';

const JobtrackerSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied',
  },
  appliedDate: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
  },
});

const Jobtracker = mongoose.model('jobtracker', JobtrackerSchema);
export default Jobtracker;
