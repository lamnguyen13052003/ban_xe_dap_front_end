import React from 'react';
import {Box, Stack} from "@mui/material";
import {images as menu_item_images} from "../../assets/images/menu-item/images";
import CategoryItem from "./CategoryItem";
import {CategoryType} from "../../types/category.type";

const categoryItemProps: CategoryType[] = [
    {
        title: "Xe đạp trẻ em",
        url: menu_item_images.xe_dap_tre_em,
        to: "#"
    },
    {
        title: "Xe đạp thể thao",
        url: menu_item_images.xe_dap_the_thao,
        to: "#"
    },
    {
        title: "Xe đạp địa hình",
        url: menu_item_images.xe_dap_dia_hinh,
        to: "#"
    },
    {
        title: "Xe đạp đua",
        url: menu_item_images.xe_dap_dua,
        to: "#"
    },
    {
        title: "Xe đạp tourning",
        url: menu_item_images.xe_dap_touring,
        to: "#"
    },
    {
        title: "Xe đạp nữ",
        url: menu_item_images.xe_dap_nu,
        to: "#"
    },
    {
        title: "Xe đạp gáp",
        url: menu_item_images.xe_dap_gap,
        to: "#"
    },
    {
        title: "Phụ kiện xe đạp",
        url: menu_item_images.phu_kien_xe_dap,
        to: "#"
    },
]


function ListCategory(
    props: {
        mt?: number,
        mb?: number,
        ml?: number,
        mr?: number,
        pt?: number,
        pb?: number,
        pl?: number,
        pr?: number,
        px?: number,
        py?: number,
        p?: number,
        m?: number,
        mx?: number,
        my?: number
    }
) {
    return (
        <Box width={'100%'} {...props} >
            <Stack direction={"row"} flexWrap={"wrap"}
                   className={"justify-content-center row-gap-lg-2 gap-2"}>
                {renderCategoryItem()}
            </Stack>
        </Box>
    );
}

const renderCategoryItem = () => {
    return categoryItemProps.map((item, index) => {
        return (
            <CategoryItem key={index} {...item}/>
        );
    });
}

export default ListCategory;


