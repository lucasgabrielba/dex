import type { IPropertyItem } from 'src/types/property';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IPropertyItem & { area?: number };
  selected: boolean;
  detailsHref: string;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function PropertyTableRow({ row, selected, onSelectRow, onDeleteRow, detailsHref }: Props) {
  const confirmDialog = useBoolean();
  const menuActions = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{
              id: `${row.id}-checkbox`,
              'aria-label': `${row.id} checkbox`,
            }}
          />
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={row.name}
              src={row.avatarUrl}
              variant="rounded"
              sx={{ width: 64, height: 64, mr: 2, borderRadius: 1 }}
            />

            <Link component={RouterLink} href={detailsHref} color="inherit" underline="always">
              <ListItemText
                primary={row.name}
                secondary={`${row.city}, ${row.state}`}
                primaryTypographyProps={{ typography: 'body2', fontWeight: 'bold' }}
                secondaryTypographyProps={{ typography: 'caption' }}
              />
            </Link>
          </Box>
        </TableCell>

        <TableCell>
          <Box>
            <Box sx={{ typography: 'body2' }}>{fDate(row.createdAt)}</Box>
            <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
              {new Date(row.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Box>
            <Box sx={{ typography: 'body2' }}>{row.type}</Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', typography: 'caption', color: 'text.secondary' }}>
              {row.area} m<sup style={{ fontSize: '9px', lineHeight: 0 }}>2</sup>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Box>
            <Box sx={{ typography: 'body2' }}>{fCurrency(row.value)}</Box>
            <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
              {fCurrency(row.value * 0.014)}
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'Em andamento' && 'success') ||
              (row.status === 'Pendente' && 'warning') ||
              (row.status === 'Vendido' && 'error') ||
              (row.status === 'Alugado' && 'info') ||
              'default'
            }
          >
            {row.status === 'Em andamento' && 'Em andamento' ||
              row.status === 'Pendente' && 'Pendente' ||
              row.status === 'Vendido' && 'Vendido' ||
              row.status === 'Alugado' && 'Alugado' ||
              row.status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={menuActions.open}
        anchorEl={menuActions.anchorEl}
        onClose={menuActions.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirmDialog.onTrue();
              menuActions.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Deletar
          </MenuItem>

          <MenuItem component={RouterLink} href={detailsHref} onClick={menuActions.onClose}>
            <Iconify icon="solar:eye-bold" />
            Visualizar
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        title="Deletar"
        content="Tem certeza que deseja deletar?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Deletar
          </Button>
        }
      />
    </>
  );
}