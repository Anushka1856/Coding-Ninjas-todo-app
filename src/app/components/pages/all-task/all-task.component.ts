import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {
newTask="";
initialtaskList:any[]=[];
taskList:any[]=[];
httpService=inject(HttpService);
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
addTask(){
  console.log("addTask",this.newTask)
  this.httpService.addTask(this.newTask).subscribe(()=>{
    console.log("added");
    this.newTask="";
    this.getAllTasks();
  })
}
getAllTasks(){
  this.httpService.getAllTasks().subscribe((result:any)=>{
    this.initialtaskList=this.taskList=result;
  })
}
onComplete(task:any){
  task.completed=true;
  console.log("complete",task);
  this.httpService.updateTask(task).subscribe(()=>{
    this.getAllTasks();
  })
}
onImportant(task:any){
  task.important=true;
  console.log("important",task);
  this.httpService.updateTask(task).subscribe(()=>{
    this.getAllTasks();
  })
}
search(searchTerm:any){
  console.log(searchTerm)
}
}
