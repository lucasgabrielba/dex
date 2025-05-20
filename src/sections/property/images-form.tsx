import React, { useState } from 'react';

import Grid from '@mui/material/Grid2'; // Usando Grid2
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Card, Stack, Button, styled, Typography, IconButton, CardContent } from '@mui/material';

// Componente de input escondido para upload estilizado
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface ImagesFormProps {
  onComplete: () => void;
}

const ImagesForm: React.FC<ImagesFormProps> = ({ onComplete }) => {
  const [images, setImages] = useState<string[]>([
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
  ]);

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveAllImages = () => {
    setImages([]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Destaque o Imóvel com Imagens
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Adicione fotos de qualidade para valorizar o imóvel e atrair mais interessados. Faça upload de imagens diretamente do seu computador.
          </Typography>

          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Imagens
          </Typography>

          <Box
            sx={{
              border: '1px dashed #ccc',
              borderRadius: 1,
              p: 5,
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 250,
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Envie as imagens do imóvel
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Solte os arquivos ou clique aqui para navegar pelo seu computador.
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: '#06092B',
                  '&:hover': { bgcolor: '#040619' }
                }}
              >
                Enviar imagens
                <VisuallyHiddenInput
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
          </Box>

          {images.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                {images.map((image, index) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '100%', // 1:1 Aspect Ratio
                        backgroundColor: '#eee',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`Property image ${index + 1}`}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          },
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  // color="error"
                  onClick={handleRemoveAllImages}
                >
                  Remover todas as imagens
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#06092B',
                    '&:hover': { bgcolor: '#040619' }
                  }}
                  startIcon={<CloudUploadIcon />}
                >
                  Enviar imagens
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImagesForm;