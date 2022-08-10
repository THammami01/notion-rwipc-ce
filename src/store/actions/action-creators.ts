import _ from './action-types';

const getActionCreator = (actionType: string) => (payload: any) => ({
  type: actionType,
  payload,
});

export const setTestValue = getActionCreator(_.SET_TEST_VALUE);
