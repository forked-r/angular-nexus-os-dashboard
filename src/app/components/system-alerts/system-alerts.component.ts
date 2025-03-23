import { Component, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
// import type { DashboardService, Alert } from "../../services/dashboard.service"
import type { Observable } from 'rxjs'
import { Alert, DashboardService } from '../../services/dashboard.service'

@Component({
  selector: 'app-system-alerts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm rounded-lg border"
    >
      <div class="pb-2 px-6 pt-6">
        <div class="text-slate-100 flex items-center text-base font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            class="mr-2 h-5 w-5 text-amber-500"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          System Alerts
        </div>
      </div>
      <div class="px-6 pb-6">
        <div class="space-y-3">
          <div
            *ngFor="let alert of alerts$ | async"
            class="flex items-start space-x-3"
          >
            <div
              [ngClass]="getAlertTypeStyles(alert.type).bgColor"
              class="mt-0.5 p-1 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                [ngClass]="getAlertTypeStyles(alert.type).textColor"
                class="h-3 w-3"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <ng-container [ngSwitch]="alert.type">
                  <ng-container *ngSwitchCase="'info'">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </ng-container>
                  <ng-container *ngSwitchCase="'warning'">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </ng-container>
                  <ng-container *ngSwitchCase="'error'">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </ng-container>
                  <ng-container *ngSwitchCase="'success'">
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    ></path>
                  </ng-container>
                  <ng-container *ngSwitchCase="'update'">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </ng-container>
                </ng-container>
              </svg>
            </div>
            <div>
              <div class="flex items-center">
                <div class="text-sm font-medium text-slate-200">
                  {{ alert.title }}
                </div>
                <div class="ml-2 text-xs text-slate-500">{{ alert.time }}</div>
              </div>
              <div class="text-xs text-slate-400">{{ alert.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SystemAlertsComponent implements OnInit {
  alerts$!: Observable<Alert[]>

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.alerts$ = this.dashboardService.alerts$
  }

  getAlertTypeStyles(type: string): { bgColor: string; textColor: string } {
    switch (type) {
      case 'info':
        return {
          bgColor: 'bg-blue-500/10 border-blue-500/30',
          textColor: 'text-blue-500',
        }
      case 'warning':
        return {
          bgColor: 'bg-amber-500/10 border-amber-500/30',
          textColor: 'text-amber-500',
        }
      case 'error':
        return {
          bgColor: 'bg-red-500/10 border-red-500/30',
          textColor: 'text-red-500',
        }
      case 'success':
        return {
          bgColor: 'bg-green-500/10 border-green-500/30',
          textColor: 'text-green-500',
        }
      case 'update':
        return {
          bgColor: 'bg-cyan-500/10 border-cyan-500/30',
          textColor: 'text-cyan-500',
        }
      default:
        return {
          bgColor: 'bg-blue-500/10 border-blue-500/30',
          textColor: 'text-blue-500',
        }
    }
  }
}
