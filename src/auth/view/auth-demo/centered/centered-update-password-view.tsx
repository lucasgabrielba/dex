import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { SentIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from '../../../components/form-head';
import { FormResendCode } from '../../../components/form-resend-code';
import { FormReturnLink } from '../../../components/form-return-link';

// ----------------------------------------------------------------------

export type UpdatePasswordSchemaType = zod.infer<typeof UpdatePasswordSchema>;

export const UpdatePasswordSchema = zod
  .object({
    code: zod
      .string()
      .min(1, { message: 'O código é obrigatório!' })
      .min(6, { message: 'O código deve ter 6 caracteres.' }),
    email: zod
      .string()
      .min(1, { message: 'Email é obrigatório!' })
      .email({ message: 'Email deve ser válido!' }),
    password: zod
      .string()
      .min(1, { message: 'Senha é obrigatória!' })
      .min(6, { message: 'Senha deve ter 6 caracteres.' }),
    confirmPassword: zod.string().min(1, { message: 'Confirme a senha!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

export function CenteredUpdatePasswordView() {
  const showPassword = useBoolean();

  const defaultValues: UpdatePasswordSchemaType = {
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Field.Code name="code" />

      <Field.Text
        name="password"
        label="Senha"
        placeholder="6+ caracteres"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Field.Text
        name="confirmPassword"
        label="Confirme a senha"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Atualizando..."
      >
        Atualizar senha
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<SentIcon />}
        title="Solicitação enviada com sucesso!"
        description={`Enviamos um código de verificação de 6 dígitos para o email ${defaultValues.email}. \nInsira-o no campo abaixo para confirmar sua conta.`}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormResendCode onResendCode={() => { }} value={0} disabled={false} />

      <FormReturnLink href={paths.auth.signIn} />
    </>
  );
}
