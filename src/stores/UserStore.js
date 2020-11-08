import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: false,
            isLoggedIn: false,
            isername: ''
        })
    }
}
export default new UserStore();