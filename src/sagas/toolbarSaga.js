// process CONFIGURE_EDITOR actions
import { take, put } from 'redux-saga/effects';
import Types from '../actions/types';
import { configureToolbar, throwConfigurationError } from '../actions/creators';
import { defaultButtonsConfig } from '../components/Toolbar/config';
import { validateButtonsConfig } from '../components/Toolbar/utils/configUtils';

export function * watchToolbarConfig() {
  while (true){
    const { config, id } = yield take(Types.CONFIGURE_EDITOR);
    if (config && config.buttonsConfig){
      const { buttonsConfig: outerConfig } = config;
      const { buttonsConf, buttonsList } = defaultButtonsConfig;
      const validatedButtonsConfig = {
        buttonsList: outerConfig.buttonsList || buttonsList,
        buttonsConf: outerConfig.buttonsConf || buttonsConf,
        configured: true
      };
      const errors = validateButtonsConfig(validatedButtonsConfig);
      if (errors.length > 0) {
        yield put(throwConfigurationError(id, { message: errors }));
      } else {
        yield put(configureToolbar(id, validatedButtonsConfig));
      }
    } else {
      yield put(configureToolbar(id, { ...defaultButtonsConfig, configured: true }));
    }
  }
}

