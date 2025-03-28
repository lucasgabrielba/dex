import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { AnimateLogoRotate } from 'src/components/animate';

import { SignUpTerms } from 'src/auth/components/sign-up-terms';

import { FormHead } from '../../../components/form-head';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'Nome é obrigatório!' }),
  lastName: zod.string().min(1, { message: 'Sobrenome é obrigatório!' }),
  email: zod
    .string()
    .min(1, { message: 'Email é obrigatório!' })
    .email({ message: 'Email deve ser um endereço válido!' }),
  phone: zod
    .string()
    .min(1, { message: 'Telefone é obrigatório!' }),
  password: zod
    .string()
    .min(1, { message: 'Senha é obrigatória!' })
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres!' }),
  confirmPassword: zod
    .string()
    .min(1, { message: 'Confirmação de senha é obrigatória!' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// ----------------------------------------------------------------------

export function CenteredSignUpView() {
  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();

  const defaultValues: SignUpSchemaType = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
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
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 3, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Field.Text
          name="firstName"
          label="Nome"
          placeholder="Nome"
        />
        <Field.Text
          name="lastName"
          label="Sobrenome"
          placeholder="Sobrenome"
        />
      </Box>

      <Field.Text
        name="email"
        label="Seu e-mail"
        placeholder="Seu e-mail"
      />

      <Field.Text
        name="phone"
        label="Seu telefone"
        placeholder="Seu telefone"
      />

      <Field.Text
        name="password"
        label="Crie uma senha"
        placeholder="Senha"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
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
        placeholder="Reescreva a senha"
        type={showConfirmPassword.value ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showConfirmPassword.onToggle} edge="end">
                  <Iconify icon={showConfirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Criando conta..."
      >
        Criar conta
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Comece totalmente grátis"
        description={
          <>
            {`Já possui uma conta? `}
            <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
              Entrar
            </Link>
          </>
        }
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms />
      {/* <FormDivider /> */}
      {/* <FormSocials
        signInWithGoogle={() => { }}
        singInWithGithub={() => { }}
        signInWithTwitter={() => { }}
      /> */}
    </>
  );
}