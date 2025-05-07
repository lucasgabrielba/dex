import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const PROPERTY_STATUS_OPTIONS = [
  { value: 'Em andamento', label: 'Em andamento' },
  { value: 'Pendente', label: 'Pendente' },
  { value: 'Vendido', label: 'Vendido' },
  { value: 'Alugado', label: 'Alugado' },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Apartamento', label: 'Apartamento' },
  { value: 'Casa', label: 'Casa' },
  { value: 'Condomínio', label: 'Condomínio' },
  { value: 'Terreno', label: 'Terreno' },
  { value: 'Comercial', label: 'Comercial' },
];

export const _properties = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.companyNames(index),
  avatarUrl: _mock.image.avatar(index),
  type: (index % 5 === 0 && 'Casa') ||
    (index % 5 === 1 && 'Apartamento') ||
    (index % 5 === 2 && 'Condomínio') ||
    (index % 5 === 3 && 'Terreno') ||
    'Comercial',
  status: (index % 4 === 0 && 'Em andamento') ||
    (index % 4 === 1 && 'Pendente') ||
    (index % 4 === 2 && 'Vendido') ||
    'Alugado',
  value: _mock.number.price(index) * 20000,
  createdAt: _mock.time(index),
  updatedAt: _mock.time(index),
  address: _mock.fullAddress(index),
  city: _mock.countryNames(index),
  state: _mock.companyNames(index).slice(0, 2).toUpperCase(),
  cep: _mock.phoneNumber(index).slice(0, 5),
  area: 50 + Math.floor(Math.random() * 150),
}));