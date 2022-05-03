function popSweetAlert(_title, _text, _icon, _confirmButtonText){
    Swal.fire({
        title: _title,
        text: _text,
        icon: _icon,
        confirmButtonText: _confirmButtonText,
        confirmButtonColor: '#0d6efd',
        allowOutsideClick: false
    })
}