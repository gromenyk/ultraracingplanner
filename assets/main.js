const stageInput = document.getElementById("stage")
const foodInput = document.getElementById("food")
const caloriesInput = document.getElementById("calories")
const waterInput = document.getElementById("water")

stageInput.addEventListener("input", handleInput)
foodInput.addEventListener("input", handleInput)
caloriesInput.addEventListener("input", handleInput)
waterInput.addEventListener("input", handleInput)

let registro = []

function handleInput (event) {
    const {value, name} = event.target
    registro = {
        ...registro,
        [name]: value,
    }
}

const addToList = document.getElementById("addToList")
addToList.addEventListener("click", create)

let registros = []

function readForm() {
    const stageInput = document.getElementById("stage")
    const foodInput = document.getElementById("food")
    const caloriesInput = document.getElementById("calories")
    const waterInput = document.getElementById("water")

    const registro = {
        stage: stageInput.value,
        food: foodInput.value,
        calories: caloriesInput.value,
        water: waterInput.value,
        id: Date.now()
    }
    
    return registro    
}

function create(event) {
    event.preventDefault()
    const registro = readForm()
    registros.push(registro)
    const values = Object.values(registro)
    const result = values.every((value)=> value !== "")
    if (result === false) {
        swal.fire("Hay campos vacíos", "", "error")
    }else {
        createRow (registro)
        clearForm()
        saveDataLS()
    }

}

function createRow (registro) {
    const addRow = document.getElementById("tableData")
    addRow.innerHTML = addRow.innerHTML + `<tr id="${registro.id}">
                                            <td>${registro.stage}</td>
                                            <td>${registro.food}</td>
                                            <td>${registro.calories}</td>
                                            <td>${registro.water}</td>
                                            <td>              
                                                <button class="actions-btn">Editar</button>
                                                <button class="actions-btn" onclick="deleteReg(${registro.id})" type="button">Eliminar</button>
                                            </td>
                                            </tr>
                                        `
}

function clearForm () {
    const form = document.getElementById("form")
    form.reset()
}

function saveDataLS () {
    JSON.stringify(registros)
    localStorage.setItem("Item", JSON.stringify((registros)))
}

function deleteReg(id) {
    Swal.fire({
        title: 'Por favor confirma si realmente quieres eliminar el registro',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2173BA',
        cancelButtonColor: '#FC5200',
        confirmButtonText: 'Si, ¡eliminar!',
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
            const row = document.getElementById(id)
            row.remove()
            registros = registros.filter((el)=>el.id !== id)
            saveDataLS()
          Swal.fire(
            '¡Registro eliminado!',
            'Tu registro ha sido eliminado.',
            'success'
          )
        }
      })
}

function readFromLS () {
    registros = JSON.parse(localStorage.getItem("Item")) || []
    registros.forEach((el) => {createRow(el)})
}

readFromLS()