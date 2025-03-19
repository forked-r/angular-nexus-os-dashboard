import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
          class="h-8 w-8 text-cyan-500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="21 16 21 8 12 2 3 8 3 16 12 22 21 16"></polygon>
        </svg>
        <span class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          NEXUS OS
        </span>
      </div>

      <div class="flex items-center space-x-6">
        <div class="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            class="h-4 w-4 text-slate-400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search systems..."
            class="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
          />
        </div>

        <div class="flex items-center space-x-3">
          <button class="relative text-slate-400 hover:text-slate-100 bg-transparent border-none p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-5 w-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
          </button>

          <button 
            class="text-slate-400 hover:text-slate-100 bg-transparent border-none p-2 rounded-md"
            (click)="toggleTheme()">
            <svg *ngIf="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-5 w-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg *ngIf="theme === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              class="h-5 w-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>

          <div class="relative inline-block h-8 w-8 rounded-full bg-slate-700 text-cyan-500 flex items-center justify-center overflow-hidden">
            <img src="/assets/placeholder.svg" alt="User" class="h-full w-full object-cover" />
            <span class="absolute inset-0 flex items-center justify-center">CM</span>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Input() theme: "dark" | "light" = "dark"
  @Output() themeToggled = new EventEmitter<void>()
  toggleTheme() {
     this.theme = this.theme === "dark" ? "light" : "dark"
     const body = document.body;
     if (this.theme === "dark") {
         body.classList.add('dark-theme');
         body.classList.remove('light-theme');
     } else {
         body.classList.add('light-theme');
         body.classList.remove('dark-theme');
     }
  }
}

