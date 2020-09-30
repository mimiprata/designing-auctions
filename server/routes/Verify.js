import express from 'express';
import { VerifyController } from '../controllers/VerifyController';

const router = express.Router();

const VerifyCtrl = new VerifyController();

router.route('/createContract')
    .post(VerifyCtrl.createVerify);

router.route('/check')
    .post(VerifyCtrl.verifyAuction);
export default router;