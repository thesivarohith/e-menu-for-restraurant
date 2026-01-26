export interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    videoUrl: string;
    gridThumbnail: string;
    specs?: {
        gsm: string;
        fabric: string;
        fit: string;
        origin: string;
    };
}

export const products: Product[] = [
    {
        id: 1,
        title: "ONYX HOODIE",
        price: "₹2,499",
        description: "Premium comfort in deep black",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769399866/onyx-hoodie-video_f11ac9.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769393897/onyx-hoodie_ihelkz.jpg",
        specs: {
            gsm: "450 GSM",
            fabric: "100% French Terry Cotton",
            fit: "Oversized Drop Shoulder",
            origin: "Made in India"
        }
    },
    {
        id: 2,
        title: "ONYX PANT",
        price: "₹1,999",
        description: "Sleek style in midnight",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769395084/onyx-pant-video_udufh3.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769395209/onyx-pant_xuggor.png",
        specs: {
            gsm: "400 GSM",
            fabric: "Cotton Blend Fleece",
            fit: "Relaxed Tapered",
            origin: "Made in India"
        }
    },
    {
        id: 3,
        title: "CONCRETE HOODIE",
        price: "₹2,499",
        description: "Urban edge meets comfort",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769400432/concrete-hoodie-video_q48ygp.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769393612/concrete-hoodie_tro0od.jpg",
        specs: {
            gsm: "450 GSM",
            fabric: "Heavyweight Cotton",
            fit: "Boxy Fit",
            origin: "Made in India"
        }
    },
    {
        id: 4,
        title: "CONCRETE PANT",
        price: "₹1,999",
        description: "Street-ready sophistication",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769395289/concrete-pant-video_nmukq3.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769393764/concrete-pant_bp5kgx.png",
        specs: {
            gsm: "400 GSM",
            fabric: "Cotton Poly Blend",
            fit: "Straight Leg",
            origin: "Made in India"
        }
    },
    {
        id: 5,
        title: "BONE HOODIE",
        price: "₹2,499",
        description: "Clean aesthetics, pure comfort",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769399508/bone-hoodie-video_oldp7k.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769393595/bone-hoodie_arrqvp.jpg",
        specs: {
            gsm: "450 GSM",
            fabric: "Organic Cotton",
            fit: "Oversized",
            origin: "Made in India"
        }
    },
    {
        id: 6,
        title: "BONE PANT",
        price: "₹1,999",
        description: "Minimal design, maximum style",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769400973/bone-pant-video_uzl2pg.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769393640/bone-pant_gfbdv7.png",
        specs: {
            gsm: "400 GSM",
            fabric: "Soft Fleece",
            fit: "Regular",
            origin: "Made in India"
        }
    },
    {
        id: 7,
        title: "EXPRESSO HOODIE",
        price: "₹2,499",
        description: "Rich tones, premium feel",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769393867/expresso-hoodie-video_ccw0gv.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769393597/expresso-hoodie_kmivjk.jpg",
        specs: {
            gsm: "480 GSM",
            fabric: "Ultra Heavy Cotton",
            fit: "Super Oversized",
            origin: "Made in India"
        }
    },
    {
        id: 8,
        title: "EXPRESSO PANT",
        price: "₹1,999",
        description: "Warm elegance in motion",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1769400107/expresso-pant-video_eck1mo.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1769393644/expresso-pant_blgl31.png",
        specs: {
            gsm: "420 GSM",
            fabric: "Premium Fleece",
            fit: "Relaxed",
            origin: "Made in India"
        }
    }
];
