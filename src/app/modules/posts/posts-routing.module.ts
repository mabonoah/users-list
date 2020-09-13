import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { UsersApiService } from './services/users-api';

const routes: Routes = [
  { path: '', redirectTo: '/list-posts', pathMatch: 'full' },
  { path: 'list-posts', component: ListPostsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UsersApiService]
})

export class PostsRoutingModule { }
