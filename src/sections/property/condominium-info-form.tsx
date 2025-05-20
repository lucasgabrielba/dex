import React from 'react';

import Grid from '@mui/material/Grid2'; // Usando Grid2 em vez do Grid padrão
import { Box, Card, MenuItem, Checkbox, TextField, Typography, CardContent, FormControlLabel } from '@mui/material';

interface CondominiumInfoFormProps {
  onComplete: () => void;
}

const CondominiumInfoForm: React.FC<CondominiumInfoFormProps> = ({ onComplete }) => (
  <Card>
    <CardContent>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Sobre o condomínio
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Adicione informações sobre a infraestrutura do condomínio, como ano de construção, valor da taxa condominial e facilidades disponíveis.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Nome do prédio"
            placeholder="Ex: Edifício Solar"
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            label="Em que ano o imóvel foi construído?"
            defaultValue="2022"
            SelectProps={{
              displayEmpty: true,
              IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          >
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
            <MenuItem value="2017">2017</MenuItem>
            <MenuItem value="2016">2016</MenuItem>
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2010-2014">2010-2014</MenuItem>
            <MenuItem value="2000-2009">2000-2009</MenuItem>
            <MenuItem value="1990-1999">1990-1999</MenuItem>
            <MenuItem value="Antes de 1990">Antes de 1990</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Valor do condomínio"
            placeholder="R$ 0,00"
            defaultValue="R$ 700,00"
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 2, mt: 2 }}>
          Sinalize as opções que o condomínio possui
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Playground"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Piscina"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Churrasqueira"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Academia"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Salão de festas"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Lavanderia no prédio"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Espaço gourmet na área comum"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Elevador"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Portaria 24h"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Rampas de acesso"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Salão de jogos"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Quadra esportiva"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Sauna"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Brinquedoteca"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Corrimão"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Vaga de garagem acessível"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Área verde"
            />
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);

export default CondominiumInfoForm;