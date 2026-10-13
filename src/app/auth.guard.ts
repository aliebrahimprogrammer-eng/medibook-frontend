
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from './services/auth.service';
import { ProfileService, UserRole } from './services/profile.service';

function dashboardPath(role: UserRole): string {
  switch (role) {
    case 'PATIENT':
      return '/patient';
    case 'DOCTOR':
      return '/doctor';
    case 'ADMIN':
      return '/admin';
  }
}

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.parseUrl('/login');
  }

  const allowedRoles = route.data['roles'] as UserRole[];

  return profileService.getMyProfile().pipe(
    map((profile) => {
      if (allowedRoles.includes(profile.role)) {
        return true;
      }

      return router.parseUrl(dashboardPath(profile.role));
    }),
    catchError(() => {
      authService.logout();
      return of(router.parseUrl('/login'));
    }),
  );
};
