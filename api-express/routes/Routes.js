import express from "express";
import {
  getData,
  getDataById,
  saveData,
  updateData,
  deleteData,
} from "../controllers/DataController";

const router = express.Router()

router.get('/data', getData)
router.get('/data/:id', getDataById)
router.post('/data', saveData)
router.patch('/data/:id', updateData)
router.delete('/data/:id', deleteData)

export default router