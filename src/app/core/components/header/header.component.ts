import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isSmallDevice: boolean = false;
  navBarList: string[] = ['Home', 'About Us', 'Solutions', 'Clients & Testimonials', 'Our Team', 'Blog'];
  @HostListener('window:resize', ['$event']) onResize(): void { this.detectDeviceSize(); }

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.detectDeviceSize();
    this.cdr.detectChanges();
  }

  /** Update isSmallDevice value depends on device width. */
  private detectDeviceSize(): void {
    const deviceWidth: number = this.el.nativeElement.clientWidth;
    (deviceWidth <= 767) ? this.isSmallDevice = true : this.isSmallDevice = false;
  }

}
