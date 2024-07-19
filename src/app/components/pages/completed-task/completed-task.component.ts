import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.scss'
})
export class CompletedTaskComponent {
  newTask = "";
  initialtaskList:any[]=[];
  taskList: any[] = [];
  httpService = inject(HttpService);
  stateService=inject(StateService);
ngOnInit(){
  this.stateService.searchSubject.subscribe((value)=>{
    console.log("search",value)
    if(value){
      this.taskList=this.initialtaskList.filter(x=>
        x.title.toLowerCase().includes(value.toLowerCase())
      );
    }
    else{
      this.taskList=this.initialtaskList;
    }
  });
  this.getAllTasks();
}

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.taskList = result.filter((x: any) => x.completed === true);
    });
  }

  onComplete(task: any) {
    task.completed = true;
    console.log("complete", task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  onImportant(task: any) {
    if (!task.important) {
      task.important = true;
      console.log("important", task);
      this.httpService.updateTask(task).subscribe(() => {
        this.getAllTasks();
      });
    }
  }
  search(searchTerm:any){
    console.log(searchTerm)
  }
}
