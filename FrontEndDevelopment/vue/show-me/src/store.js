import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        userObjStore:{
            userName:'',
            userImage:'',
            authorized: false 
        }
        //authorized: false
    },
    mutations:{
        setAuthorization(state, value){
            state.userObjStore.userName = value.userName;
            state.userObjStore.userImage = value.userImage;
            state.userObjStore.authorized = value.authorized;
        }
    }
});