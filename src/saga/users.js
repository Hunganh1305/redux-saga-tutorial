import { takeEvery, put, fork, call } from 'redux-saga/effects'
import * as actions from '../actions/user';
import * as api from '../api/user'

function* getUsers() {
    try {
        const result = yield call(api.getUsers);

        yield put(actions.getUsersSuccess({
            item: result.data.data
        }));
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when  trying to get the users'
        }));
    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

const userSaga = [
    fork(watchGetUsersRequest)
];


export default userSaga;
