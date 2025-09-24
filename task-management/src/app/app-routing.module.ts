import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent} from './views/pages/task/view/view.component';
import { LoginComponent } from './views/pages/user/login/login.component';
import { RegisterComponent } from './views/pages/user/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CreateComponent } from './views/pages/task/create/create.component';
import { ViewSingleComponent } from './views/pages/task/view-single/view-single.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks/create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: ViewComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: ViewSingleComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
