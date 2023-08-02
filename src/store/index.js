import Vue from 'vue';
import Vuex from 'vuex';
import {apiClient} from "@/api/apiClient";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currUser: null,
        users: [],
        showUserModal: false
    },
    getters:{
        gCurrUserName(state){
            return state.currUser?.name
        },
        gUserPrepareForInsert(state){
            const {
                street,
                city,
                zipcode,
                lat,
                lng,
                ...rest
            } = state.currUser;

            return {
                ...rest,
                address: {
                    street,
                    city,
                    zipcode,
                    geo: {
                        lat,
                        lng,
                    }
                }
            }

        }
    },
    mutations: {
        mutState(state, {key, value}){
          state[key] = value;
        },
        mutUserModal(state){
            state.showUserModal = !state.showUserModal;
        },
        mutAddNewUser(state, user){
            state.users = [user, ...state.users];
        },
        mutUpdateUser(state, user){
            state.users = [
                user,
                ...state.users.filter(x => x.id !== user.id)
            ]
        },
        mutDeleteUser(state, user){
            state.users = state.users.filter(x => x.id !== user.id)
        }
    },
    actions: {
        async actGetUsers({commit}) {
            const {data, error} = await apiClient.get('/users')
            console.log(data, 'act get users')
            if(data){
                commit('mutState', {key: 'users', value: data})
            } else {
                alert(error)
            }
        },
        async actCreateUser({commit}, user){
            const {data, error} = await apiClient.post('/users', user)
            if(data){
                commit('mutAddNewUser', data);
            } else {
                alert(error)
            }
        },
        async actUpdateUser({commit}, user){
            const {data, error} = await apiClient.put(`/users/${user.id}`, user);
            console.log(data, 'dataa', error);
            if(data){
                commit('mutUpdateUser', data);
            } else {
                alert(error)
            }
        },
        async actDeleteUser({commit}, user){
            const {data, error} = await apiClient.delete(`/users/${user.id}`);
            if(data){
                commit('mutDeleteUser', user);
            }else {
                alert(error)
            }
        }
    }
});
