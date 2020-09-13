import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  navItems: string[] = ['About Us', 'Solutions', 'Careers', 'Contact Us'];

  constructor() { }

  ngOnInit(): void {
  }

}
