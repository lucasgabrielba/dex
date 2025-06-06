import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { OnboardingLayout } from 'src/layouts/onboarding';

import { SplashScreen } from 'src/components/loading-screen';

import { AuthGuard, OnboardingGuard } from 'src/auth/guard';

const Onboarding = {
  OnboardingMultiSteps: lazy(() => import('src/pages/onboarding')),
};

const onboarding = {
  path: '',
  element: (
    <OnboardingLayout>
      <Outlet />
    </OnboardingLayout>
  ),
  children: [
    { path: '', element: <Onboarding.OnboardingMultiSteps /> },
  ],
};

// ----------------------------------------------------------------------

export const onboardingRoutes: RouteObject[] = [
  {
    path: 'onboarding',
    element: (
      <AuthGuard>
        <OnboardingGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </OnboardingGuard>
      </AuthGuard>
    ),
    children: [onboarding],
  },
];
