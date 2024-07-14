import {Box, Breadcrumbs, Button, FormControl, InputLabel, Select, SelectChangeEvent, Stack} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PriceFilter, {MAX_HEIGHT} from "../components/product-by-category/PriceFilter";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../configs/store";
import {getProductsByCategory, getProductsByFilter} from "../slice/product.slice";
import {TitleCategorySlugToNum} from "../utils/convertNumToNameCategory";
import ProductList from "../components/product-list";
import FilterAttributeType from "../types/filterAttribute.type";
import {getFilterAttribute} from "../slice/filter.slice";
import {createQueryFilter, getQueryOnURL} from "../utils/getQueryOnURL";
import {setDataAdditionalFilter} from "../slice/selectFilter.slice";
import {ProductHasTotalType} from "../types/productsHasTotal.type";
import {FilterType} from "../types/filter.type";
import MultipleSelectChip from "../components/product-by-category/MultipleSelectChip";

/*
xe dap tre em: 0
xe dap the thao: 1
xe dap dia hinh: 2
xe dap dua: 3
xe dap touring: 4
xe dap nu: 5
xe dap gap : 6
 */
function getRootState(count: number, filterClick: number) {
    document.title = "Danh mục sản phẩm"
    const {category} = useParams()
    const category_id: number = TitleCategorySlugToNum(category)
    let data: ProductHasTotalType
    let filter: FilterAttributeType
    switch (category_id) {
        case 0:
            data = useSelector((state: RootState) => state.product.babyBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
        case 1:
            data = useSelector((state: RootState) => state.product.sportBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
        case 2:
            data = useSelector((state: RootState) => state.product.topographicBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
        case 3:
            data = useSelector((state: RootState) => state.product.racingBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
        case 4:
            data = useSelector((state: RootState) => state.product.touringBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
        case 5:
            data = useSelector((state: RootState) => state.product.femaleBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
        case 6:
            data = useSelector((state: RootState) => state.product.foldBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
        default:
            data = useSelector((state: RootState) => state.product.babyBicycle)
            filter = useSelector((state: RootState) => state.filter)
            break
    }

    const hasFilter = getQueryOnURL(category_id, count)

    const selectFilter: FilterAttributeType = useSelector((state: RootState) => state.selectFilter)
    const {brands, prices, wheelSizes, materials, targetUsings, additional} = selectFilter
    const dispatch = useAppDispatch()
    const query = createQueryFilter(brands, wheelSizes, materials, targetUsings, `${prices.min}-${prices.max}`, additional)

    useEffect(() => {
        if (hasFilter) return
        const promise = dispatch(getProductsByCategory({category: category_id, page: count}))
        return () => {
            promise.abort()
        }
    }, [count]);

    useEffect(() => {
        const promiseFilter = dispatch(getProductsByFilter({category: category_id, page: count, queryParams: query}))
        return () => {
            promiseFilter.abort()
        }
    }, [filterClick]);


    useEffect(() => {
        const promiseFilter = dispatch(getFilterAttribute(category_id))
        return () => {
            promiseFilter.abort()
        }
    }, []);
    return {query, data, filter, hasFilter}
}

function TitlePage(props: Title) {
    return (
        <>
            <Box className={'py-1 d-lg-flex justify-content-between align-items-center'}>
                <Box>
                    <Breadcrumbs className={'fw-bold text-uppercase'} aria-label="breadcrumb">
                        <Link color="inherit" to="/">
                            Trang chủ
                        </Link>
                        <Typography color="text.primary">{props.name}</Typography>
                    </Breadcrumbs>
                </Box>

                <Box className={'fw-bold'}>
                    <Stack direction={'row'} alignItems={'center'} alignContent={'center'} gap={1}>
                        <Box>
                            <span>Hiển thị tất cả {props.result} kết quả</span>
                        </Box>
                        <SelectSmallFilter/>
                    </Stack>

                </Box>
            </Box>

        </>
    )
}

function SelectSmallFilter() {
    const dispatch = useAppDispatch()
    const [filter, setFilter] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
        dispatch(setDataAdditionalFilter(event.target.value))
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl sx={{m: 1, minWidth: 220}} fullWidth>
                <InputLabel id="select-small-label">Lọc</InputLabel>
                <Select
                    labelId="select-small-label"
                    id="select-small"
                    value={filter}
                    label="Filter"
                    onChange={handleChange}
                >
                    <MenuItem defaultChecked={true} value={0}>Mặc định</MenuItem>
                    <MenuItem value={1}>Mới nhất</MenuItem>
                    <MenuItem value={2}>Theo giá: Tăng dần</MenuItem>
                    <MenuItem value={3}>Theo giá: Giảm dần</MenuItem>
                    <MenuItem value={4}>Theo mức độ phổ biến</MenuItem>
                </Select>
            </FormControl>
        </Box>

    );
}

function Products() {
    const {category, page} = useParams()
    const [count, setCount] = useState(parseInt(page as string))
    const [btnFilterClick, setBtnFilterClick] = useState(0)

    const rootState = getRootState(count, btnFilterClick)
    let isHasFilter = rootState.hasFilter
    const brandsFilterProps: FilterType = {
        nameLabel: "Thương hiệu",
        itemSelected: rootState.filter.brands,
        inputLabelId: "inputLabelId-brand",
        selectLabelId: "selectLabelId-brand",
        selectId: "selectId-brand",
        outlineInputId: "outlineInputId-brand",
        maxHeight: MAX_HEIGHT,
        width: 200
    }
    const wheelSizeFilterProps: FilterType = {
        nameLabel: "Kích thước bánh xe",
        itemSelected: rootState.filter.wheelSizes,
        inputLabelId: "inputLabelId-wheelSize",
        selectLabelId: "selectLabelId-wheelSize",
        selectId: "selectId-wheelSize",
        outlineInputId: "outlineInputId-wheelSize",
        maxHeight: MAX_HEIGHT,
        width: 200
    }
    const materialsFilterProps: FilterType = {
        nameLabel: "Chất liệu",
        itemSelected: rootState.filter.materials,
        inputLabelId: "inputLabelId-material",
        selectLabelId: "selectLabelId-material",
        selectId: "selectId-material",
        outlineInputId: "outlineInputId-material",
        maxHeight: MAX_HEIGHT,
        width: 200
    }
    const purposeOfUseFilterProps: FilterType = {
        nameLabel: "Mục đích sử dụng",
        itemSelected: rootState.filter.targetUsings,
        inputLabelId: "inputLabelId-purposeOfUse",
        selectLabelId: "selectLabelId-purposeOfUse",
        selectId: "selectId-targetUsing",
        outlineInputId: "outlineInputId-purposeOfUse",
        maxHeight: MAX_HEIGHT,
        width: 200
    }
    const values = {min: rootState.filter.prices.min, max: rootState.filter.prices.max}

    const handlerClickSeeMore = () => {
        setCount(count + 1)
        setBtnFilterClick(btnFilterClick + 1)
    }
    const handlerDisabled = () => {
        return rootState.data.total === rootState.data.products.length
    }

    const unClickLink = (event: any) => {
        if (handlerDisabled()) event.preventDefault()
    }

    const handlerClickFilter = () => {
        setBtnFilterClick(btnFilterClick + 1)
        setCount(1)
    }
    return (
        <>
            <Container>
                <TitlePage name={rootState.data.category} result={rootState.data.products.length}/>
                <Stack direction={"column"} gap={2}>
                    <Stack direction={'row'} gap={1} alignItems={'start'}>
                        <MultipleSelectChip {...brandsFilterProps}/>
                        <PriceFilter {...values} />
                        <MultipleSelectChip {...wheelSizeFilterProps}/>
                        <MultipleSelectChip {...materialsFilterProps}/>
                        <MultipleSelectChip {...purposeOfUseFilterProps}/>

                        <Link
                            to={rootState.query !== `` ? `/${category}/page/1/filter?${rootState.query}` : `/${category}/page/1`}>
                            <Button className={'p-3'} onClick={() => {
                                handlerClickFilter()
                            }} variant="contained" endIcon={<FilterAltIcon/>}>Lọc</Button>
                        </Link>
                    </Stack>
                    <ProductList products={rootState.data.products}/>
                    <Box className={'py-2 px-4 justify-content-center d-flex'}>
                        <Button className={'focus-ring focus-ring-info'}
                                onClick={() => {
                                    handlerClickSeeMore()
                                }}
                                href={isHasFilter ? `/${category}/page/${count}/filter?${rootState.query}` : `/${category}/page/${count}`}
                                disabled={handlerDisabled()}
                                variant="outlined" endIcon={<ArrowDropDownIcon/>}>
                            Tải thêm sản phẩm
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

interface Title {
    name: string,
    result: number
}

export default Products;

