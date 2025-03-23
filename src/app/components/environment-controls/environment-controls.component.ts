import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

interface ControlItem {
  icon: string
  label: string
  enabled: boolean
}

@Component({
  selector: 'app-environment-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm rounded-lg border"
    >
      <div class="pb-2 px-6 pt-6">
        <div class="text-slate-100 text-base font-medium">
          Environment Controls
        </div>
      </div>
      <div class="px-6 pb-6">
        <div class="space-y-4">
          <div
            *ngFor="let control of controls; let i = index"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <span
                [innerHTML]="control.icon"
                class="text-cyan-500 mr-2"
              ></span>
              <label class="text-sm text-slate-400">{{ control.label }}</label>
            </div>
            <div class="relative inline-block w-10 align-middle select-none">
              <input
                type="checkbox"
                [id]="'toggle-' + i"
                [(ngModel)]="control.enabled"
                class="sr-only peer"
              />
              <label
                [for]="'toggle-' + i"
                class="block h-6 overflow-hidden rounded-full bg-slate-700 cursor-pointer peer-checked:bg-cyan-600"
              >
                <span
                  class="absolute block h-4 w-4 rounded-full bg-white top-1 left-1 transition-transform duration-200 ease-in-out peer-checked:translate-x-4"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EnvironmentControlsComponent {
  controls: ControlItem[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
            </svg>`,
      label: 'Power Management',
      enabled: false,
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>`,
      label: 'Security Protocol',
      enabled: true,
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>`,
      label: 'Power Saving Mode',
      enabled: false,
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-4 w-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>`,
      label: 'Auto Shutdown',
      enabled: true,
    },
  ]
}
