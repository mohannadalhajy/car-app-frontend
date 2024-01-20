'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../utils/redux/store'
import { initializeCars } from '../utils/redux/features/cars/carsSlice'

export default function CarStoreProvider({
    cars,
    children
}: {
    cars: Car[]
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
        storeRef.current.dispatch(initializeCars(cars))
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}