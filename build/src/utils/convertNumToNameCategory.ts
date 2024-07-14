function TitleCategory(category: number) {
    switch (category) {
        case 0:
            return "Xe đạp trẻ em"
        case 1:
            return "Xe đạp thể thao"
        case 2:
            return "Xe đạp địa hình"
        case 3:
            return "Xe đạp đua"
        case 4:
            return "Xe đạp touring"
        case 5:
            return "Xe đạp nữ"
        case 6:
            return "Xe đạp gấp"
        default:
            return ""
    }
}

function TitleCategorySlug(category: number) {
    switch (category) {
        case 0:
            return "xe-dap-tre-em"
        case 1:
            return "xe-dap-the-thao"
        case 2:
            return "xe-dap-dia-hinh"
        case 3:
            return "xe-dap-dua"
        case 4:
            return "xe-dap-touring"
        case 5:
            return "xe-dap-nu"
        case 6:
            return "xe-dap-gap"
        default:
            return ""
    }
}

function TitleCategorySlugToNum(param: string | undefined) {
    switch (param) {
        case "xe-dap-tre-em":
            return 0
        case "xe-dap-the-thao":
            return 1
        case "xe-dap-dia-hinh":
            return 2
        case "xe-dap-dua":
            return 3
        case "xe-dap-touring":
            return 4
        case "xe-dap-nu":
            return 5
        case "xe-dap-gap":
            return 6
        default:
            return 0
    }
}

export {TitleCategorySlugToNum, TitleCategorySlug, TitleCategory}
