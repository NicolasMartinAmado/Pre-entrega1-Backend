const { default: Swal } = require("sweetalert2");

const alert = Swal.fire({
    icon:  `error`,
    title: `Error updating password, there are not the same` 
})

module.exports = alert