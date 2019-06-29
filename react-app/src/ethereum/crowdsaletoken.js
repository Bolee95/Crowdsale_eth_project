import web3 from "../services/web3";
import TimedTokenCrowdsale from './TimedTokenCrowdsale.json';
import Addresses from './TokenAddresses';

export default () => {
   return new web3.eth.Contract(
       JSON.parse(TimedTokenCrowdsale.interface), Addresses.TimedTokenCrowdsale
   );
};