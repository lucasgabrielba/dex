import type { StepIconProps } from '@mui/material/StepIcon';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ImagesForm from './images-form';
import ValuesForm from './values-form';
import PropertyInfoForm from './property-info-form';
import LocationInfoForm from './location-info-form';
import CondominiumInfoForm from './condominium-info-form';

// Conector personalizado para o stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#34A853',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#34A853',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

// Container do ícone do stepper
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#34A853',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#34A853',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 22,
      height: 22,
      borderRadius: '50%',
      backgroundColor: ownerState.active ? '#34A853' : '#eaeaf0',
      textAlign: 'center',
      lineHeight: '22px',
      color: '#fff',
      fontSize: 14,
    },
  }),
);

// Ícone personalizado do stepper
function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  return (
    <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle">{icon}</div>
      )}
    </QontoStepIconRoot>
  );
}

// Passos do stepper
const steps = [
  { label: 'Imóvel', component: PropertyInfoForm },
  { label: 'Condomínio', component: CondominiumInfoForm },
  { label: 'Localização', component: LocationInfoForm },
  { label: 'Imagens', component: ImagesForm },
  { label: 'Valores', component: ValuesForm },
];

export default function PropertyStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [formValid, setFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  // Verifica se todos os passos estão completos
  const isLastStep = () => activeStep === steps.length - 1;

  // Função para validar o step atual
  const validateCurrentStep = (): boolean => {
    const currentStepData = getCurrentStepData();

    switch (activeStep) {
      case 0: // PropertyInfoForm
        return !!(currentStepData?.size && currentStepData?.iptu);
      case 1: // CondominiumInfoForm  
        return !!(currentStepData?.buildYear && currentStepData?.condominiumFee);
      case 2: // LocationInfoForm
        return !!(currentStepData?.cep && currentStepData?.rua && currentStepData?.numero &&
          currentStepData?.bairro && currentStepData?.cidade && currentStepData?.estado);
      case 3: { // ImagesForm
        const images = JSON.parse(localStorage.getItem('propertyImages') || '[]');
        return images.length > 0;
      }
      case 4: // ValuesForm
        return !!(currentStepData?.purpose && currentStepData?.condominiumValue && currentStepData?.iptuValue);
      default:
        return false;
    }
  };

  // Função para obter dados do step atual
  const getCurrentStepData = () => {
    const storageKeys = [
      'propertyFormData',
      'condominiumFormData',
      'locationFormData',
      'propertyImages',
      'valuesFormData'
    ];

    const data = localStorage.getItem(storageKeys[activeStep]);
    return data ? JSON.parse(data) : null;
  };

  // Função para obter mensagem de validação
  const getValidationMessage = (): string => {
    switch (activeStep) {
      case 0:
        return 'Preencha todos os campos obrigatórios sobre o imóvel';
      case 1:
        return 'Preencha as informações do condomínio';
      case 2:
        return 'Preencha o endereço completo do imóvel';
      case 3:
        return 'Adicione pelo menos uma imagem do imóvel';
      case 4:
        return 'Preencha os valores do imóvel';
      default:
        return 'Complete as informações necessárias';
    }
  };

  // Validar step em tempo real
  useEffect(() => {
    const isValid = validateCurrentStep();
    setFormValid(isValid);

    if (!isValid) {
      setValidationMessage(getValidationMessage());
    } else {
      setValidationMessage('');
    }
  }, [activeStep, validateCurrentStep]);

  // Verificar mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const isValid = validateCurrentStep();
      setFormValid(isValid);

      if (!isValid) {
        setValidationMessage(getValidationMessage());
      } else {
        setValidationMessage('');
      }
    };

    // Verificar a cada 500ms se houve mudanças
    const interval = setInterval(handleStorageChange, 500);

    return () => clearInterval(interval);
  }, [activeStep, validateCurrentStep]);

  // Marca o passo atual como completo
  const handleComplete = () => {
    if (!formValid) {
      setValidationMessage(getValidationMessage());
      return;
    }

    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    // Só devemos avançar se não for o último passo
    if (!isLastStep()) {
      handleNext();
    } else {
      // Enviar formulário completo
      handleSubmitForm();
    }
  };

  // Função para enviar o formulário
  const handleSubmitForm = () => {
    const allData = {
      property: JSON.parse(localStorage.getItem('propertyFormData') || '{}'),
      propertyAmenities: JSON.parse(localStorage.getItem('propertyAmenities') || '{}'),
      condominium: JSON.parse(localStorage.getItem('condominiumFormData') || '{}'),
      condominiumAmenities: JSON.parse(localStorage.getItem('condominiumAmenities') || '{}'),
      location: JSON.parse(localStorage.getItem('locationFormData') || '{}'),
      images: JSON.parse(localStorage.getItem('propertyImages') || '[]'),
      values: JSON.parse(localStorage.getItem('valuesFormData') || '{}'),
      valuesOptions: JSON.parse(localStorage.getItem('valuesAdditionalOptions') || '{}'),
    };

    console.log("Dados completos do formulário:", allData);

    // Aqui você pode enviar os dados para o backend
    // await api.post('/properties', allData);

    // Limpar localStorage após envio bem-sucedido
    // localStorage.removeItem('propertyFormData');
    // localStorage.removeItem('propertyAmenities');
    // ... etc

    alert("Formulário enviado com sucesso!");
  };

  // Avança para o próximo passo
  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
    setValidationMessage('');
  };

  // Retorna para o passo anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setValidationMessage('');
  };

  // Renderiza o componente do passo atual
  const renderStepContent = () => {
    const StepComponent = steps[activeStep].component;
    return <StepComponent onComplete={handleComplete} />;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
        sx={{ mb: 5 }}
      >
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          if (completed[index]) {
            stepProps.completed = true;
          }

          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel StepIconComponent={QontoStepIcon}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* Mensagem de validação */}
      {validationMessage && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {validationMessage}
        </Alert>
      )}

      {/* Conteúdo do passo atual */}
      <Box sx={{ mt: 2, mb: 2 }}>
        {renderStepContent()}
      </Box>

      {/* Botões de navegação */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          color="inherit"
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          {activeStep === 0 ? 'Cancelar' : 'Voltar'}
        </Button>
        <Button
          variant="contained"
          onClick={handleComplete}
          disabled={!formValid}
          sx={{
            bgcolor: formValid ? '#06092B' : 'grey.400',
            '&:hover': {
              bgcolor: formValid ? '#040619' : 'grey.500'
            },
            '&:disabled': {
              bgcolor: 'grey.300',
              color: 'grey.600'
            }
          }}
        >
          {isLastStep() ? 'Finalizar' : 'Continuar'}
        </Button>
      </Box>
    </Box>
  );
}