import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from '../commons/data-table/data-table.component';
import { DocumentCvComponent } from '../components/document-cv/document-cv.component';
import { JobComponent } from '../components/job/job.component';
import { RoleComponent } from '../components/role/role.component';
import { UserJobComponent } from '../components/user-job/user-job.component';
import { UserComponent } from '../components/user/user.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../portals/portal-admin/dashboard/dashboard.component';
import { ManagementPageComponent } from '../portals/portal-admin/management-page/management-page.component';
import { PortalCompanyComponent } from '../portals/portal-company/portal-company.component';
import { NonAuthGuard } from '../utils/guards/non-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    component: LoginComponent, 
    data: { preload: true },
    children: [
    ]
  },
  {
    path: 'admin',
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    component: ManagementPageComponent, 
    data: { preload: true },
    children: [
      {
        path: '',
        component: DashboardComponent, 
      },
      {
        path: 'builder',
        component: DataTableComponent, 
      },
      {
        path: 'data-table',
        component: DataTableComponent, 
      },
      {
        path: 'role',
        component: RoleComponent, 
      },
      {
        path: 'job',
        component: JobComponent, 
      },
      {
        path: 'document-cv',
        component: DocumentCvComponent, 
      },
      {
        path: 'user',
        component: UserComponent, 
      },
      {
        path: 'user-job',
        component: UserJobComponent, 
      },
    ]
  },
  {
    path: 'staff',
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    component: PortalCompanyComponent, 
    data: { preload: true },
    children: [
      {
        path: 'job',
        component: JobComponent, 
      },
      {
        path: 'document-cv',
        component: DocumentCvComponent, 
      },
      {
        path: 'user-job',
        component: UserJobComponent, 
      },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
