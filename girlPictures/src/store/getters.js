const getters = {
  host(state) {
    return state.isTest ? '' : 'http://gank.io/api/';
  },
};
export default getters;