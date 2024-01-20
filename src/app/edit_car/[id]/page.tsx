import CarDetailsComponent from '@/components/car_details/CarDetailsComponent';
import EditCarComponent from '@/components/edit_car/EditCar';
import { BACK_END_API_URL } from '@/config';
import axiosInstance from '@/utils/axios';
import { Box } from '@mui/material';
// Explicitly define the type for the count prop

const EditCar = async ({ params }: any) => {
  const CarResponse: CarResponse = await axiosInstance.get(
    `${BACK_END_API_URL}/cars/${params.id}`
  ).then(res => res.data as CarResponse).catch(err => err as CarResponse);

  return (
    <Box component="main" sx={{ background: '#000', color: '#fff', overflow: 'hidden' }}>
      {!CarResponse.error && <EditCarComponent car={CarResponse.data} />}
      {CarResponse.error && CarResponse.message}
    </Box>
  );
};

export default EditCar;