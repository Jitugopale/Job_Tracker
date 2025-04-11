import express from 'express'
import {
    AddJobController,
    UpdateJobController,
    DeleteJobController,
    GetAllJobsController,
  } from '../controllers/JobtrackerController.js';
  
  const router = express.Router();
  
  router.post('/add', AddJobController);
  router.get('/getAll', GetAllJobsController);
  router.put('/update/:id', UpdateJobController);
  router.delete('/delete/:id', DeleteJobController);
  
  export default router;