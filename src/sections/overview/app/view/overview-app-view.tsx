import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';
import { _mock, _appAuthors, _appRelated, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from '../app-widget';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';
import { AppTopRelated } from '../app-top-related';
import { AppAreaInstalled } from '../app-area-installed';
import { AppTopInstalledCountries } from '../app-top-installed-countries';
import { EcommerceWidgetSummary } from '../../e-commerce/ecommerce-widget-summary';
import { EcommerceSalesOverview } from '../../e-commerce/ecommerce-sales-overview';
import { EcommerceCurrentBalance } from '../../e-commerce/ecommerce-current-balance';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const _ecommerceSalesOverview = ['Total de vendas', 'Total de alugueis'].map(
    (label, index) => ({
      label,
      totalAmount: _mock.number.price(index) * 100,
      value: _mock.number.percent(index),
    })
  );

  //apenas mock, é pra vir do back
  const mesesEmPortugues = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const nomeDoMesAtual = mesesEmPortugues[mesAtual];

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {/* <Grid size={{ xs: 12, md: 12 }}>
          <AppWelcome
            title={`Crie seu primeiro produto agora! `}
            description="Para começar a gerenciar suas vendas, basta adicionar seu primeiro produto."
            img={<SeoIllustration hideBackground />}
            action={
              <Button variant="contained" color="primary">
                Criar meu primeiro produto
              </Button>
            }
          />
        </Grid> */}

        <Grid size={{ xs: 12, md: 3 }}>
          <EcommerceWidgetSummary
            title="Imóveis cadastrados"
            percent={2.6}
            total={12}
            time='últimos 7 dias'
          // chart={{
          //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          //   series: [22, 8, 35, 50, 82, 84, 77, 12],
          // }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <EcommerceWidgetSummary
            title="Alugueis cadastrados"
            percent={-2.6}
            total={0}
            time='últimos 7 dias'
          // chart={{
          //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          //   series: [22, 8, 35, 50, 82, 84, 77, 12],
          // }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <EcommerceWidgetSummary
            title="Novos empreendimentos"
            percent={10}
            total={1}
            time='último mês'
          // chart={{
          //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          //   series: [22, 8, 35, 50, 82, 84, 77, 12],
          // }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <EcommerceWidgetSummary
            title="Novos clientes"
            percent={3}
            total={7}
            time='últimos 7 dias'
          // chart={{
          //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          //   series: [22, 8, 35, 50, 82, 84, 77, 12],
          // }}
          />
        </Grid>


        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <EcommerceSalesOverview
            title={`Visão geral de ${nomeDoMesAtual}`}
            data={_ecommerceSalesOverview}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title={`Total de ganhos em ${nomeDoMesAtual}`}
            earning={25500}
            refunded={1600}
            orderTotal={287650}
            currentBalance={187650}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AppAreaInstalled
            title="Area installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  name: '2022',
                  data: [
                    { name: 'Asia', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: 'Europe', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: 'Americas', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    { name: 'Asia', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Europe', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Americas', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                  ],
                },
                {
                  name: '2024',
                  data: [
                    { name: 'Asia', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Europe', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Americas', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <AppNewInvoice
            title="New invoice"
            tableData={_appInvoices}
            headCells={[
              { id: 'id', label: 'Invoice ID' },
              { id: 'category', label: 'Category' },
              { id: 'price', label: 'Price' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTopRelated title="Related applications" list={_appRelated} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTopAuthors title="Top authors" list={_appAuthors} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{ series: 48 }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
