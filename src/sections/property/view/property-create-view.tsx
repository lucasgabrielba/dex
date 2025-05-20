import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PropertyNewEditForm } from '../property-new-edit-form';


// ----------------------------------------------------------------------

export function PropertyCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Cadastrar novo imóvel"
        links={[
          { name: 'Painel', href: paths.dashboard.root },
          { name: 'Imóveis', href: paths.dashboard.user.root },
          { name: 'Cadastrar novo imóvel' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PropertyNewEditForm />
    </DashboardContent>
  );
}
