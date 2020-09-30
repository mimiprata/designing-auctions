import express from 'express';
import { SealedBidAuctionEngineController } from '../controllers/SealedBidAuctionEngineController';

const router = express.Router();

const SealedBidAuctionEngineCtrl = new SealedBidAuctionEngineController();

router.route('/createAuction')
    .post(SealedBidAuctionEngineCtrl.createAuction);

router.route('/addAuction')
    .post(SealedBidAuctionEngineCtrl.addAuction);
router.route('/getAllAuctions/:username')
    .get(SealedBidAuctionEngineCtrl.getAllAuctions);
router.route('/getAuction')
    .get(SealedBidAuctionEngineCtrl.getAuction);

router.route('/myAuctions/:username')
    .get(SealedBidAuctionEngineCtrl.getMyAuctions);

router.route('/bid')
    .post(SealedBidAuctionEngineCtrl.bid);

router.route('/startReveal')
    .post(SealedBidAuctionEngineCtrl.startReveal);

router.route('/endReveal')
    .post(SealedBidAuctionEngineCtrl.finishReveal);

router.route('/reveal')
    .post(SealedBidAuctionEngineCtrl.reveal);

router.route('/cancel')
    .post(SealedBidAuctionEngineCtrl.cancelAuction);

router.route('/finalize')
    .post(SealedBidAuctionEngineCtrl.finalizeAuction);

router.route('/getMyHash')
    .get(SealedBidAuctionEngineCtrl.getMyHash);

router.route('/getMyPendingAuctions/:username')
    .get(SealedBidAuctionEngineCtrl.getMyPendingAuctions);

router.route('/reveals')
    .get(SealedBidAuctionEngineCtrl.getReveals);

router.route('/hasFinalized')
    .get(SealedBidAuctionEngineCtrl.hasFinalized);

router.route('/addReceipts/:username')
    .get(SealedBidAuctionEngineCtrl.getAddReceipts);

router.route('/allBids/:auctionId')
    .get(SealedBidAuctionEngineCtrl.getBids);

router.route('/bidReceipts/:username')
    .get(SealedBidAuctionEngineCtrl.getBidReceipts);

router.route('/getMyBid')
    .get(SealedBidAuctionEngineCtrl.getMyBid);
export default router;