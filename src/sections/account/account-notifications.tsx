import type { CardProps } from '@mui/material/Card';

import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Switch from '@mui/material/Switch';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';

import { toast } from 'src/components/snackbar';
import { Form } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    subheader: 'Atividade',
    caption: 'Donec mi odio, faucibus at, scelerisque quis',
    items: [
      { id: 'activity_comments', label: 'Envie-me um e-mail quando alguém comentar no meu artigo' },
      { id: 'activity_answers', label: 'Envie-me um e-mail quando alguém responder ao meu formulário' },
      { id: 'activityFollows', label: 'Envie-me um e-mail quando alguém me seguir' },
    ],
  },
  {
    subheader: 'Aplicativo',
    caption: 'Donec mi odio, faucibus at, scelerisque quis',
    items: [
      { id: 'application_news', label: 'Notícias e anúncios' },
      { id: 'application_product', label: 'Atualizações semanais do produto' },
      { id: 'application_blog', label: 'Resumo semanal do blog' },
    ],
  },
];

// ----------------------------------------------------------------------

export function AccountNotifications({ sx, ...other }: CardProps) {
  const methods = useForm({
    defaultValues: { selected: ['activity_comments', 'application_product'] },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Atualização realizada com sucesso!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card
        sx={[
          {
            p: 3,
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {NOTIFICATIONS.map((notification) => (
          <Grid key={notification.subheader} container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ListItemText
                primary={notification.subheader}
                secondary={notification.caption}
                slotProps={{
                  primary: { sx: { typography: 'h6' } },
                  secondary: { sx: { mt: 0.5 } },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  p: 3,
                  gap: 1,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.neutral',
                }}
              >
                <Controller
                  name="selected"
                  control={control}
                  render={({ field }) => (
                    <>
                      {notification.items.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          label={item.label}
                          labelPlacement="start"
                          control={
                            <Switch
                              checked={field.value.includes(item.id)}
                              onChange={() => field.onChange(getSelected(values.selected, item.id))}
                              inputProps={{
                                id: `${item.label}-switch`,
                                'aria-label': `${item.label} switch`,
                              }}
                            />
                          }
                          sx={{ m: 0, width: 1, justifyContent: 'space-between' }}
                        />
                      ))}
                    </>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        ))}

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Salvar ajustes
        </LoadingButton>
      </Card>
    </Form>
  );
}