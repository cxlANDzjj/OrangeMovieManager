import {API} from './api'
import QS from 'qs';

export default {
    getMovies(store, $http) {
        $http.get(API.admin.movies).then((response) => {
            store.commit('update_APP_movies', response.data);
        })
    }
}