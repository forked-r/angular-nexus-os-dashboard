import { Component, type OnInit, type OnDestroy, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { interval, type Subscription } from "rxjs"

// import type { DashboardService } from "./services/dashboard.service"
import { HeaderComponent } from "./components/header/header.component"
import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { SystemOverviewComponent } from "./components/system-overview/system-overview.component"
import { SecurityStatusComponent } from "./components/security-status/security-status.component"
import { SystemAlertsComponent } from "./components/system-alerts/system-alerts.component"
import { CommunicationsLogComponent } from "./components/communications-log/communications-log.component"
import { SystemTimeComponent } from "./components/system-time/system-time.component"
import { QuickActionsComponent } from "./components/quick-actions/quick-actions.component"
import { ResourceAllocationComponent } from "./components/resource-allocation/resource-allocation.component"
import { EnvironmentControlsComponent } from "./components/environment-controls/environment-controls.component"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  update: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent,
    SystemOverviewComponent,
    SecurityStatusComponent,
    SystemAlertsComponent,
    CommunicationsLogComponent,
    SystemTimeComponent,
    QuickActionsComponent,
    ResourceAllocationComponent,
    EnvironmentControlsComponent,
  ],
  template: `
    <div [ngClass]="theme" class="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
      <!-- Background particle effect -->
      <canvas #canvasRef class="absolute inset-0 w-full h-full opacity-30"></canvas>

      <!-- Loading overlay -->
      <div *ngIf="isLoading" class="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
        <div class="flex flex-col items-center">
          <div class="relative w-24 h-24">
            <div class="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
            <div class="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
            <div class="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
            <div class="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
          <div class="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
        </div>
      </div>

      <div class="container mx-auto p-4 relative z-10">
        <!-- Header -->
        <app-header [theme]="theme" (themeToggled)="toggleTheme()"></app-header>

        <!-- Main content -->
        <div class="grid grid-cols-12 gap-6">
          <!-- Sidebar -->
          <div class="col-span-12 md:col-span-3 lg:col-span-2">
            <app-sidebar 
              [systemStatus]="systemStatus" 
              [securityLevel]="securityLevel" 
              [networkStatus]="networkStatus">
            </app-sidebar>
          </div>

          <!-- Main dashboard -->
          <div class="col-span-12 md:col-span-9 lg:col-span-7">
            <div class="grid gap-6">
              <!-- System overview -->
              <app-system-overview 
                [cpuUsage]="cpuUsage" 
                [memoryUsage]="memoryUsage" 
                [networkStatus]="networkStatus">
              </app-system-overview>

              <!-- Security & Alerts -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <app-security-status [securityLevel]="securityLevel"></app-security-status>
                <app-system-alerts></app-system-alerts>
              </div>

              <!-- Communications -->
              <app-communications-log></app-communications-log>
            </div>
          </div>

          <!-- Right sidebar -->
          <div class="col-span-12 lg:col-span-3">
            <div class="grid gap-6">
              <!-- System time -->
              <app-system-time [currentTime]="currentTime"></app-system-time>
              
              <!-- Quick actions -->
              <app-quick-actions></app-quick-actions>
              
              <!-- Resource allocation -->
              <app-resource-allocation 
                [cpuUsage]="cpuUsage" 
                [memoryUsage]="memoryUsage" 
                [networkStatus]="networkStatus">
              </app-resource-allocation>
              
              <!-- Environment controls -->
              <app-environment-controls></app-environment-controls>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("canvasRef") canvasRef!: ElementRef<HTMLCanvasElement>

  theme: "dark" | "light" = "dark"
  systemStatus = 85
  cpuUsage = 42
  memoryUsage = 68
  networkStatus = 92
  securityLevel = 75
  currentTime = new Date()
  isLoading = true

  private timeSubscription?: Subscription
  private dataSubscription?: Subscription
  private particles: Particle[] = []
  private animationFrameId?: number

  constructor() {}

  ngOnInit(): void {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false
    }, 2000)

    // Update time
    this.timeSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date()
    })

    // Simulate changing data
    this.dataSubscription = interval(3000).subscribe(() => {
      this.cpuUsage = Math.floor(Math.random() * 30) + 30
      this.memoryUsage = Math.floor(Math.random() * 20) + 60
      this.networkStatus = Math.floor(Math.random() * 15) + 80
      this.systemStatus = Math.floor(Math.random() * 10) + 80
    })
  }

  ngAfterViewInit(): void {
    this.initCanvas()
  }

  ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe()
    this.dataSubscription?.unsubscribe()
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === "dark" ? "light" : "dark"
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particleCount = 100
    this.particles = []

    class ParticleImpl implements Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update(): void {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new ParticleImpl(canvas))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of this.particles) {
        particle.update()
        particle.draw(ctx)
      }

      this.animationFrameId = requestAnimationFrame(animate)
    }

    animate()
  }
}

