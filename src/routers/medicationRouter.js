import express from 'express';
import { getAllMedicationsController } from '../controllers/medication/getAllMedicationsController.js';
import { getMedicationByIdController } from '../controllers/medication/getMedicationByIdController.js';
import  createMedicationController  from '../controllers/medication/createMedicationController.js';
import { deleteMedicationController } from '../controllers/medication/deleteMedicationController.js';
import { updateMedicationController } from '../controllers/medication/updateMedicationController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);

router.get('/list', getAllMedicationsController);

router.get('/:id', getMedicationByIdController);

router.post('/', createMedicationController);

router.delete('/:id', deleteMedicationController);

router.put('/:id', updateMedicationController);

export default router;
