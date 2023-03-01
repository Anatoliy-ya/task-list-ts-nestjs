export const LoginMailReducer = (prevState: any, action: any) => {
  if (action.type === 'INPUT_USER') {
    const forIsValid = action.value.includes('@') && action.value.includes('.');
    return {
      value: action.value.trim(),
      isValid: forIsValid,
    };
  }

  if (action.type === 'INPUT_BLUR') {
    const forIsValid = prevState.value.includes('@') && prevState.value.includes('.');
    return {
      value: prevState.value.trim(),
      isValid: forIsValid,
    };
  }

  return {
    value: '',
    isValid: undefined,
  };
};
