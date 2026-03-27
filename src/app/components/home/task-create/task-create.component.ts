import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {provideNativeDateAdapter} from '@angular/material/core';
import { TaskList } from '../../../models/task-list.model';
import { TaskListService } from '../../../services/task-list.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskListAdd } from '../../../DTO/TaskListAddDTO.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  providers: [provideNativeDateAdapter(), TaskListService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule   
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {
  private _bottomSheetRef = inject<MatBottomSheetRef<TaskCreateComponent>>(MatBottomSheetRef);
  
  private tasklistService = inject(TaskListService);
  tasklist: TaskList[] = [];
  todoForm!: FormGroup;

  constructor() {
    this.initForm();
  }

  initForm() {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      dueDate: new FormControl(new Date(), Validators.required),
      priority: new FormControl('High', Validators.required),
    });
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    const taskList : TaskListAdd = { 
      title:this.todoForm.value.title, 
      completed:this.todoForm.value.completed, 
      dueDate: this.todoForm.value.dueDate, 
      priority: this.todoForm.value.priority};

    // post the data to firestore
    this.tasklistService.createItem(taskList).subscribe({
      next: () => {
        console.log('saved data');
        this.getAll();
        this._bottomSheetRef.dismiss();
      },
      error: err => {
       console.error(err);
      }
    });
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
