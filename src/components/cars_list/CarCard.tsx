"use client";
import { Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import './CarCard.css'
// Explicitly define the type for the count prop
interface CarCardProps {
  car: Car;
}
const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const cardDetailsRoute = '/car/' + car.id; // Replace with your actual route
  const router = useRouter();
  const handleCardClick = () => {
    // You can also navigate to another page
    router.push(cardDetailsRoute);
  };
  return (
    <div className="card" onClick={handleCardClick}>
      <img className="card-image" src={car.main_image.link} alt={car.car_brand} />
      <div className="card-body" >
        <p className="card-title">{car.title}</p>
        <div className="card-details">
          <Grid container>
            <Grid item xs={6}>
              {car.ask_price ? "ASK FOR PRICE" : car.price ? "AED " + car.price : "ASK FOR PRICE"}
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              {car.year} | {car.mileage}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default CarCard;