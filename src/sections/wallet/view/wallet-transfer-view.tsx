import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Stepper from '@mui/material/Stepper';
import ListItem from '@mui/material/ListItem';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  institution?: string;
  pixKey?: string;
  cpf?: string;
}

interface TransferData {
  recipient?: Contact;
  amount: number;
  description?: string;
  scheduledDate?: string;
  isScheduled: boolean;
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Amiah Pruitt',
    email: 'nannie.abernathy70@yahoo.com',
    institution: 'Nubank',
    cpf: '***.***.891-***'
  },
  {
    id: '2',
    name: 'Mireya Conner',
    email: 'ashlynn.ohara62@gmail.com',
  },
  {
    id: '3',
    name: 'Lucian Obrien',
    email: 'milo.farrell@hotmail.com',
  },
  {
    id: '4',
    name: 'Deja Brady',
    email: 'violet.ratke85@yahoo.com',
  },
  {
    id: '5',
    name: 'Harrison Stein',
    email: 'letha.lubowitz4@yahoo.com',
  },
];

const steps = ['Quem vai receber?', 'Qual o valor?', 'Confirmação'];

// ----------------------------------------------------------------------

export function WalletTransferView() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [transferData, setTransferData] = useState<TransferData>({
    amount: 0,
    isScheduled: false,
    scheduledDate: 'Hoje'
  });
  const [pixKey, setPixKey] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const availableBalance = 36963899.00;

  const filteredContacts = MOCK_CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSelectContact = (contact: Contact) => {
    setTransferData(prev => ({ ...prev, recipient: contact }));
    handleNext();
  };

  const handleConfirmTransfer = () => {
    console.log('Transfer confirmed:', transferData);
    // Aqui você faria a chamada para o backend
    // await api.post('/transfers', transferData);
    router.push(paths.dashboard.wallet.root);
  };

  const canProceedStep1 = transferData.recipient || pixKey.length > 0;
  const canProceedStep2 = transferData.amount > 0 && transferData.amount <= availableBalance;

  // Step 1: Quem vai receber
  const renderRecipientStep = () => (
    <Stack spacing={3}>
      {/* Card 1 - Chave Pix */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Quem vai receber?
        </Typography>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Chave Pix
          </Typography>
          <TextField
            fullWidth
            placeholder="Insira a chave (CPF, CNPJ, e-mail, celular, chave aleatória) ou Pix copia e cola"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Você também pode buscar pelo nome de um contato
          </Typography>
        </Box>
      </Card>

      {/* Card 2 - Todos os contatos */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Todos os contatos
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Você possui {filteredContacts.length} contatos
        </Typography>

        {filteredContacts.length > 0 ? (
          <List>
            {filteredContacts.map((contact) => (
              <ListItem key={contact.id} disablePadding>
                <ListItemButton
                  onClick={() => handleSelectContact(contact)}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 40,
                        height: 40
                      }}
                    >
                      {contact.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.email}
                    primaryTypographyProps={{
                      fontWeight: 500
                    }}
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      // Lógica para menu de opções do contato
                    }}
                  >
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Nenhum contato encontrado
            </Typography>
          </Box>
        )}
      </Card>
    </Stack>
  );

  // Step 2: Qual o valor
  const [isEditing, setIsEditing] = useState(false);

  const handleAmountChange = (value) => {
    // Limita o valor ao saldo disponível
    const limitedValue = Math.min(value, availableBalance);
    setTransferData(prev => ({ ...prev, amount: limitedValue }));
  };

  const renderAmountStep = () => (
    <Stack spacing={3}>
      <Alert severity="info">
        Transferências acima de R$ 10.000,00 no período noturno só são permitidas para contatos seguros.
        Para os demais, agende a transferência.
      </Alert>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h6">
            Qual o valor?
          </Typography>
          <Box sx={{ minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isEditing ? (
              <NumericFormat
                customInput={TextField}
                value={transferData.amount || ''}
                onValueChange={(values) => {
                  const inputValue = parseFloat(values.value) || 0;
                  handleAmountChange(inputValue);
                }}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditing(false);
                  }
                }}
                autoFocus
                variant="standard"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return !floatValue || floatValue <= availableBalance;
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  disableUnderline: true,
                  sx: {
                    fontSize: '2.125rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    '& input': {
                      padding: 0,
                      height: 'auto',
                    }
                  }
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: '2.125rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }
                }}
              />
            ) : (
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 400,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 1,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
                onClick={() => setIsEditing(true)}
              >
                R$ {transferData.amount.toFixed(2).replace('.', ',')}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Saldo disponível: {fCurrency(availableBalance)}
            </Typography>
          </Box>
        </Stack>
      </Card>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Quem vai receber
        </Typography>
        {transferData.recipient && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {transferData.recipient.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {transferData.recipient.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {transferData.recipient.email}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Nubank | 0001 | 45548309-0
              </Typography>
            </Box>
          </Stack>
        )}
      </Card>
    </Stack>
  );

  // Step 3: Confirmação
  const renderConfirmationStep = () => (
    <Stack spacing={3}>
      {/* Card 1 - Você está transferindo */}
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h6">
            Você está transferindo
          </Typography>
          <Button
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={() => setActiveStep(1)}
          >
            Editar
          </Button>
        </Stack>

        <Stack spacing={3}>
          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Valor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Data do pagamento
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transferência
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">
                {fCurrency(transferData.amount)}
              </Typography>
              <Typography variant="body2">
                {transferData.scheduledDate}
              </Typography>
              <Typography variant="body2">
                Pix
              </Typography>
            </Stack>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={transferData.isScheduled}
                onChange={(e) => setTransferData(prev => ({ ...prev, isScheduled: e.target.checked }))}
              />
            }
            label="Repetir transferência"
          />
        </Stack>
      </Card>

      {/* Card 2 - Quem vai receber */}
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">
            Quem vai receber
          </Typography>
          <Button
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={() => setActiveStep(0)}
          >
            Editar
          </Button>
        </Stack>

        {transferData.recipient && (
          <Stack spacing={2}>
            {/* Layout responsivo para informações do destinatário */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'auto 1fr auto'
              },
              gap: 2,
              alignItems: 'center'
            }}>
              {/* Nome completo na primeira linha/coluna */}
              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Nome
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {transferData.recipient.name}
                </Typography>
              </Box>

              {/* CPF/CNPJ e Chave em colunas lado a lado em desktop */}
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  CPF/CNPJ
                </Typography>
                <Typography variant="body2">
                  {transferData.recipient.cpf || '***.***.891-***'}
                </Typography>
              </Box>

              <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Chave
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    wordBreak: 'break-all',
                    fontSize: { xs: '0.875rem', sm: '0.875rem' }
                  }}
                >
                  {transferData.recipient.email}
                </Typography>
              </Box>
            </Box>

            {/* Instituição em linha separada */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Instituição
              </Typography>
              <Typography variant="body2">
                {transferData.recipient.institution || '260 - Nubank'}
              </Typography>
            </Box>
          </Stack>
        )}
      </Card>

      {/* Input de mensagem separado */}
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Adicionar mensagem"
        value={transferData.description || ''}
        onChange={(e) => setTransferData(prev => ({ ...prev, description: e.target.value }))}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
            borderRadius: 2
          }
        }}
      />
    </Stack>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderRecipientStep();
      case 1:
        return renderAmountStep();
      case 2:
        return renderConfirmationStep();
      default:
        return null;
    }
  };

  const getStepActionButton = () => {
    const isLastStep = activeStep === steps.length - 1;

    let disabled = false;
    if (activeStep === 0) disabled = !canProceedStep1;
    if (activeStep === 1) disabled = !canProceedStep2;

    return (
      <Button
        variant="contained"
        onClick={isLastStep ? handleConfirmTransfer : handleNext}
        disabled={disabled}
        sx={{
          bgcolor: '#06092B',
          '&:hover': { bgcolor: '#040619' },
          minWidth: 120
        }}
      >
        {isLastStep ? 'Continuar' : 'Continuar'}
      </Button>
    );
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Transferir"
        links={[
          { name: 'Painel', href: paths.dashboard.root },
          { name: 'Carteira da imobiliária', href: paths.dashboard.wallet.root },
          { name: 'Transferir' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ width: '100%' }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      '&.Mui-active': {
                        color: '#34A853',
                      },
                      '&.Mui-completed': {
                        color: '#34A853',
                      }
                    }
                  }}
                >
                  <Typography variant="caption" color={index <= activeStep ? 'primary' : 'text.secondary'}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content com largura máxima */}
        <Box sx={{ mx: 'auto' }}>
          {renderStepContent()}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ mx: 'auto' }}>
          <Stack direction="row" justifyContent="end" sx={{ mt: 4, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={activeStep === 0 ? () => router.push(paths.dashboard.wallet.root) : handleBack}
              sx={{ minWidth: 120 }}
            >
              {activeStep === 0 ? 'Voltar' : 'Voltar'}
            </Button>

            {getStepActionButton()}
          </Stack>
        </Box>
      </Box>
    </DashboardContent>
  );
}