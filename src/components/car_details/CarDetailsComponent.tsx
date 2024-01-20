"use client";
import axiosInstance from '@/utils/axios';
import { Grid } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './CarDetailsComponent.css'
interface CarDetailsPageProps {
  car: Car; // Assuming you have a Car type defined
}

const CarDetailsComponent: NextPage<CarDetailsPageProps> = ({ car }) => {
  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (editClicked) {
      // Add your edit logic here
      console.log("Edit button clicked");
      // Reset state after handling the event
      setEditClicked(false);
    }
    if (deleteClicked) {
      // Add your delete logic here
      axiosInstance.delete('http://localhost:3001/cars/' + car.id).then(res => {
        router.push('/');
      })
      setDeleteClicked(false);
    }
  }, [editClicked, deleteClicked]);

  return (car ? <div style={{ padding: '20px', background: '#fff', color: '#000', alignItems: 'center', }}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <h2>{car.title}</h2>
      </Grid>
      <Grid item xs={6}>
        <h2>
          {car.ask_price ? "Ask price" : `AED ${car.price}`}
        </h2>
      </Grid>
    </Grid>
    <div style={{ marginBottom: '15px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <img src={car.main_image.link} alt="Main Car Image" style={{ maxWidth: '100%', marginTop: '20px' }} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <p style={{ marginBottom: '20px' }}>
                <strong>Description:</strong>
              </p>
              <p style={{ marginBottom: '20px' }}>
                {car.description}
              </p>
              <p style={{ marginBottom: '20px' }}>
                <strong>More Info:</strong>
              </p>
              <p style={{ marginBottom: '20px' }}>
                {car.more_info}
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="spec-title">SPECIFICATION</p>
              <Grid container style={{ backgroundColor: "#E7E7E7", paddingBottom: '10px' }}>
                <Grid item xs={4} className='spec-row'><strong>Year:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.year}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Mileage:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.mileage}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Exterior Colour:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.exterior_colour}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Interior Colour:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.interior_colour}</Grid>
                <Grid item xs={4} className='spec-row'><strong>DRIVE TYPE:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.driver_position}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Engine:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.engine}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Body Type:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.body_type}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Transmission:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.transmission}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Doors:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.doors}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Top Speed:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.top_speed}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Torque:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.torque}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Power:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.power}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Specification:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.specification}</Grid>
                <Grid item xs={4} className='spec-row'><strong>Price:</strong></Grid>
                <Grid item xs={8} className='spec-row'>{car.ask_price ? "Ask price" : `AED ${car.price}`}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ marginTop: '30px' }}>
        {car.images.map(image => (<img src={image.link} alt="Main Car Image" style={{ maxWidth: '30%', margin: '10px' }} />))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Link href={`/edit_car/${car.id}`}>
          <p style={{ width: '200px', display: 'block', padding: '10px', background: '#0070f3', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '5px' }}>
            Edit
          </p>
        </Link>
        <button onClick={() => setDeleteClicked(true)} style={{ width:'200px', padding: '10px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Delete
        </button>
      </div>
      <Link href="/">
        <p style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#0070f3', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '5px' }}>
          Go to Car Page
        </p>
      </Link>
    </div>
  </div> : <div>This car is not exist anymore</div>
  );
};

export default CarDetailsComponent;