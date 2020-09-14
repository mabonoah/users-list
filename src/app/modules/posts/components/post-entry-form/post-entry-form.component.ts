import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({ template: '' })

export class PostEntryFormComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

}
