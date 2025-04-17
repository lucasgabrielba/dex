import type { IClientTableFilters } from 'src/types/client';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void;
  filters: UseSetStateReturn<IClientTableFilters>;
  options: {
    filterOptions: string[];
  };
};

export function UserTableToolbar({ filters, options, onResetPage }: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ name: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onResetPage();
      updateFilters({ filterBy: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleStartDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ startDate: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleEndDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ endDate: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ search: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Imprimir
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Importar
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Exportar
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={{
          p: 2.5,
          gap: 2.5,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: 200 } }}>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem' }}>Filtrar por</InputLabel>
          <FormControl fullWidth>
            <Select
              value={currentFilters.filterBy || 'name'}
              onChange={handleFilterChange}
              input={<OutlinedInput />}
              displayEmpty
              sx={{ height: 56 }}
            >
              <MenuItem value="name">Nome</MenuItem>
              <MenuItem value="phoneNumber">Número de Telefone</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="company">Empresa</MenuItem>
              <MenuItem value="product">Produto</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: { xs: '100%', sm: 200 } }}>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem' }}>Data inicial</InputLabel>
          <TextField
            fullWidth
            type="date"
            value={currentFilters.startDate || ''}
            onChange={handleStartDateChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify icon="solar:calendar-linear" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ width: { xs: '100%', sm: 200 } }}>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem' }}>Data final</InputLabel>
          <TextField
            fullWidth
            type="date"
            value={currentFilters.endDate || ''}
            onChange={handleEndDateChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Iconify icon="solar:calendar-linear" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            fullWidth
            value={currentFilters.search || ''}
            onChange={handleSearchChange}
            placeholder="Pesquisar por..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <IconButton>
          <Iconify icon="solar:menu-dots-bold" />
        </IconButton>
      </Box>

      {renderMenuActions()}
    </>
  );
}