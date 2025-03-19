import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-system-time',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden rounded-lg border"
    >
      <div
        class="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50"
      >
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
          <div class="text-3xl font-mono text-cyan-400 mb-1">
            {{ formatTime(currentTime) }}
          </div>
          <div class="text-sm text-slate-400">
            {{ formatDate(currentTime) }}
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-2 gap-3">
          <div
            class="bg-slate-800/50 rounded-md p-3 border border-slate-700/50"
          >
            <div class="text-xs text-slate-500 mb-1">Uptime</div>
            <div class="text-sm font-mono text-slate-200">14d 06:42:18</div>
          </div>
          <div
            class="bg-slate-800/50 rounded-md p-3 border border-slate-700/50"
          >
            <div class="text-xs text-slate-500 mb-1">Time Zone</div>
            <div class="text-sm font-mono text-slate-200">UTC-08:00</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SystemTimeComponent {
  @Input() currentTime = new Date()

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
}
