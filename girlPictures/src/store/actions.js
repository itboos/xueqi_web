// 动作，所有异步的操作都应该放在这里
/* eslint-disable no-alert, no-console, no-unused-vars, func-names*/
const actions = {
  get({ state, getters }, params) {
    const url = `${getters.host}${params.path}`;
    state.axios.get(url, {
      params: {
      },
    })
    .then((resp) => {
      console.log(resp);
      if (!resp.data.error) {
        params.callback(resp.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
};
export default actions;