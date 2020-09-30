import express from 'express';
import { AdorableTokenController } from '../controllers/AdorableTokenController';

const router = express.Router();

const AdorableTokenCtrl = new AdorableTokenController();
router.route('/createTokenStore')
    .post(AdorableTokenCtrl.createAdorableToken);

router.route('/addToken')
    .post(AdorableTokenCtrl.addToken);

router.route('/getToken')
    .get(AdorableTokenCtrl.getTokenDetails);

router.route('/getApprovedFor')
    .get(AdorableTokenCtrl.getApprovedForToken);

router.route('/approve')
    .post(AdorableTokenCtrl.approveToken);

router.route('/ownerOf')
    .get(AdorableTokenCtrl.getOwnerOf);

router.route('/myTokens/:username')
    .get(AdorableTokenCtrl.getMyTokens);

router.route('/cancelApproval')
    .post(AdorableTokenCtrl.cancelApproval);

router.route('/getBalance/:username')
    .get(AdorableTokenCtrl.getBalance);

export default router;