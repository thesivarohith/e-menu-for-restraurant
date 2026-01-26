export interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    videoUrl: string;
    gridThumbnail: string;
}

export const products: Product[] = [
    {
        id: 1,
        title: "ETHEREAL NOIR",
        price: "$2,499",
        description: "Luxury redefined in darkness",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        gridThumbnail: "https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 2,
        title: "OBSIDIAN DREAMS",
        price: "$3,299",
        description: "Where shadows meet desire",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        gridThumbnail: "https://images.pexels.com/photos/1405411/pexels-photo-1405411.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 3,
        title: "MIDNIGHT ESSENCE",
        price: "$1,899",
        description: "Elegance in every detail",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        gridThumbnail: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 4,
        title: "VELVET VOID",
        price: "$4,199",
        description: "Luxury without limits",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        gridThumbnail: "https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 5,
        title: "CARBON DESIRE",
        price: "$2,799",
        description: "Pure sophistication",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        gridThumbnail: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 6,
        title: "NOIR CATALYST",
        price: "$3,599",
        description: "Innovation meets elegance",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        gridThumbnail: "https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 7,
        title: "SHADOW MATRIX",
        price: "$5,299",
        description: "The ultimate expression",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        gridThumbnail: "https://images.pexels.com/photos/1670723/pexels-photo-1670723.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 8,
        title: "ECLIPSE EDITION",
        price: "$4,899",
        description: "Darkness perfected",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        gridThumbnail: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

