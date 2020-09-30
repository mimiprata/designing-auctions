import {loginMiddleware} from "./login";
import {auctionMiddleware} from "./auction";
import {detailsAuctionMiddleware} from "./detailsAuction";
import {myAuctionsMiddleware} from "./myAuctions";
import {avatarMiddleware} from "./avatar";
import {tokenMiddleware} from "./token";
import {apartmentMiddleware} from "./apartment";
import {statisticsMiddleware} from "./statistics";

export const appMidleware = [loginMiddleware, auctionMiddleware, detailsAuctionMiddleware,
    myAuctionsMiddleware, avatarMiddleware,  tokenMiddleware, apartmentMiddleware, statisticsMiddleware];
