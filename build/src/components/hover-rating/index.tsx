import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
    0.5: 'Rất tệ',
    1: 'Tệ',
    1.5: 'Kém',
    2: 'Dưới trung bình',
    2.5: 'Trung bình',
    3: 'Khá',
    3.5: 'Tốt',
    4: 'Rất tốt',
    4.5: 'Xuất sắc',
    5: 'Hoàn hảo'
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating(props: {
    rating?: number,
    onClick?(rating: number): void,
    positionLabel?: "left" | "right"
}) {
    const [value, setValue] = React.useState<number | null>(props.rating ? props.rating : 2.5)
    const [hover, setHover] = React.useState(-1);

    return (
        <Box
            sx={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {(value !== null && props.positionLabel && props.positionLabel === "left") && (
                <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if (props.onClick && newValue)
                        props.onClick(newValue)
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
            />
            {(value !== null && (!props.positionLabel || props.positionLabel === "right")) && (
                <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}
