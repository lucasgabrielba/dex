import React from 'react';

import { Box, Card, Grid2, Divider, MenuItem, Checkbox, TextField, Typography, CardContent, FormControlLabel } from '@mui/material';

interface PropertyInfoFormProps {
  onComplete: () => void;
}

const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({ onComplete }) => (
  <Card>
    <CardContent>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Sobre o imóvel
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Adicione informações específicas, como metragem, número de quartos, vagas de garagem e comodidades.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            label="Condição do imóvel"
            defaultValue="Novo"
            SelectProps={{
              displayEmpty: true,
              IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1 }
            }}
          >
            <MenuItem value="Novo">Novo</MenuItem>
            <MenuItem value="Usado">Usado</MenuItem>
            <MenuItem value="Na planta">Na planta</MenuItem>
            <MenuItem value="Em construção">Em construção</MenuItem>
          </TextField>
        </Box>

        <Divider variant='fullWidth' sx={{ mb: 3, borderStyle: 'dashed' }} />

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                fullWidth
                label="Tipo de imóvel"
                defaultValue="Apartamento"
                SelectProps={{
                  displayEmpty: true,
                  IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              >
                <MenuItem value="Apartamento">Apartamento</MenuItem>
                <MenuItem value="Casa">Casa</MenuItem>
                <MenuItem value="Terreno">Terreno</MenuItem>
                <MenuItem value="Comercial">Comercial</MenuItem>
                <MenuItem value="Rural">Rural</MenuItem>
              </TextField>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                fullWidth
                label="Posição em relação ao sol"
                defaultValue=""
                SelectProps={{
                  displayEmpty: true,
                  IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              >
                <MenuItem value="Norte">Norte</MenuItem>
                <MenuItem value="Sul">Sul</MenuItem>
                <MenuItem value="Leste">Leste</MenuItem>
                <MenuItem value="Oeste">Oeste</MenuItem>
              </TextField>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Tamanho em M2"
                placeholder="Ex: 75"
                type="number"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              />
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                fullWidth
                label="Quantidade de quartos"
                defaultValue="1"
                SelectProps={{
                  displayEmpty: true,
                  IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5+">5+</MenuItem>
              </TextField>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                fullWidth
                label="Quantidade de suítes"
                defaultValue="1"
                SelectProps={{
                  displayEmpty: true,
                  IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4+">4+</MenuItem>
              </TextField>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Qual o andar do apartamento?"
                placeholder="Qual o andar do apartamento?"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              />
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                fullWidth
                label="Quantidade de banheiros"
                defaultValue="1"
                SelectProps={{
                  displayEmpty: true,
                  IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4+">4+</MenuItem>
              </TextField>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                fullWidth
                label="Quantidade de vagas de garagem"
                defaultValue="1"
                SelectProps={{
                  displayEmpty: true,
                  IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4+">4+</MenuItem>
              </TextField>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Valor do IPTU"
                placeholder="R$ 0,00"
                defaultValue="R$ 700,00"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
              />
            </Box>
          </Grid2>
        </Grid2>

        <Typography variant="subtitle2" sx={{ mb: 2, mt: 2 }}>
          Sinalize as opções que o imóvel possui
        </Typography>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Piscina privativa"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Churrasqueira"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Armários no banheiro"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Armários no quarto"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Armários na cozinha"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Varanda"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Banheira de hidromassagem"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Box"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Geladeira inclusa"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Closet"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Cozinha americana"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Home-office"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Jardim"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Quartos e corredores com portas amplas"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Quintal"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Ar condicionado"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Banheiro adaptado"
            />
          </Grid2>
        </Grid2>
      </Box>
    </CardContent>
  </Card>
);

export default PropertyInfoForm;