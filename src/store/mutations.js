export default{
    UI_open_toggle(state) {
        state.UI.open = !state.UI.open;
    },
    update_APP_tags(state, data) {
        state.APP.tags = data;
    },
    update_APP_scenes(state, data) {
        state.APP.scenes = data;
    },
    update_APP_movies(state, data) {
        state.APP.movies = data;
    }
}