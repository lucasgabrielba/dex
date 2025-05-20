import React from 'react';

import Grid from '@mui/material/Grid2'; // Importando Grid2
import { Box, Card, MenuItem, Checkbox, TextField, Typography, CardContent, InputAdornment, FormControlLabel } from '@mui/material';

interface ValuesFormProps {
  onComplete: () => void;
}

const ValuesForm: React.FC<ValuesFormProps> = ({ onComplete }) => (
  <Card>
    <CardContent>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Valores do Imóvel
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Defina os valores de venda ou aluguel, além de outras condições financeiras relacionadas ao imóvel.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            label="Finalidade"
            defaultValue="venda"
            SelectProps={{
              displayEmpty: true,
              IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          >
            <MenuItem value="venda">Venda</MenuItem>
            <MenuItem value="aluguel">Aluguel</MenuItem>
            <MenuItem value="venda_aluguel">Venda e Aluguel</MenuItem>
          </TextField>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Valor de Venda"
                placeholder="0,00"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Valor do Aluguel"
                placeholder="0,00"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            label="Aceita Financiamento?"
            defaultValue="sim"
            SelectProps={{
              displayEmpty: true,
              IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          >
            <MenuItem value="sim">Sim</MenuItem>
            <MenuItem value="nao">Não</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            label="Aceita Permuta?"
            defaultValue="nao"
            SelectProps={{
              displayEmpty: true,
              IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          >
            <MenuItem value="sim">Sim</MenuItem>
            <MenuItem value="nao">Não</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Valor do Condomínio"
            placeholder="0,00"
            defaultValue="700,00"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Valor do IPTU"
            placeholder="0,00"
            defaultValue="700,00"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Observações sobre valores"
            multiline
            rows={4}
            placeholder="Coloque aqui informações adicionais sobre valores, condições de pagamento, etc."
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Opções adicionais
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Mostrar valor sob consulta (não exibir o valor no anúncio)"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Imóvel com exclusividade (você é o único corretor autorizado)"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Destacar este imóvel nos resultados de busca"
            />
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);

export default ValuesForm;