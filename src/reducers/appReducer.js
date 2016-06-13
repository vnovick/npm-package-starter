import { EditorState } from 'draft-js';

const editorState = EditorState.createEmpty();
const INITIAL_STATE = {

}


function setState(state, newState) {
    return { ...state, ...newState };
}

export default (state = INITIAL_STATE, action) => {
    return state;
};