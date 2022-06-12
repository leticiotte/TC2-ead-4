import { Router } from '@angular/router';

export function isUserAuthenticated(router: Router) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
}
