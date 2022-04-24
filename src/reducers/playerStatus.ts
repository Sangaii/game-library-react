import { PLAYER_STATUS } from '../constants/index';

const initState = {
 userName: '',
 nickName: '小x',
 playerCurHp: 10,
 playerMaxHp: 100,
 playerCurSp: 20,
 playerMaxSp: 100,
 playerBuff: [1, 0, 0, 0, 0, 0],
 unlockSoil: 1,
};
const handlers = {
 [PLAYER_STATUS.SET_CUR_HP]: (state: any, action: any) => {
  return { playerCurHp: action.playerCurHp };
 },
 [PLAYER_STATUS.SET_USERNAME]: (state: any, action: any) => {
  return { userName: action.userName };
 },
 [PLAYER_STATUS.SET_MAX_HP]: (state: any, action: any) => {
  return { playerMaxHp: action.playerMaxHp };
 },
 [PLAYER_STATUS.SET_PLAYER_BUFF]: (state: any, action: any) => {
  return { playerBuff: action.playerBuff };
 },
 [PLAYER_STATUS.SET_UNLOCK_SOIL]: (state: any, action: any) => {
  return { unlockSoil: action.unlockSoil };
 },
};
const playerStatus = (state = initState, action: any) => {
 let handler = handlers[action.type];
 if (!handler) return state;
 return { ...state, ...handler(state, action) };
};

export default playerStatus;
