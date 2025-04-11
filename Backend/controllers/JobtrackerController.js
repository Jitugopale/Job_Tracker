import jobtracker from '../models/JobtrackerSchema.js';

export const AddJobController = async (req, res) => {
  try {
    const { company, role, link, appliedDate, status } = req.body;
    const job = new jobtracker({
      company,
      role,
      link,
      appliedDate,
      status
    });
    await job.save();
    res.status(201).json({message:"Data added Successfully",job});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateJobController = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobtracker.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({message:"Data updated Successfully",job});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteJobController = async (req, res) => {
  try {
    const { id } = req.params;
    await jobtracker.findByIdAndDelete(id);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetAllJobsController = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const jobs = await jobtracker.find(filter).sort({ appliedDate: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};