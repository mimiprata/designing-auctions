import express from 'express';
import { ApartmentController } from '../controllers/ApartmentController';

const router = express.Router();

const ApartmentCtrl = new ApartmentController();
router.route('/createTokenStore')
    .post(ApartmentCtrl.createAdorableToken);

router.route('/addToken')
    .post(ApartmentCtrl.addToken);

router.route('/getToken')
    .get(ApartmentCtrl.getTokenDetails);

router.route('/getApprovedFor')
    .get(ApartmentCtrl.getApprovedForToken);

router.route('/approve')
    .post(ApartmentCtrl.approveToken);

router.route('/ownerOf')
    .get(ApartmentCtrl.getOwnerOf);

router.route('/myTokens/:username')
    .get(ApartmentCtrl.getMyTokens);

export default router;