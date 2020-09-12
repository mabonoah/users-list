import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';

@NgModule({
  declarations: [ListPostsComponent, PostFormComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
