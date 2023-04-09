import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  chart: any;

  ngOnInit(): void {
    this.getListDocumentCV();
    this.getListJob();
    this.getListAccount();
    this.getListUserJob();
  }
  exportExcel() {
    // this.excelService.exportAsExcelFile(this.listAccount, 'accounts');
  }
}
