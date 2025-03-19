import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"

export interface SystemMetrics {
  cpuUsage: number
  memoryUsage: number
  networkStatus: number
  systemStatus: number
  securityLevel: number
}

export interface Alert {
  id: number
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
}

export interface Communication {
  id: number
  sender: string
  time: string
  message: string
  avatar: string
  unread: boolean
}

export interface Process {
  pid: string
  name: string
  user: string
  cpu: number
  memory: number
  status: string
}

export interface Storage {
  name: string
  total: number
  used: number
  type: string
}

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private metricsSubject = new BehaviorSubject<SystemMetrics>({
    cpuUsage: 42,
    memoryUsage: 68,
    networkStatus: 92,
    systemStatus: 85,
    securityLevel: 75,
  })

  private alertsSubject = new BehaviorSubject<Alert[]>([
    {
      id: 1,
      title: "Security Scan Complete",
      time: "14:32:12",
      description: "No threats detected in system scan",
      type: "info",
    },
    {
      id: 2,
      title: "Bandwidth Spike Detected",
      time: "13:45:06",
      description: "Unusual network activity on port 443",
      type: "warning",
    },
    {
      id: 3,
      title: "System Update Available",
      time: "09:12:45",
      description: "Version 12.4.5 ready to install",
      type: "update",
    },
    {
      id: 4,
      title: "Backup Completed",
      time: "04:30:00",
      description: "Incremental backup to drive E: successful",
      type: "success",
    },
  ])

  private communicationsSubject = new BehaviorSubject<Communication[]>([
    {
      id: 1,
      sender: "System Administrator",
      time: "15:42:12",
      message: "Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.",
      avatar: "/assets/placeholder.svg",
      unread: true,
    },
    {
      id: 2,
      sender: "Security Module",
      time: "14:30:45",
      message: "Unusual login attempt blocked from IP 192.168.1.45. Added to watchlist.",
      avatar: "/assets/placeholder.svg",
      unread: true,
    },
    {
      id: 3,
      sender: "Network Control",
      time: "12:15:33",
      message: "Bandwidth allocation adjusted for priority services during peak hours.",
      avatar: "/assets/placeholder.svg",
      unread: true,
    },
    {
      id: 4,
      sender: "Data Center",
      time: "09:05:18",
      message: "Backup verification complete. All data integrity checks passed.",
      avatar: "/assets/placeholder.svg",
      unread: true,
    },
  ])

  private processesSubject = new BehaviorSubject<Process[]>([
    { pid: "1024", name: "system_core.exe", user: "SYSTEM", cpu: 12.4, memory: 345, status: "running" },
    { pid: "1842", name: "nexus_service.exe", user: "SYSTEM", cpu: 8.7, memory: 128, status: "running" },
    { pid: "2156", name: "security_monitor.exe", user: "ADMIN", cpu: 5.2, memory: 96, status: "running" },
    { pid: "3012", name: "network_manager.exe", user: "SYSTEM", cpu: 3.8, memory: 84, status: "running" },
    { pid: "4268", name: "user_interface.exe", user: "USER", cpu: 15.3, memory: 256, status: "running" },
    { pid: "5124", name: "data_analyzer.exe", user: "ADMIN", cpu: 22.1, memory: 512, status: "running" },
  ])

  private storageSubject = new BehaviorSubject<Storage[]>([
    { name: "System Drive (C:)", total: 512, used: 324, type: "SSD" },
    { name: "Data Drive (D:)", total: 2048, used: 1285, type: "HDD" },
    { name: "Backup Drive (E:)", total: 4096, used: 1865, type: "HDD" },
    { name: "External Drive (F:)", total: 1024, used: 210, type: "SSD" },
  ])

  get metrics$(): Observable<SystemMetrics> {
    return this.metricsSubject.asObservable()
  }

  get alerts$(): Observable<Alert[]> {
    return this.alertsSubject.asObservable()
  }

  get communications$(): Observable<Communication[]> {
    return this.communicationsSubject.asObservable()
  }

  get processes$(): Observable<Process[]> {
    return this.processesSubject.asObservable()
  }

  get storage$(): Observable<Storage[]> {
    return this.storageSubject.asObservable()
  }

  updateMetrics(metrics: Partial<SystemMetrics>): void {
    this.metricsSubject.next({
      ...this.metricsSubject.value,
      ...metrics,
    })
  }

  markCommunicationAsRead(id: number): void {
    const communications = this.communicationsSubject.value
    const updatedCommunications = communications.map((comm) => (comm.id === id ? { ...comm, unread: false } : comm))
    this.communicationsSubject.next(updatedCommunications)
  }

  addCommunication(communication: Omit<Communication, "id">): void {
    const communications = this.communicationsSubject.value
    const newId = Math.max(...communications.map((c) => c.id), 0) + 1
    this.communicationsSubject.next([{ id: newId, ...communication }, ...communications])
  }
}

