import type { StepIconProps } from '@mui/material/StepIcon';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
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

  // Verifica se todos os passos estão completos
  const isLastStep = () => activeStep === steps.length - 1;

  // Marca o passo atual como completo
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    // Só devemos avançar se não for o último passo
    if (!isLastStep()) {
      handleNext();
    } else {
      // Aqui você pode adicionar o código para enviar o formulário completo
      console.log("Formulário finalizado com sucesso!");
      // Opcional: redirecionar ou mostrar mensagem de sucesso
    }
  };

  // Avança para o próximo passo
  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // Retorna para o passo anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleComplete}
          sx={{
            bgcolor: '#06092B',
            '&:hover': { bgcolor: '#040619' }
          }}
        >
          {isLastStep() ? 'Finalizar' : 'Continuar'}
        </Button>
      </Box>
    </Box>
  );
}