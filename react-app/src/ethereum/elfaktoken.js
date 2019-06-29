import web3 from "../services/web3";
import ELFAKtoken from './ELFAKtoken.json';
import Addresses from './TokenAddresses';

export default () => {
   return new web3.eth.Contract(
       JSON.parse(ELFAKtoken.interface), Addresses.ELFAKtoken
   );
};