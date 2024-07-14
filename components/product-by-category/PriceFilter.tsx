import {Accordion, AccordionDetails, AccordionSummary, Box, Slider, Stack, TextField, Typography} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, {useState} from "react";
import {PriceType} from "../../types/price.type";
import {useAppDispatch} from "../../configs/store";
import {setDataPriceFilter} from "../../slice/selectFilter.slice";

function AccordionPrice(prop: PriceType ) {
    return (
            <Accordion className={'border border-1 shadow-none py-1 border-secondary-subtle'}>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>Lọc theo giá</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Stack direction={"column"} gap={1}>
                        <CustomPrice {...prop}/>
                    </Stack>
                </AccordionDetails>
            </Accordion>
    );
}

function CustomPrice(props: PriceType) {
    const dispatch = useAppDispatch()
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const [valueTextFieldFrom, setValueTextFieldFrom] = useState<number>(props.min);
    const [valueTextFieldTo, setValueTextFieldTo] = useState<number>(props.max);
    const [rangeValue, setRangeValue] = useState([props.min, props.max]);

    const handleTextFieldChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = [...rangeValue];
        const newNumber = Number(event.target.value);

        if (!isNaN(newNumber)) {
            newValue[index] = newNumber;
            setRangeValue(newValue);
        }
        dispatch(setDataPriceFilter({min: rangeValue[0], max: rangeValue[1]}))
    };

    const handleRangeChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        setRangeValue(newValue as number[]);
        dispatch(setDataPriceFilter({min: rangeValue[0], max: rangeValue[1]}))
    }
        return (
            <Box>
                <Box className={'d-flex justify-content-between align-items-center'}>
                    <TextField  id="outlined-from" type={"number"}
                                onChange={handleTextFieldChange(0)}
                                value={rangeValue[0]}
                                inputProps={{min: props.min, max: props.max}}
                                variant="outlined"/> <sup className={'px-1'}>đ</sup>
                    <Box className={'ms-1 me-2'} style={{width: '10%', height: '4px', backgroundColor: '#000'}}/>
                    <TextField  id="outlined-to" type={"number"}
                                onChange={handleTextFieldChange(1)}
                                value={rangeValue[1]}
                                inputProps={{min: props.min, max: props.max}}
                                variant="outlined"/><sup className={'px-1'}>đ</sup>
                </Box>
                <Box>
                    <Box sx={{width: 300}}>
                        <Slider
                            value={rangeValue}
                            onChange={handleRangeChange}
                            valueLabelDisplay="auto"
                            min={props.min}
                            max={props.max}

                        />
                    </Box>
                    <Box className={'d-flex justify-content-between fw-bold'}>
                        <Typography>{formatter.format(rangeValue[0])}</Typography>
                        <Typography>{formatter.format(rangeValue[1])}</Typography>
                    </Box>
                </Box>
            </Box>
        )
    }
export default AccordionPrice


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MAX_HEIGHT = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
