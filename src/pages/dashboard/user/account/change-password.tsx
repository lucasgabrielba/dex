import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AccountChangePasswordView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

const metadata = { title: `Segurança da conta | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountChangePasswordView />
    </>
  );
}
