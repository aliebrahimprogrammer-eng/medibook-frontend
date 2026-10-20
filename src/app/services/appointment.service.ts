
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppointmentRequest {
  doctorId: number;
  startDateTime: string;
  endDateTime: string;
  reason?: string;
}

export interface AppointmentResponse {
  id: number;
  patientId: number;
  doctorId: number;
  doctorName: string;
  startDateTime: string;
  endDateTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  reason: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/appointments';

  createAppointment(
    request: AppointmentRequest,
  ): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(
      this.apiUrl,
      request,
    );
  }
}
