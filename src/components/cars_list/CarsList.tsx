"use client";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CarStoreProvider from '../CarStoreProvider'; // Adjust the path
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import axiosInstance from '@/utils/axios';
import { addCar, deleteCar, initializeCars } from '@/utils/redux/features/cars/carsSlice';
import CarCard from './CarCard';
import Link from 'next/link';
import { BACK_END_API_URL } from '@/config';

interface RootState {
  cars: {
    cars: Car[];
  };
  // Add other slices if any
}

const CarsList = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.cars.cars);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${BACK_END_API_URL}/cars`);
        dispatch(initializeCars(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleAddCar = () => {
    dispatch(addCar({
      "id": "SPEEDTAIL",
      "title": "SPEEDTAIL",
      "description": "Maximum Speed: 403km/h (250mph), 0-100kph (62mph): 3.0 seconds, 0-200kph (124mph): 6.6 seconds, Maximum Power: 1036 Horsepower, Maximum Torque: 1150 Nm, Engine: V8, 4.0L with eMotor, Technology: Twin-Turbocharged V8 Engine with a parallel hybrid system, Breaking (100-0 Km/h): 32 meters, Breaking (200-0 Km/h): 132 meters, Dry Weight: 1,499kg, Kerb Weight: 1,597 kg",
      "year": 2021,
      "mileage": "0 KM",
      "exterior_colour": "WHITE",
      "interior_colour": "DARK",
      "driver_position": "RWD",
      "engine": "4.0L V-8 Twin-Turbocharged Engine + eMotor",
      "body_type": "Coupe",
      "transmission": "7 Speed Automatic Transmission",
      "price": 13999000,
      "featured": true,
      "car_id": "FM-1010",
      "doors": 2,
      "power": "1036 HP",
      "torque": "1150 N.M",
      "specification": "EUROPEAN",
      "top_speed": 400,
      "zero_to_100": 3,
      "more_info": "Introducing the McLaren Speedtail, a stunning and revolutionary hypercar that blends breathtaking performance, unrivaled luxury, and extraordinary innovation. The Speedtail's sleek and aerodynamic design is a testament to the pinnacle of automotive engineering and design, pushing new boundaries in both form and function. With a powerful hybrid powertrain delivering an astonishing 1070PS, the Speedtail is the fastest McLaren to date. However, it's not just a fast car - it's a true work of art, featuring bespoke materials and textures that offer unparalleled levels of personalization. Whether you're a speed enthusiast or a design aficionado, the McLaren Speedtail is the ultimate hypercar that will leave you in awe. The company's vision was to create something truly exceptional, and they have accomplished this by producing only 106 bespoke hybrid hyper-GT cars. This limited number has allowed the company to push the boundaries of innovation, exploring materials and textures that have never before been utilized in the automotive industry. The result is a car that is as rare as it is revolutionary, embodying the company's commitment to unparalleled luxury, performance, and design. Introducing the McLaren Speedtail, a stunning and revolutionary hypercar that blends breathtaking performance, unrivaled luxury, and extraordinary innovation. The Speedtail's sleek and aerodynamic design is a testament to the pinnacle of automotive engineering and design, pushing new boundaries in both form and function. With a powerful hybrid powertrain delivering an astonishing 1070PS, the Speedtail is the fastest McLaren to date. However, it's not just a fast car - it's a true work of art, featuring bespoke materials and textures that offer unparalleled levels of personalization. Whether you're a speed enthusiast or a design aficionado, the McLaren Speedtail is the ultimate hypercar that will leave you in awe. The company's vision was to create something truly exceptional, and they have accomplished this by producing only 106 bespoke hybrid hyper-GT cars. This limited number has allowed the company to push the boundaries of innovation, exploring materials and textures that have never before been utilized in the automotive industry. The result is a car that is as rare as it is revolutionary, embodying the company's commitment to unparalleled luxury, performance, and design.",
      "ask_price": false,
      "images": [],
      "main_image": { id: "", link: "" },
      "car_brand": "MCLAREN"
    }));
  };

  const handleDeleteCar = () => {
    // dispatch(addCar());
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Link href="/add_car">
        <p style={{ width: '200px', display: 'block', margin: '20px', padding: '10px', background: '#0070f3', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '5px' }}>
          Add new Car
        </p>
      </Link>
      <Grid container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {cars.map(car => (
          <Grid item>
            <CarCard car={car} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Explicitly define the type for the count prop
interface CarsListWithStoreProps {
  cars: Car[];
}

// Wrap your component with the CarStoreProvider
const CarsWithStore: React.FC<CarsListWithStoreProps> = ({ cars }) => (
  <CarStoreProvider cars={cars}>
    <CarsList />
  </CarStoreProvider>
);

// This function gets called at build time
export async function getStaticProps() {
  // Fetch initial data from your API or any other source
  const response = await axiosInstance.get(`${BACK_END_API_URL}/cars`);
  const cars: Car[] = response.data;

  // Pass data to the page via props
  return {
    props: {
      cars,
    },
  };
}

export default CarsWithStore;
