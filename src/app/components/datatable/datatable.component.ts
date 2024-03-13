import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectTableData,
  selectTableHeads,
} from 'src/app/shared/store/datatable/datatable.selector';
import { Observable, of } from 'rxjs';
import { clearDataTable } from 'src/app/shared/store/datatable/datatable.action';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
})
export class DatatableComponent implements OnInit, OnDestroy {
  tableData$: Observable<any> = of([]);
  tableHeads$: Observable<any> = of([]);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tableHeads$ = this.store.select(selectTableHeads);
    this.tableData$ = this.store.select(selectTableData);
  }
  ngOnDestroy(): void {
    this.store.dispatch(clearDataTable());
  }
}
