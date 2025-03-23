import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

interface ActionButton {
  icon: string
  label: string
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm rounded-lg border"
    >
      <div class="pb-2 px-6 pt-6">
        <div class="text-slate-100 text-base font-medium">Quick Actions</div>
      </div>
      <div class="px-6 pb-6">
        <div class="grid grid-cols-2 gap-3">
          <button
            *ngFor="let action of actions"
            class="h-auto py-3 px-3 border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full rounded-md"
          >
            <span [innerHTML]="action.icon" class="text-cyan-500"></span>
            <span class="text-xs">{{ action.label }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class QuickActionsComponent {
  actions: ActionButton[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-5 w-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>`,
      label: 'Security Scan',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-5 w-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"></path>
            </svg>`,
      label: 'Sync Data',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-5 w-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>`,
      label: 'Backup',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-5 w-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>`,
      label: 'Console',
    },
  ]
}
