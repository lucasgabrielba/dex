import type { IClientItem } from 'src/types/client';

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewClientSchemaType = zod.infer<typeof NewClientSchema>;

export const NewClientSchema = zod.object({
  avatarUrl: schemaHelper.file({ message: 'Avatar é obrigatório!' }),
  name: zod.string().min(1, { message: 'Nome é obrigatório!' }),
  email: zod
    .string()
    .min(1, { message: 'Email é obrigatório!' })
    .email({ message: 'Email deve ser um endereço de email válido!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(zod.string().min(1, { message: 'País é obrigatório!' }), {
    message: 'País é obrigatório!',
  }),
  address: zod.string().min(1, { message: 'Endereço é obrigatório!' }),
  company: zod.string().min(1, { message: 'Empresa é obrigatória!' }),
  state: zod.string().min(1, { message: 'Estado é obrigatório!' }),
  city: zod.string().min(1, { message: 'Cidade é obrigatória!' }),
  zipCode: zod.string().min(1, { message: 'CEP é obrigatório!' }),
  interestedProduct: zod.string().min(1, { message: 'Produto interessado é obrigatório!' }),
  interestUnit: zod.string().min(1, { message: 'Unidade de interesse é obrigatória!' }),
  status: zod.string(),
  isVerified: zod.boolean(),
  privateLead: zod.boolean(),
});

// ----------------------------------------------------------------------

type Props = {
  currentClient?: IClientItem;
};

export function LeadNewEditForm({ currentClient }: Props) {
  const router = useRouter();

  const defaultValues: NewClientSchemaType = {
    status: '',
    avatarUrl: null,
    isVerified: true,
    privateLead: false,
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    address: '',
    zipCode: '',
    company: '',
    interestedProduct: '',
    interestUnit: '',
  };

  const methods = useForm<NewClientSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewClientSchema),
    defaultValues,
    values: currentClient,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentClient ? 'Atualizado com sucesso!' : 'Criado com sucesso!');
      router.push(paths.dashboard.client.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* Coluna da esquerda - Avatar e configurações */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 5, pb: 5, px: 3 }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Permitido *.jpeg, *.jpg, *.png, *.gif
                    <br />
                    Tamanho máximo de {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            <FormControlLabel
              labelPlacement="start"
              control={
                <Controller
                  name="privateLead"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Privar lead
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Ativar esta opção so você verá as informações e dados desse lead
                  </Typography>
                </Box>
              }
              sx={{
                mx: 0,
                mb: 2,
                width: 1,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            />

            {currentClient && (
              <Stack sx={{ mt: 3, alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="soft" color="error">
                  Excluir cliente
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        {/* Coluna da direita - Formulário */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="name" label="Nome" />
              <Field.Text name="email" label="Email" />
              <Field.Phone
                name="phoneNumber"
                label="Telefone"
                country={!currentClient ? 'BR' : undefined}
              />
              <Field.Text name="address" label="Endereço" />

              <Field.CountrySelect
                fullWidth
                name="country"
                label="País"
                placeholder="Escolha um país"
              />

              <Field.Text name="state" label="Estado" />
              <Field.Text name="city" label="Cidade" />
              <Field.Text name="zipCode" label="CEP" />

              <Field.Select
                name="interestedProduct"
                label="Produto interessado"
                placeholder="Escolha um produto"
              >
                <option value="Lake House">Lake House</option>
                <option value="Mountain View">Mountain View</option>
                <option value="City Apartment">City Apartment</option>
                <option value="Beach House">Beach House</option>
              </Field.Select>

              <Field.Select
                name="interestUnit"
                label="Unidade de interesse"
                placeholder="Escolha uma unidade"
              >
                <option value="66m2, 99m2">66m2, 99m2</option>
                <option value="45m2, 65m2">45m2, 65m2</option>
                <option value="80m2, 120m2">80m2, 120m2</option>
                <option value="100m2, 150m2">100m2, 150m2</option>
              </Field.Select>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 3, justifyContent: 'flex-end' }}
            >
              <Button variant="outlined" color="inherit">
                Salvar rascunho
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.900' } }}
              >
                Adicionar lead
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}