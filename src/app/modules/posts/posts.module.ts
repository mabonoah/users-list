import { NgModule } from '@angular/core';
import { PostsRoutingModule } from './posts-routing.module';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PostEntryFormComponent } from './components/post-entry-form/post-entry-form.component';

@NgModule({
  declarations: [ListPostsComponent, PostFormComponent, PostEntryFormComponent],
  imports: [
    PostsRoutingModule,
    SharedModule
  ],
  entryComponents: [PostFormComponent, PostEntryFormComponent]
})
export class PostsModule { }
