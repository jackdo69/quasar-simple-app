import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'
import { Loading, QSpinnerBall, LocalStorage, Notify } from 'quasar'
const state = {
    loggedIn: false,
    userEmail: ''
}

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    },
    setUserEmail(state, value) {
        state.userEmail = value
    }
}

const actions = {
    registerUser({}, payload) {
        Loading.show({
            spinner: QSpinnerBall,
            // other props
          })
        firebaseAuth.
        createUserWithEmailAndPassword(
            payload.email, payload.password)
        .then(response => {
            console.log('response ', response);
            
        }).catch(error => {
            showErrorMessage(error.message)
            
        })
    },
    loginUser({}, payload) {
        Loading.show({
            spinner: QSpinnerBall,
            // other props
          })
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('response ', response);
            
        }).catch(error => {
            showErrorMessage(error.message)
        })
    },
    logoutUser() {

        firebaseAuth.signOut()
    },
    handleAuthStateChange({commit, dispatch}) {
        firebaseAuth.onAuthStateChanged(user => {
            Loading.hide()
            if (user) {
                //user is signed in
                let userEmail =  firebaseAuth.currentUser.email
                console.log(userEmail);
                
                commit('setUserEmail', userEmail)
                commit('setLoggedIn', true)
                LocalStorage.set('loggedIn', true)
                this.$router.push('/')
                dispatch('foods/fbReadData', null, {root:true})
            } else {
                //user is logged out
                commit('foods/clearFoods',null,{root:true})
                commit('foods/setFoodsDownloaded', false, {root: true})
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn',false)
                this.$router.replace('/auth')
            }
        })
    }
}


const getters = {
    userEmail(state) {
        return state.userEmail
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}