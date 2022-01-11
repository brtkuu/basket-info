export const state = () => ({
  loader: false
});

export const mutations = {
  loader (state, show) {
    state.loader = show;
  }
};
