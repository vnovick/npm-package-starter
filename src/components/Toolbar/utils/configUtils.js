import { ALLOWED_CONTROL_TYPES, ALLOWED_BLOCK_TYPES } from '../config';
export function asserButtonsListConfig(buttonsList, buttonsConf){
  const undefinedButtons = buttonsList.map((key) => {
    if (!buttonsConf[key]) {
      return `${key} is not defined in buttonsConf`;
    }
    return false;
  }).filter(key => key);
  return undefinedButtons;
}

export function assertButtonsConfig(errMessageArray, buttonsConf, type, allowedTypes){
  let assertionErrors = errMessageArray;
  Object.entries(buttonsConf).forEach(({ 1: block }) => {
    const blockOrControlType = block[type];
    if (block.controlType === 'menu'){
      assertionErrors = assertButtonsConfig(assertionErrors, block.buttons, type, allowedTypes);
    } else if (!allowedTypes.includes(blockOrControlType)){
      assertionErrors = [ ...assertionErrors, `${blockOrControlType} ${type} is not allowed` ];
    }
  });
  return assertionErrors;
}

export function validateButtonsConfig(buttonsConfig, callback){
  const { buttonsConf, buttonsList } = buttonsConfig;
  let errors = [
    ...asserButtonsListConfig(buttonsList, buttonsConf),
    ...assertButtonsConfig([], buttonsConf, 'controlType', ALLOWED_CONTROL_TYPES),
    ...assertButtonsConfig([], buttonsConf, 'blockType', ALLOWED_BLOCK_TYPES)
  ];
  return callback ? callback(errors) : errors;
}
