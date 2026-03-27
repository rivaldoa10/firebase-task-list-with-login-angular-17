import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TaskList } from '../models/task-list.model';
import { TaskListAdd } from '../DTO/TaskListAddDTO.model';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

   private url: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  // get task-list
  getItems():Observable<TaskList[]>{
    return this.http.get<TaskList[]>(this.url+"getAll/").pipe(
      catchError(this.handleError)
    )
  }

  // create new task-list
  createItem(data: TaskListAdd) {
    return this.http.post(this.url+"create/", data);
  }

  // update an task
  updateItem(id: string, data: any){
    return this.http.put(`${this.url}update/${id}`, data);
  }

   // delete an item
    deleteItem(id: string){
      console.log(`${this.url}delete/${id}`);
      return this.http.delete(`${this.url}delete/${id}`);
    }

  //Handle error
   private handleError(error:HttpErrorResponse):Observable<never>{
    let errorMessage = "ocurrio un error desconocido";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error ${error.error.message}`
    }else{
      errorMessage = `Codigo del error ${error.status}\n Mensaje ${error.message}`
    }

    console.log(error);
    return throwError(()=>new Error(errorMessage));
  }
}
