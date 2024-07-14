import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import catSpace from "../assets/images/cat-space-non-background.gif";

const showLoading = (title: string) => {
    withReactContent(Swal).fire({
        title: `<div className={"fs-1 mt-0 pt-0"}>${title}</div>`,
        imageUrl: catSpace,
        showConfirmButton: false,
        focusCancel: false,
        allowOutsideClick: false,
    });
}

const dismissSwal = () => {
    withReactContent(Swal).close()
}

const showError = (title: string, text: string) => {
    withReactContent(Swal).fire({
        icon: "error",
        title: title,
        text: text,
    });
}

export {showLoading, dismissSwal, showError}