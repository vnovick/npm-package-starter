// process CONFIGURE_EDITOR actions
import { take, put } from 'redux-saga/effects';
import Types from '../actions/types';
import { configureToolbar, throwConfigurationError } from '../actions/creators';
import { defaultButtonsConfig } from '../components/Toolbar/config';
import { validateButtonsConfig } from '../components/Toolbar/utils/configUtils';

export function * watchToolbarConfig() {
  const action = yield take(Types.CONFIGURE_EDITOR);
  if (action.config && action.config.buttonsConfig){
    const { buttonsConfig: outerConfig } = action.config;
    const { buttonsConf, buttonsList } = defaultButtonsConfig;
    const validatedButtonsConfig = {
      buttonsList: outerConfig.buttonsList || buttonsList,
      buttonsConf: outerConfig.buttonsConf || buttonsConf,
      configured: true
    };
    const errors = validateButtonsConfig(validatedButtonsConfig);
    if (errors.length > 0) {
      yield put(throwConfigurationError({ message: errors }));
    } else {
      yield put(configureToolbar(validatedButtonsConfig));
    }
  } else {
    yield put(configureToolbar({ ...defaultButtonsConfig, configured: true }));
  }
}

