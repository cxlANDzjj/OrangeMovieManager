import {API} from './api'
import QS from 'qs';

export default {
    getScenes(store, $http) {
        $http.get(API.admin.scenes).then((response) => {
            store.commit('update_APP_scenes', response.data);
        })
    },

    editScene(store, payload) {
        let config = {
            headers:{'content-type':'application/x-www-form-urlencoded'}
        }
        var formdata = new FormData();
        formdata.append('pk',payload.data.pk);
        formdata.append('hall',payload.data.hall);
        formdata.append('movie',payload.data.movie);
        formdata.append('effect',payload.data.effect);
        formdata.append('price',payload.data.price);
        formdata.append('start',payload.data.start);
        formdata.append('end',payload.data.end);
        return new Promise(function(resolve, reject) {
            payload.$http.post('http://127.0.0.1:8000/api/scenes/update/', formdata, config).then(
                (response) => {
                    // console.log(response);
                    if(response.data.error === 0) {
                        resolve(response.data);
                    }
                    else {
                        reject(response.data);
                    }
                }
            )
        })
    }
}