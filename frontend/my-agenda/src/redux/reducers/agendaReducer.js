import actionTypes from '../actions/action-types';

export default function agendaReducer(state={}, action) {
    let loading = {};
    switch(action.type) {
        case actionTypes.LOAD_AGENDA_LIST:
            loading = {...state, agendaList: action.agendaList};
            break;
        case actionTypes.LIST_ERROR:
            loading = {...state, errorList: action.errorList};
            break;
        case actionTypes.CREATE_USER:
            loading = {...state, createdUser: action.createdUser};
            break;
        case actionTypes.ERROR_CREATE_USER:
            loading = {...state, errorUser: action.errorUser};
            break;
        default:
            loading = state;
    }
    return loading
}
