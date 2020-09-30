import {apiEndpoint} from "./config";


export const API = {
        CREATE_ENGLISH_AUCTION : (username) =>  `${apiEndpoint}/english/addAuction?username=${username}`,
        CREATE_DUTCH_AUCTION : (username) =>   `${apiEndpoint}/dutchAuction/addAuction?username=${username}`,
        CREATE_SEALED_BID_AUCTION : (username) => `${apiEndpoint}/sealedBid/addAuction?username=${username}`,

        APPROVE_CONTRACT: `${apiEndpoint}/token/approve`,

        START_REVEALING_PERIOD: `${apiEndpoint}/sealedBid/startReveal`,
        END_REVEALING_PERIOD : `${apiEndpoint}/sealedBid/endReveal`,
        CANCEL_SEALED_BID_AUCTION : `${apiEndpoint}/sealedBid/cancel`,
        FINALIZE_SEALED_BID_AUCTION : `${apiEndpoint}/sealedBid/finalize`,
        REVEAL_SEALED_BID_AUCTION: `${apiEndpoint}/sealedBid/reveal`,
        HAS_REVEALED :  (username, auctionId)=>`${apiEndpoint}/sealedBid/reveals?username=${username}&auctionId=${auctionId}`,
        HAS_FINALIZED_SEALED_BID :  (username, auctionId)=>`${apiEndpoint}/sealedBid/hasFinalized/?username=${username}&auctionId=${auctionId}`,

        CANCEL_DUTCH_AUCTION:`${apiEndpoint}/dutchAuction/cancelAuction`,
        CANCEL_ENGLISH_AUCTION:`${apiEndpoint}/english/cancel`,
        END_ENGLISH_AUCTION: `${apiEndpoint}/english/end`,
        FINALIZE_ENGLISH_AUCTION: `${apiEndpoint}/english/finalize`,
        HAS_FINALIZED_ENGLISH:  (username, auctionId)=>`${apiEndpoint}/english/hasFinalized/?username=${username}&auctionId=${auctionId}`,

        DUTCH_ACTIVE_AUCTIONS : (username) => `${apiEndpoint}/dutchAuction/getAllAuctions/${username}`,
        ENGLISH_ACTIVE_AUCTIONS : (username) =>  `${apiEndpoint}/english/getAllAuctions/${username}`,
        SEALED_BID_ACTIVE_AUCTIONS :  (username) => `${apiEndpoint}/sealedBid/getAllAuctions/${username}`,

        ENGLISH_AUCTION :(username, auctionId)=> `${apiEndpoint}/english/getAuction?username=${username}&auctionId=${auctionId}`,
        DUTCH_AUCTION :(username, auctionId)=> `${apiEndpoint}/dutchAuction/getAuction?username=${username}&auctionId=${auctionId}`,
        SEALED_BID_AUCTION :(username, auctionId)=> `${apiEndpoint}/sealedBid/getAuction?username=${username}&auctionId=${auctionId}`,

        BID_ENGLISH_AUCTION: `${apiEndpoint}/english/bid`,
        BID_DUTCH_AUCTION: `${apiEndpoint}/dutchAuction/bid`,
        BID_SEALED_BID_AUCTION: `${apiEndpoint}/sealedBid/bid`,

        ENGLISH_BID_FOR_CURRENT_USER: (username, auctionId) =>`${apiEndpoint}/english/getMyBid?username=${username}&auctionId=${auctionId}`,
        SEALED_BID_FOR_CURRENT_USER: (auctionId, username) => `${apiEndpoint}/sealedBid/getMyHash?username=${username}&auctionId=${auctionId}`,
        SEALED_BID_VALUE_FOR_CURRENT_USER: (auctionId, username) => `${apiEndpoint}/sealedBid/getMyBid?username=${username}&auctionId=${auctionId}`,
        MY_ENGLISH_AUCTIONS: (username) => `${apiEndpoint}/english/myAuctions/${username}`,
        MY_DUTCH_AUCTIONS: (username) => `${apiEndpoint}/dutchAuction/myAuctions/${username}`,
        MY_SEALED_BID_AUCTIONS: (username) => `${apiEndpoint}/sealedBid/myAuctions/${username}`,

        MY_PENDING_SEALED_BID_AUCTIONS : (username) => `${apiEndpoint}/sealedBid/getMyPendingAuctions/${username}`,
        MY_PAST_DUTCH_AUCTIONS: (username) => `${apiEndpoint}/dutchAuction/myPastAuctions/${username}`,
        MY_PENDING_ENGLISH_AUCTIONS: (username)=>`${apiEndpoint}/english/myPendingAuctions/${username}`,


        TOKEN_DETAILS : (username, tokenId) => `${apiEndpoint}/token/getToken?username=${username}&tokenId=${tokenId}`,
        MY_TOKENS : (username) => `${apiEndpoint}/token/myTokens/${username}`,
        MY_BALANCE : (username) => `${apiEndpoint}/token/getBalance/${username}`,

        HISTORY_ENGLISH_BIDS: (auctionId) => `${apiEndpoint}/english/allBids/${auctionId}`,
        HISTORY_SEALED_BIDS: (auctionId) => `${apiEndpoint}/sealedBid/allBids/${auctionId}`,

        ADD_DUTCH_RECEIPTS : (username) => `${apiEndpoint}/dutchAuction/addReceipts/${username}`,
        BIDS_DUTCH_RECEIPTS : (username) => `${apiEndpoint}/dutchAuction/bidReceipts/${username}`,
        ADD_ENGLISH_RECEIPTS : (username) => `${apiEndpoint}/english/addReceipts/${username}`,
        BIDS_ENGLISH_RECEIPTS : (username) => `${apiEndpoint}/english/bidReceipts/${username}`,
        ADD_SEALED_BID_RECEIPTS : (username) => `${apiEndpoint}/sealedBid/addReceipts/${username}`,
        BIDS_SEALED_BID_RECEIPTS : (username) => `${apiEndpoint}/sealedBid/bidReceipts/${username}`,

        VERIFY_SEALED_BID_OFFER : `${apiEndpoint}/verify/check`,

        APARTMENT_DETAILS : (username, tokenId) => `${apiEndpoint}/apartment/getToken?username=${username}&tokenId=${tokenId}`,
        MY_APARTMENTS : (username) => `${apiEndpoint}/apartment/myTokens/${username}`,
        APPROVE_CONTRACT_APARTMENT: `${apiEndpoint}/apartment/approve`,

        LOGIN: `${apiEndpoint}/auth/login`,
        LOGOUT: `${apiEndpoint}/auth/logout`,
        AVATAR: (user) =>`${apiEndpoint}/myAvatars/${user}`,
        USER_FROM_ADDRESS : (account_address) => `${apiEndpoint}/auth/user/${account_address}`
};