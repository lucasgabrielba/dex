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

import { PROPERTY_PUBLISH_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { PropertyDetailsSkeleton } from '../property-skeleton';
import { PropertyDetailsReview } from '../property-details-review';
import { PropertyDetailsSummary } from '../property-details-summary';
import { PropertyDetailsToolbar } from '../property-details-toolbar';
import { PropertyDetailsCarousel } from '../property-details-carousel';
import { PropertyDetailsDescription } from '../property-details-description';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 days replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

type Props = {
  property?: IPropertyItem;
  loading?: boolean;
  error?: any;
};

export function PropertyDetailsView({ property, error, loading }: Props) {
  const tabs = useTabs('description');

  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (property) {
      setPublish(property?.publish);
    }
  }, [property]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
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
          title="Property not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.property.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
        />
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <PropertyDetailsToolbar
        backHref={paths.dashboard.property.root}
        liveHref={paths.property.details(`${property?.id}`)}
        editHref={paths.dashboard.property.edit(`${property?.id}`)}
        publish={publish}
        onChangePublish={handleChangePublish}
        publishOptions={PROPERTY_PUBLISH_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <PropertyDetailsCarousel images={property?.images ?? []} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          {property && <PropertyDetailsSummary disableActions property={property} />}
        </Grid>
      </Grid>

      <Box
        sx={{
          gap: 5,
          my: 10,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
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
            { value: 'description', label: 'Description' },
            { value: 'reviews', label: `Reviews (${property?.reviews.length})` },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'description' && (
          <PropertyDetailsDescription description={property?.description ?? ''} />
        )}

        {tabs.value === 'reviews' && (
          <PropertyDetailsReview
            ratings={property?.ratings ?? []}
            reviews={property?.reviews ?? []}
            totalRatings={property?.totalRatings ?? 0}
            totalReviews={property?.totalReviews ?? 0}
          />
        )}
      </Card>
    </DashboardContent>
  );
}
