import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskList } from '../../../models/task-list.model'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { AuthService } from '../../../services/auth.service';
import { TaskListService } from '../../../services/task-list.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  providers:[TaskListService],
  imports: [ 
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    HttpClientModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService);

  private tasklistService = inject(TaskListService);

  tasklist: TaskList[] = [];

  private _bottomSheet = inject(MatBottomSheet);

  constructor() {
    this.getAll();
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
     this.tasklistService.updateItem(item.id, item).subscribe(() => {
        this.getAll();
      })
  }

  markAsInCompleted(item: TaskList) {
    item.completed = false;
     this.tasklistService.updateItem(item.id, item).subscribe(() => {
        this.getAll();
      })
  }

  deleteTodo(item: TaskList) {
    this.tasklistService.deleteItem(item.id).subscribe(() => {
        this.getAll();
      })
  }

  //get All
  getAll(){
      this.tasklistService.getItems().subscribe(
      data => {
        this.tasklist = data;
      }
    )
  }
}
