import { NgModule } from '@angular/core';
import { PostsRoutingModule } from './posts-routing.module';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [ListPostsComponent, PostFormComponent],
  imports: [
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }
