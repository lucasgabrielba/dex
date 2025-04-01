import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { OnboardingForm } from 'src/components/onboarding';


// ----------------------------------------------------------------------

const metadata = { title: `Onboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OnboardingForm />
    </>
  );
}
