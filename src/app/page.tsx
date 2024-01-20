// import CarsList from "@/components/cars_list/CarsList";
import { Box } from "@mui/material";
import CarsWithStore from "@/components/cars_list/CarsList";

export default function Home() {
  return (
    <Box component="main" sx={{ background: '#fff', color: '#000', overflow: 'hidden' }}>
      <CarsWithStore cars={[]} />
    </Box>
  )
}
