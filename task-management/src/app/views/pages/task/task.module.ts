import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';
import { ViewSingleComponent } from './view-single/view-single.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    TaskComponent,
    ViewComponent,
    UpdateComponent,
    ViewSingleComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
