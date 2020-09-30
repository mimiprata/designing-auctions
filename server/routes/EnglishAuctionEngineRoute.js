import express from 'express';
import { EnglishAuctionEngineController } from '../controllers/EnglishAuctionEngineController';

const router = express.Router();

const EnglishAuctionEngineCtrl = new EnglishAuctionEngineController();

router.route('/createAuction')
    .post(EnglishAuctionEngineCtrl.createAuction);

router.route('/addAuction')
    .post(EnglishAuctionEngineCtrl.addAuction);

router.route('/getAllAuctions/:username')
    .get(EnglishAuctionEngineCtrl.getAllAuctions);

router.route('/getAuction')
    .get(EnglishAuctionEngineCtrl.getAuction);

router.route('/myAuctions/:username')
    .get(EnglishAuctionEngineCtrl.getMyAuctions);

router.route('/bid')
    .post(EnglishAuctionEngineCtrl.bid);


router.route('/cancel')
    .post(EnglishAuctionEngineCtrl.cancelAuction);

router.route('/end')
    .post(EnglishAuctionEngineCtrl.endAuction);

router.route('/finalize')
    .post(EnglishAuctionEngineCtrl.finalizeAuction);

router.route('/allBids/:auctionId')
    .get(EnglishAuctionEngineCtrl.getBids);

router.route('/getMyBid')
    .get(EnglishAuctionEngineCtrl.getMyBid);

router.route('/hasFinalized')
    .get(EnglishAuctionEngineCtrl.hasFinalized);
router.route('/myPendingAuctions/:username')
    .get(EnglishAuctionEngineCtrl.getMyPendingAuctions);

router.route('/getAllFinalized')
    .get(EnglishAuctionEngineCtrl.getAllFinalized);

router.route('/addReceipts/:username')
    .get(EnglishAuctionEngineCtrl.getAddReceipts);

router.route('/bidReceipts/:username')
    .get(EnglishAuctionEngineCtrl.getBidReceipts);

router.route('/verify/:blockNr')
    .get(EnglishAuctionEngineCtrl.verifyTrans);
router.route('/addAuctionApartment')
    .post(EnglishAuctionEngineCtrl.addAuctionApartament);

export default router;