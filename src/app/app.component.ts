import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'datatables';
  sort: any;
  paginator: any;
  isLoading = false;
  customers: any;
  dataSource = new MatTableDataSource();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`http://localhost:8080/`).subscribe((posts) => {
      this.customers = posts;
      this.dataSource = new MatTableDataSource(this.customers);
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'phone',
    'country',
    'state',
    'countryCode',
    'number',
  ];

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    paginator: MatPaginator
  ) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
