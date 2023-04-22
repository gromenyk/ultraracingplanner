const stageInput = document.getElementById("stage")
const foodInput = document.getElementById("food")
const caloriesInput = document.getElementById("calories")
const waterInput = document.getElementById("water")

stageInput.addEventListener("input", handleInput)
foodInput.addEventListener("input", handleInput)
caloriesInput.addEventListener("input", handleInput)
waterInput.addEventListener("input", handleInput)

let registro = []
let editMode = false
let editionId = null

function handleInput (event) {
    const {value, name} = event.target
    registro = {
        ...registro,
        [name]: value,
    }
}

const addToList = document.getElementById("addToList")
addToList.addEventListener("click", function (event) {
                                    if (editMode === false) {
                                        create(event)
                                    }else {
                                        update(event)
                                    }
})

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
                                                <button class="actions-btn" onclick="editReg(${registro.id})" type="button">Editar</button>
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
    swal.fire({
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

function editReg(id) {
    editMode = true
    addToList.innerText = "Actualizar"
    editionId = id
    const registro = registros.find(registro=>registro.id === id)
    const stageInput = document.getElementById("stage")
    const foodInput = document.getElementById("food")
    const caloriesInput = document.getElementById("calories")
    const waterInput = document.getElementById("water")

    stageInput.value = registro.stage
    foodInput.value = registro.food
    caloriesInput.value = registro.calories
    waterInput.value = registro.water
    
}

function update (event) {
    event.preventDefault()
    const newReg = readForm()
    registros.id = editionId
    const index = registros.findIndex(registro => registro.id === editionId)
    registros.splice(index, 1, newReg)
    saveDataLS()
    const row = document.getElementById(editionId)
    row.innerHTML = `<td>${newReg.stage}</td>
                     <td>${newReg.food}</td>
                     <td>${newReg.calories}</td>
                     <td>${newReg.water}</td>
                     <td>              
                        <button class="actions-btn" onclick="editReg(${newReg.id})" type="button">Editar</button>
                        <button class="actions-btn" onclick="deleteReg(${newReg.id})" type="button">Eliminar</button>
                     </td>
                    `
    
    
    editMode = false
    editionId = null
    addToList.innerText = "Agregar a la lista"
    clearForm()
}

function readFromLS () {
    registros = JSON.parse(localStorage.getItem("Item")) || []
    registros.forEach((el) => {createRow(el)})
}

readFromLS()