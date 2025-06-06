//@ts-nocheck
import React from 'react';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Form, Field } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hooks';
import { endpoints } from 'src/lib/axios';
import axios from 'src/lib/axios';
import { useAuthContext } from 'src/auth/hooks';

import { OnboardingSchema, type OnboardingSchemaType } from './onboarding-schema';

const MaskedTextField = ({ mask, name, label, placeholder, sx = {} }) => (
  <Field.Text
    name={name}
    label={label}
    placeholder={placeholder}
    sx={sx}
    slotProps={{
      input: {
        inputComponent: ({ inputRef, ...other }) => {
          const { onChange, value, ...restOther } = other;
          return (
            <InputMask
              mask={mask}
              value={value || ''}
              onChange={onChange}
              {...restOther}
              inputRef={inputRef}
            />
          );
        }
      }
    }}
  />
);

const StepHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      p: 3,
      borderBottom: `1px dotted ${theme.vars.palette.background.neutral}`,
      backgroundColor: theme.vars.palette.background.paper,
    }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: theme.vars.palette.primary.darkChannel }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: theme.vars.palette.primary.darkChannel, opacity: 0.8 }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

// Componente para o conteúdo dos steps
const StepContent = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      p: 3,
      backgroundColor: theme.vars.palette.background.neutral,
    }}>
      {children}
    </Box>
  );
};

// Form default values
const defaultValues: OnboardingSchemaType = {
  companyName: 'Acme. SA',
  cnpj: '',
  razaoSocial: '',
  nomeFantasia: '',
  telefone: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  services: {
    vendaImoveis: false,
    aluguelImoveis: false,
    administracaoImoveis: false
  },
  teamSize: ''
};

