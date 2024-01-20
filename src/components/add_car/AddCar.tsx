"use client"
import { useState } from 'react';
import { Box, TextField, Checkbox, Button, FormControlLabel, TextareaAutosize, Input } from '@mui/material';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';


const AddCarComponent: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    mileage: '',
    exterior_colour: '',
    interior_colour: '',
    driver_position: '',
    engine: '',
    body_type: '',
    transmission: '',
    price: '',
    featured: false,
    car_id: '',
    doors: '',
    power: '',
    torque: '',
    specification: '',
    top_speed: '',
    zero_to_100: '',
    more_info: '',
    ask_price: false,
    images: [{ link: '' }],
    main_image: { link: '' },
    car_brand: '',
  });
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState<any[]>([]);
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === 'file') {
      if (name === 'image')
        setMainImage(files[0]);
      else {
        if (files.length) {
          const newImages = [...images, files[0]];
          // Update the state with the new array
          setImages(newImages);
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  const handleImagesUpload = async () => {
    try {
      if (!images.length) return;
      const images_objects: { link: string }[] = await Promise.all(images.map((async image => {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axiosInstance.post('http://localhost:3001/cars/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return { link: response.data.data.link as string };
      })))
      setFormData((prevData) => ({
        ...prevData,
        images: images_objects,
      }));
      console.log('Images uploaded successfully:', images_objects.map(image => image.link));
      return images_objects;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleImageUpload = async () => {
    try {
      if (mainImage === null) return;
      const formData = new FormData();
      formData.append('image', mainImage);

      const response = await axiosInstance.post('http://localhost:3001/cars/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the API response contains the image link
      const imageLink = response.data.data.link;

      // Add the image link to your car record
      setFormData((prevData) => ({
        ...prevData,
        main_image: { link: imageLink },
      }));
      return { link: imageLink };
      console.log('Image uploaded successfully:', imageLink);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const main_image = await handleImageUpload();
    const images = await handleImagesUpload();
    await axiosInstance.post('http://localhost:3001/cars', { ...formData, images, main_image }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      router.push('/');
    });
  };

  return (
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
          required
        />

        {mainImage && <div>
          <p style={{ marginTop: '20px', marginBottom: '20px' }}>The selected main image</p>
          <img src={URL.createObjectURL(mainImage)} alt={"Main image"} style={{ maxWidth: '40%', margin: '10px' }} />
        </div>}
        <br />
        <Input
          type="file"
          name="images"
          onChange={handleChange}
          inputProps={{ accept: 'image/*' }}
          margin="dense"
          required
        />
        {images.length && <div>
          <p style={{ marginTop: '20px', marginBottom: '20px' }}>The selected images:</p>
          {images.map((image, index) => (
            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} style={{ maxWidth: '20%', margin: '10px' }} />
          ))}
        </div>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddCarComponent;