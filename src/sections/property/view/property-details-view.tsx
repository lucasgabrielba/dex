import type { IPropertyItem } from 'src/types/property';

import { useTabs } from 'minimal-shared/hooks';
import { varAlpha } from 'minimal-shared/utils';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';
import { PROPERTY_STATUS_OPTIONS } from 'src/_mock/_property';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { PropertyDetailsSkeleton } from '../property-skeleton';
import { PropertyDetailsSummary } from '../property-details-summary';
import { PropertyDetailsToolbar } from '../property-details-toolbar';
import { PropertyDetailsCarousel } from '../property-details-carousel';

type Props = {
  property?: IPropertyItem;
  loading?: boolean;
  error?: any;
};

export function PropertyDetailsView({ property, error, loading }: Props) {
  const tabs = useTabs('imovel');

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (property) {
      setStatus(property?.status);
    }
  }, [property]);

  const handleChangeStatus = useCallback((newValue: string) => {
    setStatus(newValue);
  }, []);

  if (loading) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <PropertyDetailsSkeleton />
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <EmptyContent
          filled
          title="Imóvel não encontrado!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.property.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Voltar para lista
            </Button>
          }
          sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
        />
      </DashboardContent>
    );
  }

  const renderPropertyTab = () => (
    <Box sx={{ p: 3 }}>
      {/* Descrição */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Descrição
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
        {property?.propertyDescription || `Imóvel aconchegante para alugar com ${property?.bedrooms || 2} quartos e ${property?.bathrooms || 1} banheiro no total. é ideal para quem procura conforto e comodidade. O condomínio é bem equipado com diversas instalações, apropriado para quem busca lazer sem sair de casa e fica localizado em ${property?.address || 'excelente localização'}. Está bem localizado, próximo a pontos de interesse importantes.`}
      </Typography>

      {/* Itens disponíveis */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Itens disponíveis
      </Typography>
      <Box component="ul" sx={{ mb: 4, pl: 2 }}>
        {(property?.amenities || ['Box', 'Armários no quarto', 'Armários nos banheiros', 'Armários na cozinha']).map((item, index) => (
          <Box component="li" key={index} sx={{ mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Especificações */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Especificações
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Tamanho</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.area || 72} m2</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Andar</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.floor || '9º andar'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Quantidade de quartos</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.bedrooms || 3}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Suítes</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.suites || 2}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Banheiros</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.bathrooms || 2}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Vagas de garagem</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.parkingSpaces || 2}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Valor do IPTU</Typography>
          <Typography variant="body2" fontWeight="medium">
            R$ {property?.iptuValue?.toFixed(2) || '700,00'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Posição em relação ao Sol</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.sunPosition || 'Face Oeste'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Possui mobília</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.furnished ? 'Sim' : 'Não'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Possui varanda?</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.hasBalcony ? 'Sim' : 'Não'}</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderCondominiumTab = () => (
    <Box sx={{ p: 3 }}>
      {/* Endereço */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Endereço
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Valor do condomínio</Typography>
          <Typography variant="body2" fontWeight="medium">
            R$ {property?.condominiumFee?.toFixed(2) || '140,00'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Andar</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.floor || '9º andar'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Posição em relação ao Sol</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.sunPosition || 'Face Oeste'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Quantidades de andares</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.totalFloors || 32} andares</Typography>
        </Box>
      </Box>

      {/* Veja o que tem no condomínio */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Veja o que tem no condomínio:
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        {(property?.condominiumAmenities || [
          'Playground',
          'Piscina',
          'Churrasqueira',
          'Quadra esportiva',
          'Área comum',
          'Elevador',
          'Portaria 24h'
        ]).map((item, index) => (
          <Box component="li" key={index} sx={{ mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderLocationTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Endereço do imóvel
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">CEP</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.cep || property?.zipCode || '000000-000'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Rua</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.street || 'Rua 53'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Número</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.streetNumber || '285'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Bairro</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.neighborhood || 'Jardim Goias'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Cidade</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.city || 'Goiânia'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Estado</Typography>
          <Typography variant="body2" fontWeight="medium">{property?.state || 'Goiás'}</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <DashboardContent>
      <PropertyDetailsToolbar
        backHref={paths.dashboard.property.root}
        liveHref={paths.dashboard.property.details(`${property?.id}`)}
        editHref={paths.dashboard.property.edit(`${property?.id}`)}
        publish={status}
        onChangePublish={handleChangeStatus}
        publishOptions={PROPERTY_STATUS_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <PropertyDetailsCarousel images={property?.images ?? []} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          {property && <PropertyDetailsSummary disableActions property={property} />}
        </Grid>
      </Grid>

      <Card sx={{ my: 5 }}>
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={[
            (theme) => ({
              px: 3,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }),
          ]}
        >
          {[
            { value: 'imovel', label: 'Imóvel' },
            { value: 'condominio', label: 'Condomínio' },
            { value: 'endereco', label: 'Endereço' },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'imovel' && renderPropertyTab()}

        {tabs.value === 'condominio' && renderCondominiumTab()}

        {tabs.value === 'endereco' && renderLocationTab()}
      </Card>
    </DashboardContent>
  );
}