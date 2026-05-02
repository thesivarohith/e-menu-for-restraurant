export interface MenuItem {
    id: number;
    title: string;
    price: string;
    originalPrice: string;
    description: string;
    videoUrl: string;
    gridThumbnail: string;
    category: 'Starters' | 'Rice & Biryani' | 'Mains' | 'Breads' | 'Sides' | 'Drinks' | 'Desserts';
    type: 'veg' | 'non-veg';
}

export const menuItems: MenuItem[] = [
    {
        id: 1,
        title: "Crispy Chicken Popcorn",
        price: "₹199",
        originalPrice: "₹249",
        description: "Bite-sized pieces of chicken, breaded and fried to perfection.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777699993/Crispy_chicken_popcorn_picked_up_202605020952_cuaauk.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699917/Crispy_chicken_popcorn_dark_bowl_202605020934.jpeg_202605020952_zcediw.jpg",
        category: "Starters",
        type: "non-veg"
    },
    {
        id: 2,
        title: "Paneer Tikka",
        price: "₹229",
        originalPrice: "₹279",
        description: "Marinated paneer cubes grilled in a tandoor.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700227/Paneer_tikka_skewers_rising_202605020952_kz7irs.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777700103/Paneer_tikka_skewers_presentation_202605020934.jpeg_202605020952_ucmb7t.jpg",
        category: "Starters",
        type: "veg"
    },
    {
        id: 3,
        title: "Masala Fries",
        price: "₹149",
        originalPrice: "₹179",
        description: "Classic French fries tossed in a spicy Indian masala.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700056/Masala_fries_falling_spice_202605020952_x0besp.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777700061/Masala_fries_with_spice_dusting_202605020934.jpeg_202605020952_fs3apq.jpg",
        category: "Starters",
        type: "veg"
    },
    {
        id: 4,
        title: "Chicken 65",
        price: "₹219",
        originalPrice: "₹269",
        description: "Spicy, deep-fried chicken dish originating from Chennai.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777699981/Chicken_65_sizzling_oil_sheen_202605020952_cm3kgz.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699895/Chicken_65_glossy_spicy_coating_202605020934.jpeg_202605020952_sggcow.jpg",
        category: "Starters",
        type: "non-veg"
    },
    {
        id: 5,
        title: "Chicken Biryani",
        price: "₹299",
        originalPrice: "₹349",
        description: "Aromatic basmati rice cooked with succulent chicken and spices.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777698814/Chicken_biryani_in_copper_handi_202605020952_phx0zs.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699887/Chicken_biryani_in_copper_handi_202605020934.jpeg_202605020952_bf30sf.jpg",
        category: "Rice & Biryani",
        type: "non-veg"
    },
    {
        id: 6,
        title: "Egg Fried Rice",
        price: "₹199",
        originalPrice: "₹249",
        description: "Wok-tossed rice with scrambled eggs and vegetables.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777699946/Egg_fried_rice_with_chopsticks_202605020952_w8lemj.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699940/Egg_fried_rice_dark_bowl_202605020934.jpeg_202605020952_sqzj46.jpg",
        category: "Rice & Biryani",
        type: "non-veg"
    },
    {
        id: 7,
        title: "Veg Biryani",
        price: "₹249",
        originalPrice: "₹299",
        description: "Fragrant rice dish prepared with seasonal vegetables.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700167/Veg_biryani_in_copper_vessel_202605020952_xjfaka.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777700252/Veg_biryani_in_copper_vessel_202605020934.jpeg_202605020952_nxnwnd.jpg",
        category: "Rice & Biryani",
        type: "veg"
    },
    {
        id: 8,
        title: "Mutton Biryani",
        price: "₹349",
        originalPrice: "₹399",
        description: "Slow-cooked rice with tender mutton pieces and whole spices.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700104/Mutton_biryani_lifted_with_spoon_202605020952_k9cyrw.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777700070/Mutton_biryani_luxury_plating_202605020934.jpeg_202605020952_yylnz6.jpg",
        category: "Rice & Biryani",
        type: "non-veg"
    },
    {
        id: 9,
        title: "Butter Chicken",
        price: "₹319",
        originalPrice: "₹369",
        description: "Creamy tomato-based curry with grilled chicken.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700404/Butter_chicken_with_cream_202605020952_fghrj6.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699885/Butter_chicken_in_bowl_202605020934.jpeg_202605020952_hbojel.jpg",
        category: "Mains",
        type: "non-veg"
    },
    {
        id: 10,
        title: "Paneer Butter Masala",
        price: "₹279",
        originalPrice: "₹329",
        description: "Rich and creamy paneer curry in a tomato gravy.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700091/Paneer_butter_masala_poured_gravy_202605020952_rw8glm.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777700095/Paneer_butter_masala_presentation_202605020934.jpeg_202605020952_tazgq7.jpg",
        category: "Mains",
        type: "veg"
    },
    {
        id: 11,
        title: "Chicken Chettinad Curry",
        price: "₹299",
        originalPrice: "₹349",
        description: "Traditional South Indian spicy chicken curry.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777699913/Chicken_chettinad_curry_bubbling_202605020952_atip4p.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699902/Chicken_Chettinad_curry_black_bowl_202605020934.jpeg_202605020952_qdk2zl.jpg",
        category: "Mains",
        type: "non-veg"
    },
    {
        id: 12,
        title: "Garlic Naan",
        price: "₹59",
        originalPrice: "₹79",
        description: "Soft tandoori bread flavored with garlic.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700213/Garlic_naan_with_melting_butter_202605020952_gw0vns.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699735/Garlic_naan_with_butter_glaze_202605020934.jpeg_202605020952_uk18ud.jpg",
        category: "Breads",
        type: "veg"
    },
    {
        id: 13,
        title: "Parotta",
        price: "₹39",
        originalPrice: "₹59",
        description: "Layered flatbread from South India.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777699395/Parotta_layers_pulled_apart_202605020952_ejygh6.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699953/Flaky_parotta_on_banana_leaf_202605020934.jpeg_202605020952_pcgrpx.jpg",
        category: "Breads",
        type: "veg"
    },
    {
        id: 14,
        title: "Raita",
        price: "₹59",
        originalPrice: "₹79",
        description: "Yogurt-based side dish with cucumber and spices.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700360/Yogurt_poured_into_cup_202605020952_cx6cr1.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777698881/Cucumber_raita_in_cup_202605020934.jpeg_202605020952_husqsb.jpg",
        category: "Sides",
        type: "veg"
    },
    {
        id: 15,
        title: "Onion Salad",
        price: "₹49",
        originalPrice: "₹69",
        description: "Freshly sliced onions with lemon and green chilies.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700317/Onion_salad_lemon_squeezed_202605020952_xxoq5m.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777700072/Onion_salad_with_lemon_chili_202605020934.jpeg_202605020952_lhsxol.jpg",
        category: "Sides",
        type: "veg"
    },
    {
        id: 16,
        title: "Mango Lassi",
        price: "₹119",
        originalPrice: "₹149",
        description: "Refreshing yogurt drink with mango pulp.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777698841/Mango_lassi_being_poured_202605020952_bzascz.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777698769/Mango_lassi_in_glass_202605020934.jpeg_202605020952_w0fugw.jpg",
        category: "Drinks",
        type: "veg"
    },
    {
        id: 17,
        title: "Masala Chai",
        price: "₹49",
        originalPrice: "₹69",
        description: "Spiced Indian milk tea.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700064/Masala_chai_poured_from_height_202605020952_i1japx.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777700022/Masala_chai_in_kulhad_202605020934.jpeg_202605020952_pcai2e.jpg",
        category: "Drinks",
        type: "veg"
    },
    {
        id: 18,
        title: "Fresh Lime Soda",
        price: "₹79",
        originalPrice: "₹99",
        description: "Bubbly lime drink, served sweet or salty.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777698880/Lime_soda_bubbles_rising_202605020952_fsq4nm.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777698757/Lime_soda_in_dark_glass_202605020934.jpeg_202605020952_gx6ah4.jpg",
        category: "Drinks",
        type: "veg"
    },
    {
        id: 19,
        title: "Gulab Jamun",
        price: "₹99",
        originalPrice: "₹129",
        description: "Sweet milk solids dumplings soaked in rose syrup.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777699973/Gulab_jamun_drizzled_with_syrup_202605020952_raooo9.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777699977/Gulab_jamun_in_ceramic_bowl_202605020934.jpeg_202605020952_zmcmsi.jpg",
        category: "Desserts",
        type: "veg"
    },
    {
        id: 20,
        title: "Kulfi",
        price: "₹119",
        originalPrice: "₹149",
        description: "Traditional Indian frozen dairy dessert.",
        videoUrl: "https://res.cloudinary.com/darbjeyc2/video/upload/v1777699989/Kulfi_melting_with_pistachio_202605020952_qwsxtf.mp4",
        gridThumbnail: "https://res.cloudinary.com/darbjeyc2/image/upload/v1777698749/Kulfi_on_dark_slate_plate_202605020934.jpeg_202605020952_cmxfnj.jpg",
        category: "Desserts",
        type: "veg"
    }
];
