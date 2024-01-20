import CarDetailsComponent from '@/components/car_details/CarDetailsComponent';
import { BACK_END_API_URL } from '@/config';
import axiosInstance from '@/utils/axios';
import { Box } from '@mui/material';
// Explicitly define the type for the count prop

const CarDetails = async ({ params }: any) => {
  const CarResponse: CarResponse = await axiosInstance.get(
    `${BACK_END_API_URL}/cars/details/${params.id}`
  ).then(res => res.data as CarResponse).catch(err => err as CarResponse);

  return (
    <Box component="main" sx={{ background: '#000', color: '#fff', overflow: 'hidden' }}>
      {!CarResponse.error && < CarDetailsComponent car={CarResponse.data} />}
      {CarResponse.error && CarResponse.message}
    </Box>
  );
};

export default CarDetails;