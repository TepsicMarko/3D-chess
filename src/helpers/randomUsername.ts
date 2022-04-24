const randomUsername = () => {
  return 'Anonymous' + Math.floor(Math.random() * 100) + 1;
};

export default randomUsername;
