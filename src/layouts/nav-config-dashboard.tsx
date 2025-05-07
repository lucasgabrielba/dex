import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  users: icon('ic-users'),
  graph: icon('ic-graph'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  {
    subheader: 'Módulos',
    items: [
      { title: 'Painel', path: paths.dashboard.root, icon: <Iconify icon="solar:home-angle-bold-duotone" /> },
      {
        title: 'Imóveis',
        path: paths.dashboard.general.ecommerce,
        icon: ICONS.banking,
        children: [
          { title: 'Lista de imóveis', path: paths.dashboard.property.list },
          { title: 'Lista de empreendimentos', path: paths.dashboard.property.developmentList },
          { title: 'Adicionar novo imóvel', path: paths.dashboard.property.new },
        ],
      },
      {
        title: 'Clientes',
        path: paths.dashboard.client.root,
        icon: ICONS.user,
        children: [
          { title: 'Meus clientes', path: paths.dashboard.client.list },
          { title: 'Adicionar novo cliente', path: paths.dashboard.client.new },
        ],
      },
      { title: 'Vendas', path: paths.dashboard.general.banking, icon: ICONS.order },
      { title: 'Minha Carteira', path: paths.dashboard.general.booking, icon: ICONS.label },
      { title: 'E-mail', path: paths.dashboard.general.file, icon: ICONS.mail },
      { title: 'Calendário', path: paths.dashboard.calendar, icon: ICONS.calendar },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Gestão',
    items: [
      {
        title: 'Leads',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: paths.dashboard.user.root },
          { title: 'Cards', path: paths.dashboard.user.cards },
          { title: 'List', path: paths.dashboard.user.list },
          { title: 'Create', path: paths.dashboard.user.new },
          { title: 'Edit', path: paths.dashboard.user.demo.edit },
          { title: 'Account', path: paths.dashboard.user.account },
        ],
      },
      {
        title: 'Relatórios',
        path: paths.dashboard.product.root,
        icon: ICONS.graph,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.demo.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.demo.edit },
        ],
      },
      {
        title: 'Corretores',
        path: paths.dashboard.order.root,
        icon: ICONS.job,
        children: [
          { title: 'List', path: paths.dashboard.order.root },
          { title: 'Details', path: paths.dashboard.order.demo.details },
        ],
      },
      {
        title: 'Contratos',
        path: paths.dashboard.invoice.root,
        icon: ICONS.users,
        children: [
          { title: 'List', path: paths.dashboard.invoice.root },
          { title: 'Details', path: paths.dashboard.invoice.demo.details },
          { title: 'Create', path: paths.dashboard.invoice.new },
          { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
        ],
      }
    ],
  }
];
