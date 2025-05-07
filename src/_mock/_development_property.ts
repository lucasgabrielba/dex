import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const DEVELOPMENT_PROPERTY_STATUS_OPTIONS = [
  { value: 'Pronto', label: 'Pronto' },
  { value: 'Em constução', label: 'Em constução' },
  { value: 'Obras pausadas', label: 'Obras pausadas' },
  { value: 'Pré lançamento', label: 'Pré lançamento' },
];

export const DEVELOPMENT_PROPERTY_TYPE_OPTIONS = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Apartamento', label: 'Apartamento' },
  { value: 'Casa', label: 'Casa' },
  { value: 'Condomínio', label: 'Condomínio' },
  { value: 'Terreno', label: 'Terreno' },
  { value: 'Comercial', label: 'Comercial' },
];

export const _development_properties = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.companyNames(index),
  avatarUrl: _mock.image.avatar(index),
  type: (index % 5 === 0 && 'Casa') ||
    (index % 5 === 1 && 'Apartamento') ||
    (index % 5 === 2 && 'Condomínio') ||
    (index % 5 === 3 && 'Terreno') ||
    'Comercial',
  status: (index % 4 === 0 && 'Pronto') ||
    (index % 4 === 1 && 'Em constução') ||
    (index % 4 === 2 && 'Obras pausadas') ||
    'Pré lançamento',
  value: _mock.number.price(index) * 20000,
  createdAt: _mock.time(index),
  updatedAt: _mock.time(index),
  address: _mock.fullAddress(index),
  city: _mock.countryNames(index),
  state: _mock.companyNames(index).slice(0, 2).toUpperCase(),
  cep: _mock.phoneNumber(index).slice(0, 5),
  area: 50 + Math.floor(Math.random() * 150),
}));