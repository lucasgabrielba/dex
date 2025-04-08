import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useMockedUser } from 'src/auth/hooks';

// Schema de validação
export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  displayName: zod.string().min(1, { message: 'Nome é obrigatório!' }),
  email: zod
    .string()
    .min(1, { message: 'Email é obrigatório!' })
    .email({ message: 'Email deve ser um endereço válido!' }),
  photoURL: schemaHelper.file({ message: 'Avatar é obrigatório!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(zod.string().min(1, { message: 'País é obrigatório!' }), {
    message: 'País é obrigatório!',
  }),
  address: zod.string().min(1, { message: 'Endereço é obrigatório!' }),
  state: zod.string().min(1, { message: 'Estado é obrigatório!' }),
  city: zod.string().min(1, { message: 'Cidade é obrigatória!' }),
  zipCode: zod.string().min(1, { message: 'CEP é obrigatório!' }),
  pixKey: zod.string().min(1, { message: 'Chave Pix é obrigatória!' }),
  pixKeyType: zod.string().optional(),
  creci: zod.string().min(1, { message: 'CRECI é obrigatório!' }),
  position: zod.string().optional(),
  isPublic: zod.boolean(),
});

// Componente
export function AccountGeneral() {
  const { user } = useMockedUser();

  const currentUser: UpdateUserSchemaType = {
    displayName: user?.displayName || 'Jayvion Simon',
    email: user?.email || 'nannie.abernathy70@yahoo.com',
    photoURL: user?.photoURL,
    phoneNumber: user?.phoneNumber || '365-374-4961',
    country: user?.country || 'Brasil',
    address: user?.address || '19034 Verna Unions Apt. 164',
    state: user?.state || 'Goiás',
    city: user?.city || 'Goiânia',
    zipCode: user?.zipCode || '22000',
    pixKey: user?.pixKey || '234.123.123-11',
    pixKeyType: user?.pixKeyType || 'CPF',
    creci: user?.creci || '1232131-0',
    position: user?.position || 'Corretor',
    isPublic: user?.isPublic || false,
  };

  const defaultValues: UpdateUserSchemaType = {
    displayName: '',
    email: '',
    photoURL: null,
    phoneNumber: '',
    country: null,
    address: '',
    state: '',
    city: '',
    zipCode: '',
    pixKey: '',
    pixKeyType: '',
    creci: '',
    position: '',
    isPublic: false,
  };

  const methods = useForm<UpdateUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Atualização realizada com sucesso!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <Field.UploadAvatar
              name="photoURL"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Permitido *.jpeg, *.jpg, *.png, *.gif
                  <br /> Tamanho máximo de {fData(3145728)}
                </Typography>
              }
            />

            {/* <Field.Switch name="isPublic" labelPlacement="start" label="Perfil público" sx={{ mt: 5 }} /> */}
          </Card>
        </Grid>

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
              <Field.Text name="displayName" label="Nome" />
              <Field.Text name="email" label="Email" />
              <Field.Phone name="phoneNumber" label="Telefone" />
              <Field.Text name="address" label="Endereço" />
              <Field.CountrySelect name="country" label="País" placeholder="País" />
              <Field.Text name="state" label="Estado" />
              <Field.Text name="city" label="Cidade" />
              <Field.Text name="zipCode" label="CEP" />

              {/* Select para pixKeyType */}
              <Field.Select name="pixKeyType" label="Tipo de chave Pix">
                <MenuItem value="CPF">CPF</MenuItem>
                <MenuItem value="CNPJ">CNPJ</MenuItem>
                <MenuItem value="EMAIL">Email</MenuItem>
                <MenuItem value="TELEFONE">Telefone</MenuItem>
                <MenuItem value="CHAVE_ALEATORIA">Chave Aleatória</MenuItem>
              </Field.Select>

              <Field.Text name="pixKey" label="Chave Pix" />
              <Field.Text name="creci" label="CRECI" />

              {/* Select para position */}
              <Field.Select name="position" label="Cargo">
                <MenuItem value="CORRETOR">Corretor</MenuItem>
                <MenuItem value="GERENTE">Gerente</MenuItem>
                <MenuItem value="ADMIN">Administrador</MenuItem>
              </Field.Select>
            </Box>

            <Stack spacing={3} sx={{ mt: 3, alignItems: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Salvar ajustes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}