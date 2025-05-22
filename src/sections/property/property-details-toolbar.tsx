import type { BoxProps } from '@mui/material/Box';

import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  backHref: string;
  editHref: string;
  liveHref: string;
  publish: string;
  onChangePublish: (newValue: string) => void;
  publishOptions: { value: string; label: string }[];
};

export function PropertyDetailsToolbar({
  sx,
  publish,
  backHref,
  editHref,
  liveHref,
  publishOptions,
  onChangePublish,
  ...other
}: Props) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'top-right' } }}
    >
      <MenuList>
        {publishOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === publish}
            onClick={() => {
              menuActions.onClose();
              onChangePublish(option.value);
            }}
          >
            {option.value === 'Em andamento' && <Iconify icon="solar:play-circle-bold" />}
            {option.value === 'Pendente' && <Iconify icon="solar:clock-circle-bold" />}
            {option.value === 'Vendido' && <Iconify icon="solar:check-circle-bold" />}
            {option.value === 'Alugado' && <Iconify icon="solar:home-smile-bold" />}
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={[
          { gap: 1.5, display: 'flex', mb: { xs: 3, md: 5 } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Button
          component={RouterLink}
          href={backHref}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Voltar
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {publish === 'Em andamento' && (
          <Tooltip title="Ver Publicação">
            <IconButton component={RouterLink} href={liveHref}>
              <Iconify icon="eva:external-link-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Editar">
          <IconButton component={RouterLink} href={editHref}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <LoadingButton
          color="inherit"
          variant="contained"
          loading={!publish}
          loadingIndicator="Carregando…"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          onClick={menuActions.onOpen}
          sx={{ textTransform: 'capitalize' }}
        >
          {publish}
        </LoadingButton>
      </Box>

      {renderMenuActions()}
    </>
  );
}