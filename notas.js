// addEventListener: para agregar escuchas de eventos, por ejemplo, tengo un botón y le estoy diciendo "botón, quedate atento a tal cosa, y haz tal cosa cuando pase esto" Le estamos agregando un escuchador de evento.
// Ejemplo:

const addButton = document.getElementById("add")

const alertar = () => {
    alert("te hicieron click")
}

addButton.addEventListener("click", alertar)

// O se puede escribir así:

addButton.addEventListener("click", () => {alert("te hicieron click")})

const stageInput = document.getElementById("stage")
const foodInput = document.getElementById("food")
const caloriesInput = document.getElementById("calories")
const waterInput = document.getElementById("water")

stageInput.addEventListener("input", handleInput)
foodInput.addEventListener("input", handleInput)
caloriesInput.addEventListener("input", handleInput)
waterInput.addEventListener("input", handleInput)

// Lo anterior se puede escribir así también:

const ids = ["stage", "food", "calories", "water"]

ids.forEach((id) => {
    const element = document.getElementById(id)
    element.addEventListener("input", handleInput)
})

// El comportamiento por defecto de un botón submit dentro de una etiqueta form después de que se hace click, es que la página se recarga. Para evitar esto se usa el método preventDefault