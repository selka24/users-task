import Vue from 'vue';
import Vuex from 'vuex';
import {apiClient} from "@/api/apiClient";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadSpinner: false,
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
            commit('mutState', {key: 'loadSpinner', value: true})
            const {data, error} = await apiClient.get('/users')
            if(data){
                commit('mutState', {key: 'users', value: data})
            } else {
                alert(error)
            }
            commit('mutState', {key: 'loadSpinner', value: false})
        },
        async actCreateUser({commit}, user){
            commit('mutState', {key: 'loadSpinner', value: true})
            const {data, error} = await apiClient.post('/users', user)
            if(data){
                commit('mutAddNewUser', data);
            } else {
                alert(error)
            }
            commit('mutState', {key: 'loadSpinner', value: false})
        },
        async actUpdateUser({commit}, user){
            commit('mutState', {key: 'loadSpinner', value: true})
            const {data, error} = await apiClient.put(`/users/${user.id}`, user);
            if(data){
                commit('mutUpdateUser', data);
            } else {
                alert(error)
            }
            commit('mutState', {key: 'loadSpinner', value: false})
        },
        async actDeleteUser({commit}, user){
            commit('mutState', {key: 'loadSpinner', value: true})
            const {data, error} = await apiClient.delete(`/users/${user.id}`);
            if(data){
                commit('mutDeleteUser', user);
            }else {
                alert(error)
            }
            commit('mutState', {key: 'loadSpinner', value: false})
        }
    }
});
