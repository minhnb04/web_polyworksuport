import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  chart: any;
  listJobApplied: any;

  ngOnInit(): void {
    this.getListDocumentCV();
    this.getListJob();
    this.getListAccount();
    this.getListUserJob();
    this.getDashboardJob();
  }
  exportExcel() {
    // this.excelService.exportAsExcelFile(this.listAccount, 'accounts');
  }
  getDashboardJob() {
    this.jobService.getList().subscribe(
      (res: any) => {
        this.listJobApplied = res.Data;
        this.userJobService.getList().subscribe(
          (res: any) => {
            this.listUserJob = res.Data;
            this.listJobApplied.forEach((x: any) => {
              x.count_applied = (this.listUserJob.filter((uj: any) => uj.job_id == x._id).length ?? 0);
            });
          }
        );

      }
    )
  }
}
