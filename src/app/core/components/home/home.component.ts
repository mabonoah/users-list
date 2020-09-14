import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  headerFooterHeight: number;
  @ViewChild('header', { read: ElementRef, static: false }) header: ElementRef;
  @ViewChild('footer', { read: ElementRef, static: false }) footer: ElementRef;
  @HostListener('window:resize', ['$event']) onResize() { this.setHeaderFooterHeight(); }

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setHeaderFooterHeight();
    this.cdr.detectChanges();
  }

  private setHeaderFooterHeight(): void {
    this.headerFooterHeight = this.header.nativeElement.clientHeight + this.footer.nativeElement.clientHeight;
  }

}
