import type { IUserAccountBillingHistory } from 'src/types/user';
import type { IPaymentCard, IAddressItem } from 'src/types/common';

import Grid from '@mui/material/Grid2';

import { AccountBillingPlan } from './account-billing-plan';
import { AccountBillingPayment } from './account-billing-payment';
import { AccountBillingHistory } from './account-billing-history';
import { CompanyDetails } from './account-billing-company-details';

// ----------------------------------------------------------------------

type Props = {
  plans: {
    subscription: string;
    price: number;
    primary: boolean;
  }[];
  cards: IPaymentCard[];
  addressBook: IAddressItem[];
  invoices: IUserAccountBillingHistory[];
};

export function AccountBilling({ cards, plans, invoices, addressBook }: Props) {

  const companyData = {
    id: '1',
    name: 'Imobiliária ABC',
    address: 'Av. Antônio Fidélis, 970 - Parque Amazônia, Goiânia-GO, 74840-090',
    cnpj: '00.000.000/0000-00',
    tradeName: 'Nome fantasia',
  };

  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <AccountBillingPlan plans={plans} cardList={cards} addressBook={addressBook} />
        <AccountBillingPayment cards={cards} />
        {/* <AccountBillingAddress addressBook={addressBook} /> */}
        <CompanyDetails company={companyData} />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AccountBillingHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
