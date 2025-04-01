import { z as zod } from 'zod';

export const CompanyInfoSchema = zod.object({
  companyName: zod.string().min(3, { message: 'Nome da imobiliária deve ter pelo menos 3 caracteres' }),
  cnpj: zod.string().min(18, { message: 'CNPJ é obrigatório' }),
  razaoSocial: zod.string().min(1, { message: 'Razão Social é obrigatória' }),
  nomeFantasia: zod.string().min(1, { message: 'Nome Fantasia é obrigatório' }),
  telefone: zod.string().min(14, { message: 'Telefone é obrigatório' }),
});

export const AddressSchema = zod.object({
  cep: zod.string().min(9, { message: 'CEP é obrigatório' }),
  rua: zod.string().min(1, { message: 'Rua é obrigatória' }),
  numero: zod.string().min(1, { message: 'Número é obrigatório' }),
  bairro: zod.string().min(1, { message: 'Bairro é obrigatório' }),
  cidade: zod.string().min(1, { message: 'Cidade é obrigatória' }),
  estado: zod.string().min(1, { message: 'Estado é obrigatório' }),
});

export const ServicesSchema = zod.object({
  services: zod.object({
    vendaImoveis: zod.boolean(),
    aluguelImoveis: zod.boolean(),
    administracaoImoveis: zod.boolean(),
  })
}).refine(
  (data) => Object.values(data.services).some(val => val),
  {
    message: 'Selecione pelo menos um serviço',
    path: ['services'],
  }
);

export const TeamSizeSchema = zod.object({
  teamSize: zod.string().min(1, { message: 'Selecione o tamanho da equipe' }),
});

export const OnboardingSchema = zod.object({
  ...CompanyInfoSchema.shape,
  ...AddressSchema.shape,
  ...ServicesSchema.innerType().shape,
  ...TeamSizeSchema.shape,
});

export type OnboardingSchemaType = zod.infer<typeof OnboardingSchema>;