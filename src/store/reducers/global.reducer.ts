import _ from '../actions/action-types';

interface State {
  testValue: string;
}

const initialState: State = {
  testValue: 'TEST 01',
};

interface IAction {
  type: string;
  payload: any;
}

const globalReducer = (state: State = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case _.SET_TEST_VALUE:
      return { ...state, testValue: payload };

    default:
      return state;
  }
};

export default globalReducer;
