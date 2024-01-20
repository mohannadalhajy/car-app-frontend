interface Car {
    id: string;
    title: string;
    description: string;
    year: number;
    mileage: string;
    exterior_colour: string;
    interior_colour: string;
    driver_position: string;
    engine: string;
    body_type: string;
    transmission: string;
    price: number;
    featured: Boolean;
    car_id: string;
    doors: number;
    power: string;
    torque: string;
    specification: string;
    top_speed: number;
    zero_to_100: number;
    more_info: string;
    ask_price: Boolean;
    images: image[];
    main_image: image;
    car_brand: string;
}
interface CarRecord {

    id: string;
    title: string;
    description: string;
    year: number;
    mileage: number;
    exterior_colour: string;
    interior_colour: string;
    driver_position: string;
    engine: string;
    body_type: string;
    transmission: string;
    price: number;
    featured: Boolean;
    car_id: string;
    doors: number;
    power: number;
    torque: number;
    specification: string;
    top_speed: number;
    zero_to_100: number;
    more_info: string;
    ask_price: Boolean;
    images: IImage[];
    main_image: IImage;
    car_brand: string;
    created_at: Date;
    updated_at: Date;

}
interface CarResponse {
    message: string;
    error: string;
    statusCode: number;
    data: any;
}