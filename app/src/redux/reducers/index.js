import { combineReducers } from 'redux';
import {authReducer} from "./auth";
import {auctionReducer} from "./auction";
import {auctionTypeReducer} from "./auctionType";
import {detailsAuctionReducer} from "./detailsAuction";
import {SIGNOUT_REQUEST} from "../actions/auth";
import storage from 'redux-persist/lib/storage';
import {uiReducer} from "./ui";
import {myAuctionsReducer} from "./myAuctions";
import {avatarReducer} from "./avatar";
import {tokenReducer} from "./token";
import {apartmentReducer} from "./apartment";
import {messagesReducer} from "./messages";
import {statisticsReducer} from "./statistics";
export const reducers = combineReducers({
    authData: authReducer,
    auction : auctionReducer,
    auctionType : auctionTypeReducer,
    activeAuction: detailsAuctionReducer,
    ui: uiReducer,
    myAuctions : myAuctionsReducer,
    avatar: avatarReducer,
    token : tokenReducer,
    apartment: apartmentReducer,
    messages:messagesReducer,
    statistics: statisticsReducer,
});


export const rootReducer = (state, action) => {
    console.log(action.type);
    if (action.type === SIGNOUT_REQUEST) {
        // for all keys defined in your persistConfig(s)
        storage.removeItem('root');
        // storage.removeItem('persist:otherKey')
        //persistStore(store).purge();
       // persistStore(store).purge().then((res)=>{
         //   console.log(res);
        //})
        state = undefined;
    }
        return reducers(state, action)

};