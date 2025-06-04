import { z as zod } from 'zod';
import { useState } from 'react';
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
import { useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { AnimateLogoRotate } from 'src/components/animate';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';

import { FormHead } from '../../../components/form-head';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email é obrigatório!' })
    .email({ message: 'Email deve ser um endereço válido!' }),
  password: zod
    .string()
    .min(1, { message: 'Senha é obrigatória!' })
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres!' }),
});

// ----------------------------------------------------------------------

export function CenteredSignInView() {
  const { checkUserSession } = useAuthContext();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath || paths.dashboard.root;
  const showPassword = useBoolean();
  const [error, setError] = useState('');

  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('');

      // Faz o login
      await signInWithPassword({ email: data.email, password: data.password });

      // Atualiza o contexto de autenticação
      if (checkUserSession) {
        await checkUserSession();
      }

      // Redireciona para a página de destino
      window.location.href = returnTo;
    } catch (err: any) {
      console.error('Erro no login:', err);

      // Trata os diferentes tipos de erro
      let errorMessage = 'Erro interno do servidor. Tente novamente.';

      if (err.message === 'Email ainda não verificado.') {
        errorMessage = 'Email ainda não verificado. Verifique sua caixa de entrada.';
      } else if (err.message === 'Credenciais inválidas.') {
        errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text
        name="email"
        label="Email"
        placeholder="Digite seu email"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Link
          component={RouterLink}
          href={paths.auth.resetPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Esqueceu sua senha?
        </Link>

        <Field.Text
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {error && (
        <Box
          sx={{
            color: 'error.main',
            textAlign: 'center',
            mt: 1,
            mb: 1,
            p: 2,
            bgcolor: 'error.lighter',
            borderRadius: 1,
            typography: 'body2'
          }}
        >
          {error}
        </Box>
      )}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Entrando..."
      >
        Entrar
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Entre na sua conta"
        description={
          <>
            {`Não possui uma conta? `}
            <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
              Cadastre-se
            </Link>
          </>
        }
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>
    </>
  );
}