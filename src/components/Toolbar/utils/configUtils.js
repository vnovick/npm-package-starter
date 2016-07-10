import { ALLOWED_CONTROL_TYPES, ALLOWED_BLOCK_TYPES } from '../config';


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

export function validateButtonsConfig(buttonsConf, callback){
  let errors = [
    ...assertButtonsConfig([], buttonsConf, 'controlType', ALLOWED_CONTROL_TYPES),
    ...assertButtonsConfig([], buttonsConf, 'blockType', ALLOWED_BLOCK_TYPES)
  ];
  return callback ? callback(errors) : errors;
}
