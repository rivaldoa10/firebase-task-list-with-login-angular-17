import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TaskList } from '../models/task-list.model';
import { TaskListAdd } from '../DTO/TaskListAddDTO.model';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private url: string = "http://localhost:3000/";
  private itemsSource = new BehaviorSubject<TaskList[]>([]);
  items$ = this.itemsSource.asObservable();

  currentFilter: 'all' | 'true' | 'false' = 'all';

  constructor(private http: HttpClient) { }

  // get task-list
  getItems():void{
     this.currentFilter = 'all';
     this.http.get<TaskList[]>(this.url+"getAll/").subscribe(data => this.itemsSource.next(data));
  }

  //get task-list by status
  getItemByStatus(status:string){
    this.currentFilter = status.toLowerCase() as 'true' | 'false';
    this.http.get<TaskList[]>(this.url+"getAllByStatus/?status="+status).subscribe(data => this.itemsSource.next(data));
  }

 // create new task
createItem(item: TaskListAdd): Observable<TaskList> {
  return this.http.post<any>(this.url + 'create/', item).pipe(
    tap(response => {
      // ✅ extraer id desde referencePath
      const refPath: string = response.id.referencePath;
      const id: string = refPath.split('/').pop() ?? ''; // nunca será undefined

      // construir objeto TaskList con id correcto
      const newItem: TaskList = { id, ...item };

      const current = this.itemsSource.value;
      this.itemsSource.next([...current, newItem]);
    }),
    catchError(this.handleError)
  );
}



  //update task
   updateItem(id: string, item: TaskList): Observable<TaskList> {
    return this.http.put<TaskList>(`${this.url}update/${id}`, item).pipe(
      tap(updated => {
        const current = this.itemsSource.value.map(t =>
          t.id === id ? updated : t
        );
        this.itemsSource.next(current);
      })
    );
  }

  //delete task
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}delete/${id}`).pipe(
      tap(() => {
        const current = this.itemsSource.value.filter(t => t.id !== id);
        this.itemsSource.next(current);
      })
    );
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
