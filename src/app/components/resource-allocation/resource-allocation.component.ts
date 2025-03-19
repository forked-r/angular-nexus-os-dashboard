import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-resource-allocation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm rounded-lg border"
    >
      <div class="pb-2 px-6 pt-6">
        <div class="text-slate-100 text-base font-medium">
          Resource Allocation
        </div>
      </div>
      <div class="px-6 pb-6">
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between mb-1">
              <div class="text-sm text-slate-400">Processing Power</div>
              <div class="text-xs text-cyan-400">{{ cpuUsage }}% allocated</div>
            </div>
            <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                [style.width.%]="cpuUsage"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <div class="text-sm text-slate-400">Memory Allocation</div>
              <div class="text-xs text-purple-400">
                {{ memoryUsage }}% allocated
              </div>
            </div>
            <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                [style.width.%]="memoryUsage"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <div class="text-sm text-slate-400">Network Bandwidth</div>
              <div class="text-xs text-blue-400">35% allocated</div>
            </div>
            <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style="width: 35%"
              ></div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-700/50">
            <div class="flex items-center justify-between text-sm">
              <div class="text-slate-400">Priority Level</div>
              <div class="flex items-center">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  [(ngModel)]="priorityLevel"
                  class="w-24 mr-2 accent-cyan-500 bg-slate-700 h-1 rounded-lg appearance-none cursor-pointer"
                />
                <span class="text-cyan-400">{{ priorityLevel }}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResourceAllocationComponent {
  @Input() cpuUsage = 42
  @Input() memoryUsage = 68
  @Input() networkStatus = 92
  priorityLevel = 3
}
