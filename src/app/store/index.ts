import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user/user.reducer';

export interface AppState {
  users: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUser.userReducer
};