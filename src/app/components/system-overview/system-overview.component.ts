import { Component, Input, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  DashboardService,
  Process,
  Storage,
} from '../../services/dashboard.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-system-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden rounded-lg border"
    >
      <div class="border-b border-slate-700/50 pb-3 px-6 pt-6">
        <div class="flex items-center justify-between">
          <div class="text-slate-100 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="mr-2 h-5 w-5 text-cyan-500"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            System Overview
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs px-2 py-1 rounded-full flex items-center"
            >
              <div
                class="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"
              ></div>
              LIVE
            </div>
            <button
              class="h-8 w-8 text-slate-400 bg-transparent border-none flex items-center justify-center rounded-md hover:bg-slate-800/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-4 w-4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-slate-800/50 rounded-lg border from-cyan-500 to-blue-500 border-cyan-500/30 p-4 relative overflow-hidden"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm text-slate-400">CPU Usage</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-5 w-5 text-cyan-500"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
            <div
              class="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300"
            >
              {{ cpuUsage }}%
            </div>
            <div class="text-xs text-slate-500">3.8 GHz | 12 Cores</div>
            <div class="absolute bottom-2 right-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-4 w-4 text-amber-500"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M9 21V9"></path>
              </svg>
            </div>
            <div
              class="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"
            ></div>
          </div>

          <div
            class="bg-slate-800/50 rounded-lg border from-purple-500 to-pink-500 border-purple-500/30 p-4 relative overflow-hidden"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm text-slate-400">Memory</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-5 w-5 text-purple-500"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
              </svg>
            </div>
            <div
              class="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300"
            >
              {{ memoryUsage }}%
            </div>
            <div class="text-xs text-slate-500">16.4 GB / 24 GB</div>
            <div class="absolute bottom-2 right-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-4 w-4 text-blue-500"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            </div>
            <div
              class="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-purple-500 to-pink-500"
            ></div>
          </div>

          <div
            class="bg-slate-800/50 rounded-lg border from-blue-500 to-indigo-500 border-blue-500/30 p-4 relative overflow-hidden"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm text-slate-400">Network</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-5 w-5 text-blue-500"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
              </svg>
            </div>
            <div
              class="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300"
            >
              {{ networkStatus }}%
            </div>
            <div class="text-xs text-slate-500">1.2 GB/s | 42ms</div>
            <div class="absolute bottom-2 right-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-4 w-4 rotate-180 text-green-500"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M9 21V9"></path>
              </svg>
            </div>
            <div
              class="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-blue-500 to-indigo-500"
            ></div>
          </div>
        </div>

        <div class="mt-8">
          <div class="mb-4">
            <ul class="flex bg-slate-800/50 p-1 rounded-md space-x-1 w-fit">
              <li>
                <button
                  (click)="activeTab = 'performance'"
                  [ngClass]="{
                    'bg-slate-700 text-cyan-400': activeTab === 'performance',
                    'text-slate-400': activeTab !== 'performance',
                  }"
                  class="px-4 py-2 rounded-md text-sm"
                >
                  Performance
                </button>
              </li>
              <li>
                <button
                  (click)="activeTab = 'processes'"
                  [ngClass]="{
                    'bg-slate-700 text-cyan-400': activeTab === 'processes',
                    'text-slate-400': activeTab !== 'processes',
                  }"
                  class="px-4 py-2 rounded-md text-sm"
                >
                  Processes
                </button>
              </li>
              <li>
                <button
                  (click)="activeTab = 'storage'"
                  [ngClass]="{
                    'bg-slate-700 text-cyan-400': activeTab === 'storage',
                    'text-slate-400': activeTab !== 'storage',
                  }"
                  class="px-4 py-2 rounded-md text-sm"
                >
                  Storage
                </button>
              </li>
            </ul>
          </div>

          <div [ngSwitch]="activeTab">
            <div *ngSwitchCase="'performance'" class="mt-0">
              <div
                class="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden"
              >
                <div
                  class="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative"
                >
                  <!-- Y-axis labels -->
                  <div
                    class="absolute left-2 top-0 h-full flex flex-col justify-between py-4"
                  >
                    <div class="text-xs text-slate-500">100%</div>
                    <div class="text-xs text-slate-500">75%</div>
                    <div class="text-xs text-slate-500">50%</div>
                    <div class="text-xs text-slate-500">25%</div>
                    <div class="text-xs text-slate-500">0%</div>
                  </div>

                  <!-- X-axis grid lines -->
                  <div
                    class="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10"
                  >
                    <div class="border-b border-slate-700/30 w-full"></div>
                    <div class="border-b border-slate-700/30 w-full"></div>
                    <div class="border-b border-slate-700/30 w-full"></div>
                    <div class="border-b border-slate-700/30 w-full"></div>
                    <div class="border-b border-slate-700/30 w-full"></div>
                  </div>

                  <!-- Chart bars -->
                  <div
                    class="flex-1 h-full flex items-end justify-between px-2 z-10"
                  >
                    <div
                      *ngFor="let item of chartData"
                      class="flex space-x-0.5"
                    >
                      <div
                        class="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                        [style.height.%]="item.cpu"
                      ></div>
                      <div
                        class="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                        [style.height.%]="item.memory"
                      ></div>
                      <div
                        class="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                        [style.height.%]="item.network"
                      ></div>
                    </div>
                  </div>

                  <!-- X-axis labels -->
                  <div
                    class="absolute bottom-0 left-0 right-0 flex justify-between px-10"
                  >
                    <div class="text-xs text-slate-500">00:00</div>
                    <div class="text-xs text-slate-500">06:00</div>
                    <div class="text-xs text-slate-500">12:00</div>
                    <div class="text-xs text-slate-500">18:00</div>
                    <div class="text-xs text-slate-500">24:00</div>
                  </div>
                </div>
                <div
                  class="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50"
                >
                  <div class="text-xs text-slate-400">System Load</div>
                  <div class="text-lg font-mono text-cyan-400">
                    {{ cpuUsage }}%
                  </div>
                </div>
              </div>
            </div>

            <div *ngSwitchCase="'processes'" class="mt-0">
              <div
                class="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden"
              >
                <div
                  class="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50"
                >
                  <div class="col-span-1">PID</div>
                  <div class="col-span-4">Process</div>
                  <div class="col-span-2">User</div>
                  <div class="col-span-2">CPU</div>
                  <div class="col-span-2">Memory</div>
                  <div class="col-span-1">Status</div>
                </div>

                <div class="divide-y divide-slate-700/30">
                  <div
                    *ngFor="let process of processes$ | async"
                    class="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50"
                  >
                    <div class="col-span-1 text-slate-500">
                      {{ process.pid }}
                    </div>
                    <div class="col-span-4 text-slate-300">
                      {{ process.name }}
                    </div>
                    <div class="col-span-2 text-slate-400">
                      {{ process.user }}
                    </div>
                    <div class="col-span-2 text-cyan-400">
                      {{ process.cpu }}%
                    </div>
                    <div class="col-span-2 text-purple-400">
                      {{ process.memory }} MB
                    </div>
                    <div class="col-span-1">
                      <span
                        class="bg-green-500/10 text-green-400 border border-green-500/30 text-xs px-2 py-0.5 rounded-full"
                      >
                        {{ process.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div *ngSwitchCase="'storage'" class="mt-0">
              <div
                class="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    *ngFor="let storage of storage$ | async"
                    class="bg-slate-800/50 rounded-md p-3 border border-slate-700/50"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm text-slate-300">
                        {{ storage.name }}
                      </div>
                      <span
                        class="bg-slate-700/50 text-slate-300 border border-slate-600/50 text-xs px-2 py-0.5 rounded-full"
                      >
                        {{ storage.type }}
                      </span>
                    </div>
                    <div class="mb-2">
                      <div class="flex items-center justify-between mb-1">
                        <div class="text-xs text-slate-500">
                          {{ storage.used }} GB / {{ storage.total }} GB
                        </div>
                        <div class="text-xs text-slate-400">
                          {{ getPercentage(storage.used, storage.total) }}%
                        </div>
                      </div>
                      <div
                        class="h-1.5 bg-slate-700 rounded-full overflow-hidden"
                      >
                        <div
                          class="h-full rounded-full"
                          [ngClass]="{
                            'bg-red-500':
                              getPercentage(storage.used, storage.total) > 90,
                            'bg-amber-500':
                              getPercentage(storage.used, storage.total) > 70 &&
                              getPercentage(storage.used, storage.total) <= 90,
                            'bg-cyan-500':
                              getPercentage(storage.used, storage.total) <= 70,
                          }"
                          [style.width.%]="
                            getPercentage(storage.used, storage.total)
                          "
                        ></div>
                      </div>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <div class="text-slate-500">
                        Free: {{ storage.total - storage.used }} GB
                      </div>
                      <button
                        class="h-6 text-xs px-2 text-slate-400 hover:text-slate-100 bg-transparent border-none"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SystemOverviewComponent implements OnInit {
  @Input() cpuUsage = 42
  @Input() memoryUsage = 68
  @Input() networkStatus = 92

  activeTab = 'performance'
  chartData: { cpu: number; memory: number; network: number }[] = []
  processes$!: Observable<Process[]>
  storage$!: Observable<Storage[]>

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.processes$ = this.dashboardService.processes$
    this.storage$ = this.dashboardService.storage$
    this.generateChartData()
  }

  generateChartData(): void {
    this.chartData = Array.from({ length: 24 }).map(() => ({
      cpu: Math.floor(Math.random() * 60) + 20,
      memory: Math.floor(Math.random() * 40) + 40,
      network: Math.floor(Math.random() * 30) + 30,
    }))
  }

  getPercentage(used: number, total: number): number {
    return Math.round((used / total) * 100)
  }
}
