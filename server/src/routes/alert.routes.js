import express from 'express';
import { createAlert, getAllAlerts } from '../controllers/alert.controller.js'

const alertRoutes = (io) => {
  const router = express.Router();

  router.post('/', createAlert(io));
  router.get('/', getAllAlerts);

  return router;
};

export default alertRoutes;
