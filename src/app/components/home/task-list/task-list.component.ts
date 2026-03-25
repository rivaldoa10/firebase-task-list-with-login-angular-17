import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskList } from '../../../models/task-list.model'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ 
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService);

  private tasklistService = inject(TaskService);

  tasklist: TaskList[] = [];

  private _bottomSheet = inject(MatBottomSheet);

  constructor() {
    this.tasklistService.getItems().subscribe(
      data => {
        this.tasklist = data;
      }
    )
  }

   async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
         console.log(error);
    }
   }

  addNewTodo() {
    this._bottomSheet.open(TaskCreateComponent);
  }

  markAsCompleted(item: TaskList) {
    item.completed = true;
    // save the todo item in Firestore
    this.tasklistService.updateItem(item.id, item).then(
      data => {

      }
    ).catch(error => {
      console.error('Error:', error);
    })
  }

  markAsInCompleted(item: TaskList) {
    item.completed = false;
    // save the todo item in Firestore
    this.tasklistService.updateItem(item.id, item).then(
      data => {

      }
    ).catch(error => {
      console.error('Error:', error);
    })
  }

  deleteTodo(item: TaskList) {
    // delete item from firestore
    this.tasklistService.deleteItem(item.id).then(
      data => {

      }
    ).catch(error => {
      console.error('Error:', error);
    })
  }
}
