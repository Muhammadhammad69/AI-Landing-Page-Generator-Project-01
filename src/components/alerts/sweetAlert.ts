import Swal from 'sweetalert2'
export const showSwal = (titleValue:string,textValue:string, iconValue:"success" | "warning" | "error") => {
    Swal.fire({
        title: titleValue,
        text: textValue,
        icon: iconValue
    });
}