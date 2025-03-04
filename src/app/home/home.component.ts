import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
// import { loadUsers, updateUser } from '../store/';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { AppState } from '../store';
import * as UserActions from '../store/user/user.actions';
import * as UserSelectors from '../store/user/user.selectors';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  editingUserId$: Observable<number | null>;
  userForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.loading$ = this.store.select(UserSelectors.selectUserLoading);
    this.error$ = this.store.select(UserSelectors.selectUserError);
    this.editingUserId$ = this.store.select(UserSelectors.selectEditingUserId);
    
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: ['']
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  // Helper method to safely get form controls as FormControl
  getControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  editUser(user: User): void {
    this.userForm.setValue({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website
    });
    this.store.dispatch(UserActions.setEditingUser({ userId: user.id }));
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value as User;
      this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
    }
  }

  cancelEdit(): void {
    this.store.dispatch(UserActions.setEditingUser({ userId: null }));
    this.userForm.reset();
  }
}
