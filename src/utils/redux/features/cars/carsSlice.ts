import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarsState {
    cars: Car[]; // Assuming cars are strings, you can replace it with your specific car type
}

const initialState: CarsState = {
    cars: [],
};

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        initializeCars: (state, action: PayloadAction<Car[]>) => {
            state.cars = action.payload;
        },
        addCar: (state, action: PayloadAction<Car>) => {
            state.cars.push(action.payload);
        },
        deleteCar: (state, action: PayloadAction<string>) => {
            state.cars = state.cars.filter(car => car.id !== action.payload);
        },
    },
});

export const { initializeCars, addCar, deleteCar } = carsSlice.actions;

export default carsSlice.reducer;
