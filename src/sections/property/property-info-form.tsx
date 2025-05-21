import { z } from 'zod';
import React, { useState, useEffect } from 'react';

import Grid2 from '@mui/material/Grid2';
import { Box, Card, Divider, MenuItem, Checkbox, TextField, Typography, CardContent, FormControlLabel } from '@mui/material';

interface PropertyInfoFormProps {
  onComplete: () => void;
}

// Schema de validação com Zod
const propertySchema = z.object({
  condition: z.string().min(1, "Condição do imóvel é obrigatória"),
  type: z.string().min(1, "Tipo de imóvel é obrigatório"),
  sunPosition: z.string().optional(),
  size: z.string().min(1, "Tamanho é obrigatório"),
  rooms: z.string().min(1, "Quantidade de quartos é obrigatória"),
  suites: z.string().min(1, "Quantidade de suítes é obrigatória"),
  floor: z.string().optional(),
  bathrooms: z.string().min(1, "Quantidade de banheiros é obrigatória"),
  parkingSpaces: z.string().min(1, "Quantidade de vagas é obrigatória"),
  iptu: z.string().min(1, "Valor do IPTU é obrigatório"),
});

// Tipo para os dados do formulário
type PropertyFormData = z.infer<typeof propertySchema>;

const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({ onComplete }) => {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState<PropertyFormData>({
    condition: "Novo",
    type: "Apartamento",
    sunPosition: "",
    size: "",
    rooms: "1",
    suites: "1",
    floor: "",
    bathrooms: "1",
    parkingSpaces: "1",
    iptu: "R$ 700,00",
  });

  // Estado para os checkboxes de comodidades
  const [amenities, setAmenities] = useState<Record<string, boolean>>({
    privatePool: false,
    barbecue: false,
    bathroomCabinets: false,
    bedroomCabinets: false,
    kitchenCabinets: false,
    balcony: false,
    jacuzzi: false,
    showerBox: false,
    refrigerator: false,
    closet: false,
    americanKitchen: false,
    homeOffice: false,
    garden: false,
    wideDoorsAndHallways: false,
    backyard: false,
    airConditioner: false,
    adaptedBathroom: false,
  });

  // Estado para os erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função para atualizar o estado do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para atualizar o estado dos checkboxes
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAmenities(prev => ({ ...prev, [name]: checked }));
  };

  // Validação em tempo real
  useEffect(() => {
    const result = propertySchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.errors.forEach(error => {
        if (error.path[0]) {
          formattedErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(formattedErrors);
    } else {
      setErrors({});
    }
    return undefined;
  }, [formData]);

  // Verificar se todos os campos são válidos
  const isFormValid = Object.keys(errors).length === 0 &&
    formData.size.trim() !== "" && formData.iptu.trim() !== "";

  // Salvar dados no localStorage para persistência entre steps
  useEffect(() => {
    const savedData = localStorage.getItem('propertyFormData');
    const savedAmenities = localStorage.getItem('propertyAmenities');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedAmenities) {
      setAmenities(JSON.parse(savedAmenities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('propertyFormData', JSON.stringify(formData));
    localStorage.setItem('propertyAmenities', JSON.stringify(amenities));
  }, [formData, amenities]);

  // Permitir avançar apenas se o formulário for válido
  useEffect(() => {
    if (isFormValid) {
      // Definir um método para permitir o usuário avançar
      // Por exemplo, habilitando o botão de continuar no componente pai
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && isFormValid) {
          onComplete();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFormValid, onComplete]);

  return (
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
              name="condition"
              label="Condição do imóvel"
              value={formData.condition}
              onChange={handleChange}
              error={!!errors.condition}
              helperText={errors.condition}
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
                  name="type"
                  label="Tipo de imóvel"
                  value={formData.type}
                  onChange={handleChange}
                  error={!!errors.type}
                  helperText={errors.type}
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
                  name="sunPosition"
                  label="Posição em relação ao sol"
                  value={formData.sunPosition}
                  onChange={handleChange}
                  error={!!errors.sunPosition}
                  helperText={errors.sunPosition}
                  SelectProps={{
                    displayEmpty: true,
                    IconComponent: () => <Box component="span" sx={{ position: 'absolute', right: 14 }}>▼</Box>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: 1 }
                  }}
                >
                  <MenuItem value="">Selecione</MenuItem>
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
                  name="size"
                  label="Tamanho em M2"
                  placeholder="Ex: 75"
                  type="number"
                  value={formData.size}
                  onChange={handleChange}
                  error={!!errors.size}
                  helperText={errors.size}
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
                  name="rooms"
                  label="Quantidade de quartos"
                  value={formData.rooms}
                  onChange={handleChange}
                  error={!!errors.rooms}
                  helperText={errors.rooms}
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
                  name="suites"
                  label="Quantidade de suítes"
                  value={formData.suites}
                  onChange={handleChange}
                  error={!!errors.suites}
                  helperText={errors.suites}
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
                  name="floor"
                  label="Qual o andar do apartamento?"
                  placeholder="Qual o andar do apartamento?"
                  value={formData.floor}
                  onChange={handleChange}
                  error={!!errors.floor}
                  helperText={errors.floor}
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
                  name="bathrooms"
                  label="Quantidade de banheiros"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  error={!!errors.bathrooms}
                  helperText={errors.bathrooms}
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
                  name="parkingSpaces"
                  label="Quantidade de vagas de garagem"
                  value={formData.parkingSpaces}
                  onChange={handleChange}
                  error={!!errors.parkingSpaces}
                  helperText={errors.parkingSpaces}
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
                  name="iptu"
                  label="Valor do IPTU"
                  placeholder="R$ 0,00"
                  value={formData.iptu}
                  onChange={handleChange}
                  error={!!errors.iptu}
                  helperText={errors.iptu}
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
                control={<Checkbox checked={amenities.privatePool} onChange={handleAmenityChange} name="privatePool" />}
                label="Piscina privativa"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.barbecue} onChange={handleAmenityChange} name="barbecue" />}
                label="Churrasqueira"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.bathroomCabinets} onChange={handleAmenityChange} name="bathroomCabinets" />}
                label="Armários no banheiro"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.bedroomCabinets} onChange={handleAmenityChange} name="bedroomCabinets" />}
                label="Armários no quarto"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.kitchenCabinets} onChange={handleAmenityChange} name="kitchenCabinets" />}
                label="Armários na cozinha"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.balcony} onChange={handleAmenityChange} name="balcony" />}
                label="Varanda"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.jacuzzi} onChange={handleAmenityChange} name="jacuzzi" />}
                label="Banheira de hidromassagem"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.showerBox} onChange={handleAmenityChange} name="showerBox" />}
                label="Box"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.refrigerator} onChange={handleAmenityChange} name="refrigerator" />}
                label="Geladeira inclusa"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.closet} onChange={handleAmenityChange} name="closet" />}
                label="Closet"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.americanKitchen} onChange={handleAmenityChange} name="americanKitchen" />}
                label="Cozinha americana"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.homeOffice} onChange={handleAmenityChange} name="homeOffice" />}
                label="Home-office"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.garden} onChange={handleAmenityChange} name="garden" />}
                label="Jardim"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.wideDoorsAndHallways} onChange={handleAmenityChange} name="wideDoorsAndHallways" />}
                label="Quartos e corredores com portas amplas"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.backyard} onChange={handleAmenityChange} name="backyard" />}
                label="Quintal"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.airConditioner} onChange={handleAmenityChange} name="airConditioner" />}
                label="Ar condicionado"
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={amenities.adaptedBathroom} onChange={handleAmenityChange} name="adaptedBathroom" />}
                label="Banheiro adaptado"
              />
            </Grid2>
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyInfoForm;