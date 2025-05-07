import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { PropertyDevelopmentListView } from 'src/sections/property/view/property-development-list-view';


// ----------------------------------------------------------------------

const metadata = { title: `Lista de empreendimentos | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PropertyDevelopmentListView />
    </>
  );
}
