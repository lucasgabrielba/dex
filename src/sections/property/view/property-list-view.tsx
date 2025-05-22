import type { TableHeadCellProps } from 'src/components/table';
import type { IPropertyItem, IPropertyTableFilters } from 'src/types/property';

import { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { _properties, PROPERTY_STATUS_OPTIONS } from 'src/_mock/_property';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { PropertyTableRow } from '../property-table-row';
import { PropertyTableToolbar } from '../property-table-toolbar';
import { PropertyTableFiltersResult } from '../property-table-filters-result';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'Todos' }, ...PROPERTY_STATUS_OPTIONS];

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'Imóvel' },
  { id: 'createdAt', label: 'Criado em', width: 140 },
  { id: 'type', label: 'Tipo', width: 140 },
  { id: 'value', label: 'Valor', width: 140 },
  { id: 'status', label: 'Status', width: 110 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function PropertyListView() {
  const table = useTable({ defaultOrderBy: 'name' });

  const confirmDialog = useBoolean();

  const [tableData, setTableData] = useState<IPropertyItem[]>(_properties);

  const filters = useSetState<IPropertyTableFilters>({
    name: '',
    status: 'all',
    type: 'all',
    startDate: null,
    endDate: null,
  });
  const { state: currentFilters, setState: updateFilters } = filters;

  const dateError = fIsAfter(currentFilters.startDate, currentFilters.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name ||
    currentFilters.status !== 'all' ||
    currentFilters.type !== 'all' ||
    (!!currentFilters.startDate && !!currentFilters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Deletado com sucesso!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Deletado com sucesso!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      table.onResetPage();
      updateFilters({ status: newValue });
    },
    [updateFilters, table]
  );

  // const handleAddNewProperty = () => {
  //   // Redirecionamento para a página de criação de imóvel
  //   window.location.href = paths.dashboard.property.new;
  // };

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Deletar"
      content={
        <>
          Tem certeza que deseja deletar <strong> {table.selected.length} </strong> itens?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Deletar
        </Button>
      }
    />
  );

  return (
    <>
      <DashboardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={{ xs: 2, sm: 0 }}
          sx={{ mb: { xs: 2, md: 4 } }}
        >
          <CustomBreadcrumbs
            heading="Imóveis"
            links={[
              { name: 'Painel', href: paths.dashboard.root },
              { name: 'Imóveis', href: paths.dashboard.property.root },
              { name: 'Lista de imóveis' },
            ]}
            sx={{
              '.MuiTypography-h4': {
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }
            }}
          />
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            href={paths.dashboard.property.new}
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Novo imóvel
          </Button>
        </Stack>

        <Card>
          <Tabs
            value={currentFilters.status}
            onChange={handleFilterStatus}
            sx={[
              (theme) => ({
                px: 2.5,
                boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              }),
            ]}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === currentFilters.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'Em andamento' && 'success') ||
                      (tab.value === 'Pendente' && 'warning') ||
                      (tab.value === 'Vendido' && 'error') ||
                      'default'
                    }
                  >
                    {['Em andamento', 'Pendente', 'Vendido', 'Alugado'].includes(tab.value)
                      ? tableData.filter((item) => item.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <PropertyTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          />

          {canReset && (
            <PropertyTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Deletar">
                  <IconButton color="primary" onClick={confirmDialog.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar sx={{ minHeight: 444 }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <PropertyTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        detailsHref={paths.dashboard.property.details(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  dateError: boolean;
  inputData: IPropertyItem[];
  filters: IPropertyTableFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters, dateError }: ApplyFilterProps) {
  const { status, name, type, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((item) =>
      [item.name, item.address, item.city, item.state, item.cep].some((field) =>
        field?.toLowerCase().includes(name.toLowerCase())
      )
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((item) => item.status === status);
  }

  if (type !== 'all') {
    inputData = inputData.filter((item) => item.type === type);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((item) => fIsBetween(item.createdAt, startDate, endDate));
    }
  }

  return inputData;
}