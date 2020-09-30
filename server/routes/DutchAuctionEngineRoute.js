import express from 'express';
import { DutchAuctionEngineController } from '../controllers/DutchAuctionEngineController';

const router = express.Router();

const DutchAuctionEngineCtrl = new DutchAuctionEngineController();

router.route('/createAuction')
    .post(DutchAuctionEngineCtrl.createAuction);

router.route('/addAuction')
    .post(DutchAuctionEngineCtrl.addAuction);

router.route('/getAllAuctions/:username')
    .get(DutchAuctionEngineCtrl.getAllAuctions);

router.route('/getAuction')
    .get(DutchAuctionEngineCtrl.getAuction);
router.route('/bid')
    .post(DutchAuctionEngineCtrl.bid);
router.route('/allowBidding')
    .post(DutchAuctionEngineCtrl.allowBidding);
router.route('/cancelAuction')
    .post(DutchAuctionEngineCtrl.cancelAuction);
router.route('/myAuctions/:username')
    .get(DutchAuctionEngineCtrl.getMyAuctions);

router.route('/myPastAuctions/:username')
    .get(DutchAuctionEngineCtrl.getMyPastAuctions);

router.route('/addReceipts/:username')
    .get(DutchAuctionEngineCtrl.getAddReceipts);

router.route('/bidReceipts/:username')
    .get(DutchAuctionEngineCtrl.getBidReceipts);
 export default router;