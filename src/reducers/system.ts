import { SYSTEM } from './constants/index';

const initState = {
 dict: {},
};
const handlers = {
 [SYSTEM.SET_DICT]: (state: any, action: any) => {
  console.log(state, action);
  return { dict: action.dict };
 },
 //  [SYSTEM_DICT.SET_USERNAME]: (state: any, action: any) => {
 //   return { userName: action.userName };
 //  },
 //  [SYSTEM_DICT.SET_MAX_HP]: (state: any, action: any) => {
 //   return { playerMaxHp: action.playerMaxHp };
 //  },
 //  [SYSTEM_DICT.SET_PLAYER_BUFF]: (state: any, action: any) => {
 //   return { playerBuff: action.playerBuff };
 //  },
 //  [SYSTEM_DICT.SET_UNLOCK_SOIL]: (state: any, action: any) => {
 //   return { unlockSoil: action.unlockSoil };
 //  },
};
const system = (state = initState, action: any) => {
 let handler = handlers[action.type];
 if (!handler) return state;
 return { ...state, ...handler(state, action) };
};

export default system;
