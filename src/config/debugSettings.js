import { queryString } from '../utils/queryString';

export const isDev = process.env.NODE_ENV === 'development';


export const loggerSettings = {
  enable: queryString.logActions || isDev,
  predicate: (blacklist) => (getState, { type }) => loggerSettings.enable && !(blacklist.includes(type)),
  config: {
    collapsed: true,
    duration: true,
    timestamp: true
  }
};

