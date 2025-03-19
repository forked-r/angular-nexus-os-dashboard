import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

interface NavItem {
  icon: string
  label: string
  active?: boolean
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full rounded-lg border p-4">
      <nav class="space-y-2">
        <button *ngFor="let item of navItems" 
          class="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-left"
          [ngClass]="item.active ? 'bg-slate-800/70 text-cyan-400' : 'text-slate-400 hover:text-slate-100'">
          <span [innerHTML]="item.icon"></span>
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="mt-8 pt-6 border-t border-slate-700/50">
        <div class="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
        <div class="space-y-3">
          <div *ngFor="let status of statusItems">
            <div class="flex items-center justify-between mb-1">
              <div class="text-xs text-slate-400">{{ status.label }}</div>
              <div class="text-xs text-slate-400">{{ status.value }}%</div>
            </div>
            <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full" 
                [ngClass]="status.colorClass"
                [style.width.%]="status.value"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SidebarComponent {
  @Input() systemStatus = 85
  @Input() securityLevel = 75
  @Input() networkStatus = 92

  navItems: NavItem[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3 19 7 15 11"></path><path d="M19 7H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14"></path>
            </svg>`,
      label: "Dashboard",
      active: true,
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>`,
      label: "Diagnostics",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>`,
      label: "Data Center",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>`,
      label: "Network",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>`,
      label: "Security",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>`,
      label: "Console",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>`,
      label: "Communications",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mr-2 h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>`,
      label: "Settings",
    },
  ]

  get statusItems() {
    return [
      { label: "Core Systems", value: this.systemStatus, colorClass: "bg-gradient-to-r from-cyan-500 to-blue-500" },
      { label: "Security", value: this.securityLevel, colorClass: "bg-gradient-to-r from-green-500 to-emerald-500" },
      { label: "Network", value: this.networkStatus, colorClass: "bg-gradient-to-r from-blue-500 to-indigo-500" },
    ]
  }
}

