export const type = {
  setContact: 'setContact',
};

export const setContact = payload => {
  return {
    payload,
    type: type.setContact,
  };
};