export function OnboardingForm() {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = React.useState(0);

  const methods = useForm<OnboardingSchemaType>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues,
    mode: 'onChange'
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger
  } = methods;

  // const services = watch('services');
  // const hasSelectedService = Object.values(services).some(val => val);

  const nextStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 0:
        isValid = await trigger('companyName');
        break;
      case 1:
        isValid = await trigger(['cnpj', 'razaoSocial', 'nomeFantasia', 'telefone']);
        break;
      case 2:
        isValid = await trigger(['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado']);
        break;
      case 3:
        isValid = await trigger('services');
        break;
      case 4:
        isValid = await trigger('teamSize');
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const router = useRouter();
  const { checkUserSession, user } = useAuthContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        organizationName: data.companyName,
        corporateName: data.razaoSocial,
        tradeName: data.nomeFantasia,
        email: user?.email || '',
        document: data.cnpj.replace(/\D/g, ''),
        phone: data.telefone.replace(/\D/g, ''),
        cep: data.cep.replace(/\D/g, ''),
        street: data.rua,
        number: data.numero,
        district: data.bairro,
        city: data.cidade,
        state: data.estado,
        services: {
          propertySales: data.services.vendaImoveis,
          propertyRentals: data.services.aluguelImoveis,
          propertyManagement: data.services.administracaoImoveis,
        },
        teamSize: data.teamSize,
        status: 'Ativo',
      };

      await axios.post(endpoints.onboarding, payload);

      if (checkUserSession) {
        await checkUserSession();
      }

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  });

  const renderWelcomeStep = () => (
    <>
      <StepHeader
        title="Olá! Seja bem-vindo!"
        subtitle="Para começar, vamos configurar seu ambiente de vendas. Isso levará apenas alguns minutos e garantirá que tudo funcione perfeitamente para você."
      />
      <StepContent>
        <Field.Text
          label="Insira o nome da imobiliária."
          name="companyName"
          placeholder="Nome da imobiliária"
          fullWidth
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <InfoIcon sx={{ fontSize: 18, color: theme.vars.palette.text.secondary, mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Não se preocupe, você pode editar essa informação depois.
          </Typography>
        </Box>
      </StepContent>
    </>
  );

  const renderBusinessInfoStep = () => (
    <>
      <StepHeader
        title="Preencha os dados da sua empresa."
        subtitle="Precisamos dessas informações para configurar seu ambiente de vendas e personalizar sua experiência."
      />
      <StepContent>
        <MaskedTextField
          name="cnpj"
          label="CNPJ da empresa"
          placeholder="00.000.000/0000-00"
          mask="99.999.999/9999-99"
          sx={{ mb: 2 }}
        />

        <Field.Text
          name="razaoSocial"
          label="Razão Social"
          placeholder="Razão Social"
          sx={{ mb: 2 }}
        />

        <Field.Text
          name="nomeFantasia"
          label="Nome Fantasia"
          placeholder="Nome Fantasia"
          sx={{ mb: 2 }}
        />

        <MaskedTextField
          name="telefone"
          label="Telefone comercial"
          placeholder="Telefone comercial"
          mask="(99) 99999-9999"
          sx={{ mb: 2 }}
        />
      </StepContent>
    </>
  );

  const renderAddressStep = () => (
    <>
      <StepHeader
        title="Preencha os dados da sua empresa."
        subtitle="Precisamos dessas informações para configurar seu ambiente de vendas e personalizar sua experiência."
      />
      <StepContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Precisamos dessas informações para configurar seu
          ambiente de vendas e personalizar sua experiência.
        </Typography>

        <MaskedTextField
          name="cep"
          label="CEP da empresa"
          placeholder="00000-000"
          mask="99999-999"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon sx={{ fontSize: 18, color: theme.vars.palette.text.secondary, mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Não se preocupe, você pode editar essa informação depois.
          </Typography>
        </Box>

        <Field.Text
          name="rua"
          label="Rua"
          placeholder="Rua"
          sx={{ mb: 2 }}
        />

        <Field.Text
          name="numero"
          label="Número"
          placeholder="Número"
          sx={{ mb: 2 }}
        />

        <Field.Text
          name="bairro"
          label="Bairro"
          placeholder="Bairro"
          sx={{ mb: 2 }}
        />

        <Field.Text
          name="cidade"
          label="Cidade"
          placeholder="Cidade"
          sx={{ mb: 2 }}
        />

        <Field.Text
          name="estado"
          label="Estado"
          placeholder="Estado"
          sx={{ mb: 2 }}
        />
      </StepContent>
    </>
  );

  const renderServicesStep = () => (
    <>
      <StepHeader
        title="Serviços da Imobiliária"
        subtitle="O que sua imobiliária oferece?"
      />
      <StepContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={watch('services.vendaImoveis')}
              onChange={(e) => setValue('services.vendaImoveis', e.target.checked)}
              sx={{
                color: theme.vars.palette.common.black,
                '&.Mui-checked': {
                  color: theme.vars.palette.common.black,
                },
              }}
            />
          }
          label="Venda de imóveis"
          sx={{ display: 'block', mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={watch('services.aluguelImoveis')}
              onChange={(e) => setValue('services.aluguelImoveis', e.target.checked)}
              sx={{
                color: theme.vars.palette.common.black,
                '&.Mui-checked': {
                  color: theme.vars.palette.common.black,
                },
              }}
            />
          }
          label="Aluguel de imóveis"
          sx={{ display: 'block', mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={watch('services.administracaoImoveis')}
              onChange={(e) => setValue('services.administracaoImoveis', e.target.checked)}
              sx={{
                color: theme.vars.palette.common.black,
                '&.Mui-checked': {
                  color: theme.vars.palette.common.black,
                },
              }}
            />
          }
          label="Administração de imóveis de terceiros"
          sx={{ display: 'block', mb: 2 }}
        />

        {errors.services && (
          <Typography color="error" variant="caption" sx={{ mt: 1 }}>
            Selecione pelo menos um serviço
          </Typography>
        )}
      </StepContent>
    </>
  );

  const renderTeamSizeStep = () => (
    <>
      <StepHeader
        title="Perfis e Equipes"
        subtitle="Quantos corretores trabalham na imobiliária?"
      />
      <StepContent>
        {[
          '1 a 5',
          '6 a 10',
          '11 a 20',
          '21 a 50',
          '51 a 100',
          'Mais de 100'
        ].map((option, index) => (
          <Button
            key={index}
            fullWidth
            variant={watch('teamSize') === option ? "contained" : "outlined"}
            onClick={() => setValue('teamSize', option)}
            sx={{
              mb: 2,
              justifyContent: 'center',
              ...(watch('teamSize') !== option && {
                borderColor: theme.vars.palette.text.secondary,
                color: theme.vars.palette.common.black,
              })
            }}
          >
            {option}
          </Button>
        ))}

        {errors.teamSize && (
          <Typography color="error" variant="caption">
            Selecione o tamanho da equipe
          </Typography>
        )}
      </StepContent>
    </>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderBusinessInfoStep();
      case 2:
        return renderAddressStep();
      case 3:
        return renderServicesStep();
      case 4:
        return renderTeamSizeStep();
      default:
        return null;
    }
  };

  const getButtonText = () => currentStep === 4 ? 'Finalizar' : 'Continuar';

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box sx={{
        boxShadow: theme.vars.customShadows.card,
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        overflow: 'hidden',
        bgcolor: theme.vars.palette.background.paper,
      }}>
        {renderStepContent()}

        <Box sx={{ mt: 0, p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={currentStep < 4 ? nextStep : onSubmit}
            disabled={isSubmitting}
            sx={{
              py: 1.5,
            }}
          >
            {getButtonText()}
          </Button>
        </Box>
      </Box>
    </Form>
  );
}