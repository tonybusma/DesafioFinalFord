import {
  GoogleChartsConfig,
  GoogleChartsModule,
  GOOGLE_CHARTS_LAZY_CONFIG,
} from 'angular-google-charts';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TableComponent } from './table/table.component';
import { GraphicComponent } from './graphic/graphic.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable, ReplaySubject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleChartsConfigService {
  private configSubject = new ReplaySubject<GoogleChartsConfig>(1);
  readonly config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadLazyConfigValues(): void {
    this.http
      .post('https://special.config.api.com/getchartsconfig', {})
      .pipe(take(1))
      .subscribe((config) => this.configSubject.next(config));
  }
}

export function googleChartsConfigFactory(
  configService: GoogleChartsConfigService
): Observable<GoogleChartsConfig> {
  return configService.config$;
}

@NgModule({
  declarations: [DashboardComponent, TableComponent, GraphicComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [
    GoogleChartsConfigService,
    {
      provide: GOOGLE_CHARTS_LAZY_CONFIG,
      useFactory: googleChartsConfigFactory,
      deps: [GoogleChartsConfigService],
    },
  ],
})
export class DashboardModule {}
