import express from 'express';


import avatarsMiddleware from 'adorable-avatars';

import adorableToken from './AdorableTokenRoute';
import dutchAuctionEngine from './DutchAuctionEngineRoute';
import sealedBidAuctionEngine from './SealedBidAuctionEngineRoute';
import englishAuctionEngine from './EnglishAuctionEngineRoute'
import authRoute from './AuthRoute';
import apartment from './ApartmentRoute';
import verify from './Verify'

const router = express.Router();
var VerifyToken = require('./VerifyToken');
/** GET /check-api - Check API */
router.get('/check-api', (req, res) =>
    res.send("It's working...")
);



// mount home routes at /home

router.use('/auth',authRoute );

router.use('/myAvatars', avatarsMiddleware);

router.use('/token', adorableToken);

router.use('/dutchAuction', dutchAuctionEngine);

router.use('/sealedBid', sealedBidAuctionEngine);

router.use('/english', englishAuctionEngine);

router.use('/apartment', apartment);

router.use('/verify', verify);
export default router;
