export const PasswordReducer = (prevState: any, action: any) => {
  if (action.type === 'INPUT_USER') {
    const forIsValid = prevState.value.match(/\d+/) && action.value.trim().length > 7;

    return {
      value: action.value.trim(),
      isValid: forIsValid,
    };
  }

  if (action.type === 'INPUT_BLUR') {
    const forIsValid = prevState.value.match(/\d+/) && prevState.value.trim().length > 7;

    return {
      value: prevState.value.trim(),
      isValid: forIsValid,
    };
  }

  return {
    value: '',
    isValid: Boolean,
  };
};
