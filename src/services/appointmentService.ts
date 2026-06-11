export interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  doctor: string;
  createdAt: string;
}

const STORAGE_KEY = 'health_buddy_appointments';

class AppointmentService {
  private getAll(): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveAll(appointments: Appointment[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }

  public fetchAppointments(): Appointment[] {
    return this.getAll().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const newAppointment: Appointment = {
      ...appointment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const all = this.getAll();
    all.push(newAppointment);
    this.saveAll(all);
    return newAppointment;
  }

  public deleteAppointment(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter(a => a.id !== id);
    if (filtered.length === all.length) return false;
    this.saveAll(filtered);
    return true;
  }
}

export const appointmentService = new AppointmentService();
