import R from 'ramda';

export const loggerSettings = {
  enable: true,
  predicate: (blacklist) => (getState, { type }) => this.enable && R.not(R.contains(type, blacklist)),
  config: {
    collapsed: true,
    duration: true,
    timestamp: true
  }
};

export const isDev = process.env.NODE_ENV === 'dev';
