export interface ICarouselData {
    intro: string;
    title: string;
    message: string;
    avatar: string;
}

export interface ICarousel {
    images : Array<ICarouselData>
}

export interface IIntro {
    name: string;
}

export interface IProduct {
    id: number;
    referenceId: string;
    productId: string;
    price: string;
    imageUrl: IImage[];
    materialName: string;
    category: string;
}


export interface IView extends IProduct {
    description: string;
    category: string;
    tag: string;
    order: number; 
    manufacturerBrand: string;
    review: IReview[];
}

export interface IReview {
    id: number;
    name: string;
    dateCreated: string;
    message: string;
    email:string;
    productId: string;
}

export interface ICart {
    id: number;
    name: string;
    price: number;
    quantity: number;
    url: string;
}

export interface IImage {
    id: number;
    url: string;
}

export interface IUser {
    otherName: string;
    surname: string;
    country: string;
    houseNumber: string;
    gpsAddress: string;
    city: string;
    landmark: string;
    pickup: string;
    contact: string;
    email: string;
    note: string;
    gender?: string;
}

export interface IUserContext {
    state: IProduct[]; 
    dispatch: React.Dispatch<IProduct[]>;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IGift {
    coupon: string;
    voucher: string;
}