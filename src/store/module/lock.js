const key = "lock-password";
const lock = {
  state: {
    isLock: !!sessionStorage.getItem(key),
  },
  mutations: {
    updateLock(state, password) {
      if (password) {
        sessionStorage.setItem(key, password);
        state.isLock = true;
      } else {
        sessionStorage.removeItem(key);
        state.isLock = false;
      }
    },
  },
};

export default lock;
