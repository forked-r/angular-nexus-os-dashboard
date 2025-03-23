import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-security-status',
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
            class="mr-2 h-5 w-5 text-green-500"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          Security Status
        </div>
      </div>
      <div class="px-6 pb-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-400">Firewall</div>
            <span
              class="bg-green-500/20 text-green-400 border border-green-500/50 text-xs px-2 py-0.5 rounded-full"
            >
              Active
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-400">Intrusion Detection</div>
            <span
              class="bg-green-500/20 text-green-400 border border-green-500/50 text-xs px-2 py-0.5 rounded-full"
            >
              Active
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-400">Encryption</div>
            <span
              class="bg-green-500/20 text-green-400 border border-green-500/50 text-xs px-2 py-0.5 rounded-full"
            >
              Active
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-400">Threat Database</div>
            <div class="text-sm text-cyan-400">
              Updated <span class="text-slate-500">12 min ago</span>
            </div>
          </div>

          <div class="pt-2 mt-2 border-t border-slate-700/50">
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm font-medium">Security Level</div>
              <div class="text-sm text-cyan-400">{{ securityLevel }}%</div>
            </div>
            <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                [style.width.%]="securityLevel"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SecurityStatusComponent {
  @Input() securityLevel = 75
}
