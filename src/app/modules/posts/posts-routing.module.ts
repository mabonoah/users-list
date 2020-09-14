import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostEntryFormComponent } from './components/post-entry-form/post-entry-form.component';
import { UsersApiService } from './services/users-api';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users', component: ListPostsComponent,
    children: [
      {
        path: 'add',
        component: PostEntryFormComponent
      },
      {
        path: 'view/:id',
        component: PostEntryFormComponent
      },
      {
        path: 'edit/:id',
        component: PostEntryFormComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UsersApiService]
})

export class PostsRoutingModule { }
