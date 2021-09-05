export const type = {
  setContact: 'setContact',
};

export const setContact = payload => {
  return {
    payload,
    type: type.setContact,
  };
};
export const addContact = (prevState, newItem) => {
  let payload = [...prevState, newItem];
  return {
    payload,
    type: type.setContact,
  };
};
