import React from "react";

export default function LabelNew(props: {
    zIndex?: number,
}) {
    return (
        <span style={{
            backgroundColor: "rgb(142, 194, 0)",
            zIndex: props?.zIndex,
            borderRadius: "20px",
            fontSize: "18px",
            minWidth: "auto",
            width: "auto !important",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            paddingBlock: "4px",
            paddingInline: "8px",
        }}>Hàng mới</span>
    )
}