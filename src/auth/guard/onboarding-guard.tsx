import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export type OnboardingGuardProps = {
  children: React.ReactNode;
};

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    // If user is logged in but has no organization, force onboarding
    if (user && !user.current_organization_id) {
      if (pathname !== paths.onboarding.root) {
        router.replace(paths.onboarding.root);
      } else {
        setIsChecking(false);
      }
      return;
    }

    // If user has organization but tries to access onboarding, redirect to dashboard
    if (user && user.current_organization_id && pathname.startsWith(paths.onboarding.root)) {
      router.replace(paths.dashboard.root);
      return;
    }

    setIsChecking(false);
  }, [user, loading, pathname, router]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
