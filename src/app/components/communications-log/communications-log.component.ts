import { Component, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  DashboardService,
  Communication,
} from '../../services/dashboard.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-communications-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm rounded-lg border"
    >
      <div class="pb-2 flex flex-row items-center justify-between px-6 pt-6">
        <div class="text-slate-100 flex items-center text-base font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            class="mr-2 h-5 w-5 text-blue-500"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          Communications Log
        </div>
        <span
          class="bg-slate-800/50 text-blue-400 border border-blue-500/50 text-xs px-2 py-0.5 rounded-full"
        >
          4 New Messages
        </span>
      </div>
      <div class="px-6">
        <div class="space-y-3">
          <div
            *ngFor="let comm of communications$ | async"
            class="flex space-x-3 p-2 rounded-md"
            [ngClass]="{
              'bg-slate-800/50 border border-slate-700/50': comm.unread,
            }"
          >
            <div
              class="relative inline-block h-8 w-8 rounded-full bg-slate-700 text-cyan-500 flex items-center justify-center overflow-hidden"
            >
              <img
                [src]="comm.avatar"
                [alt]="comm.sender"
                class="h-full w-full object-cover"
              />
              <span class="absolute inset-0 flex items-center justify-center">{{
                comm.sender.charAt(0)
              }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium text-slate-200">
                  {{ comm.sender }}
                </div>
                <div class="text-xs text-slate-500">{{ comm.time }}</div>
              </div>
              <div class="text-xs text-slate-400 mt-1">{{ comm.message }}</div>
            </div>
            <div *ngIf="comm.unread" class="flex-shrink-0 self-center">
              <div class="h-2 w-2 rounded-full bg-cyan-500"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-slate-700/50 pt-4 px-6 pb-6 mt-4">
        <div class="flex items-center w-full space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            [(ngModel)]="newMessage"
            class="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            class="bg-blue-600 hover:bg-blue-700 h-8 w-8 rounded-md flex items-center justify-center border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="h-4 w-4 text-white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
              ></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
          <button
            (click)="sendMessage()"
            class="bg-cyan-600 hover:bg-cyan-700 h-8 w-8 rounded-md flex items-center justify-center border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="h-4 w-4 text-white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CommunicationsLogComponent implements OnInit {
  communications$!: Observable<Communication[]>
  newMessage = ''

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.communications$ = this.dashboardService.communications$
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return

    this.dashboardService.addCommunication({
      sender: 'You',
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
      message: this.newMessage,
      avatar: '/assets/placeholder.svg',
      unread: false,
    })

    this.newMessage = ''
  }
}
