let note_list = document.querySelector("select");
let note = document.querySelector("textarea");

let state;
function setState(newState) {
  note_list.textContent = "";
  // get all existing notes and highlight currently selected one
  for (let name of Object.keys(newState.notes)) {
    let option = document.createElement("option");
    option.textContent = name;
    if (newState.selected == name) option.selected = true;
    note_list.appendChild(option);
  }
  note.value = newState.notes[newState.selected];
  // save current note-state in localStorage
  localStorage.setItem("Notes", JSON.stringify(newState));
  state = newState;
}

// set initial app state | use localStorage to persist data
setState(
  JSON.parse(localStorage.getItem("Notes")) || {
    notes: { "reading list": "MTH 201\nMEE 205" },
    selected: "reading list"
  }
);

// add listener for selecting from list of notes
note_list.addEventListener("change", () => {
  setState({ notes: state.notes, selected: note_list.value });
});

// add listener when focus is removed from editing area
note.addEventListener("change", (e) => {
  setState({
    notes: Object.assign({}, state.notes, { [state.selected]: note.value }),
    selected: state.selected
  });
  auto_grow(e.target)
  console.log(e.target)
});

// add functionality to add a note
document.querySelector("[name=add]").addEventListener("click", () => {
  let name = prompt("Note name");
  if (name)
    setState({
      notes: Object.assign({}, state.notes, { [name]: "" }),
      selected: name
    });
});

// add functionality to delete a note
document.querySelector("[name=delete]").addEventListener("click", () => {
  let note_name = state.selected;
  let selected;
  if (note_name in state.notes) {
    delete state.notes[note_name];
    selected = Object.keys(state.notes)[0] || ""; // now make the first note selected
  }
  setState({
    notes: state.notes,
    selected
  });
});


// helper to autogrow note text-area
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}