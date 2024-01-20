"use client"
import { useEffect, useState } from 'react';
import { Box, TextField, Checkbox, Button, FormControlLabel, TextareaAutosize, Input, Grid } from '@mui/material';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
interface CarDetailsPageProps {
  car: CarRecord; // Assuming you have a Car type defined
}

const EditCarComponent: NextPage<CarDetailsPageProps> = ({ car }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(car);
  const [mainImage, setMainImage] = useState(car.main_image.link);
  const [images, setImages] = useState<any[]>(car.images);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setImages(car.images)
        setMainImage(car.main_image.link)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [formData]);
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === 'file') {
      if (name === 'image')
        handleImageUpload(files[0]);
      else {
        if (files.length) {
          handleImagesUpload(files[0])
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  const handleImagesUpload = async (file: any) => {
    try {
      if (!images.length) return;
      const formData = new FormData();
      formData.append('image', file);


      await axiosInstance.post(`http://localhost:3001/cars/${car.id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => setImages(res.data.data));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleImageUpload = async (file: any) => {
    try {
      if (mainImage === null) return;
      const formData = new FormData();
      formData.append('image', file);
      await axiosInstance.post(`http://localhost:3001/cars/${car.id}/main_image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => setMainImage(res.data.data.link));

      // Assuming the API response contains the image link
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axiosInstance.post('http://localhost:3001/cars', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      router.push('/');
    });
  };
  const handleDeleteImage = async (index: any) => {
    await axiosInstance.delete(`http://localhost:3001/cars/${car.id}/images/${images[index].id}`).then(res => setImages(res.data.data));
  };
  return (!formData || !images.length || !mainImage ? "" :
    <Box component="main" sx={{ background: '#fff', color: '#000', overflow: 'hidden', padding: '40px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Year"
          variant="outlined"
          fullWidth
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Mileage"
          variant="outlined"
          fullWidth
          name="mileage"
          type="number"
          value={formData.mileage}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Exterior Colour"
          variant="outlined"
          fullWidth
          name="exterior_colour"
          value={formData.exterior_colour}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Interior Colour"
          variant="outlined"
          fullWidth
          name="interior_colour"
          value={formData.interior_colour}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Driver Position"
          variant="outlined"
          fullWidth
          name="driver_position"
          value={formData.driver_position}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Engine"
          variant="outlined"
          fullWidth
          name="engine"
          value={formData.engine}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Body Type"
          variant="outlined"
          fullWidth
          name="body_type"
          value={formData.body_type}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Transmission"
          variant="outlined"
          fullWidth
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Car ID"
          variant="outlined"
          fullWidth
          name="car_id"
          value={formData.car_id}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Doors"
          variant="outlined"
          fullWidth
          name="doors"
          type="number"
          value={formData.doors}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Power"
          variant="outlined"
          fullWidth
          name="power"
          type="number"
          value={formData.power}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Torque"
          variant="outlined"
          fullWidth
          name="torque"
          type="number"
          value={formData.torque}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Specification"
          variant="outlined"
          fullWidth
          name="specification"
          value={formData.specification}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Top Speed"
          variant="outlined"
          fullWidth
          name="top_speed"
          type="number"
          value={formData.top_speed}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="0-100 km/h"
          variant="outlined"
          fullWidth
          name="zero_to_100"
          type="number"
          value={formData.zero_to_100}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Car Brand"
          variant="outlined"
          fullWidth
          name="car_brand"
          value={formData.car_brand}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextareaAutosize
          aria-label="More Info"
          placeholder="More Info"
          minRows={4}
          name="more_info"
          value={formData.more_info}
          onChange={handleChange}
          style={{ width: '100%', resize: 'vertical', margin: '16px 0', backgroundColor: '#fff', color: '#000' }}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.featured}
              onChange={handleChange}
              name="featured"
              color="primary"
            />
          }
          label="Featured"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.ask_price}
              onChange={handleChange}
              name="ask_price"
              color="primary"
            />
          }
          label="Ask Price"
        />
        <br />
        <Input
          type="file"
          name="image"
          onChange={handleChange}
          inputProps={{ accept: 'image/*' }}
          margin="dense"
        />

        {mainImage && <div>
          <p style={{ marginTop: '20px', marginBottom: '20px' }}>The selected main image</p>
          <img src={`http://localhost:3001/public/${mainImage}`} alt={"Main image"} style={{ maxWidth: '40%', margin: '10px' }} />
        </div>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <br />
      <Input
        type="file"
        name="images"
        onChange={handleChange}
        inputProps={{ accept: 'image/*' }}
        margin="dense"
      />
      {images.length && <div>
        <p style={{ marginTop: '20px', marginBottom: '20px' }}>The selected images:</p>
        <Grid container>
          {images.map((image, index) => (
            <Grid item key={index} style={{ position: 'relative', maxWidth: '20%', margin: '10px' }}>
              <img
                src={`http://localhost:3001/public/${image.link}`}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              {images.length > 1 && <button
                onClick={() => handleDeleteImage(index)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>}
            </Grid>))}
        </Grid>
      </div>}
    </Box>
  );
};

export default EditCarComponent;