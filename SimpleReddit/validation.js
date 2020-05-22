const inputs = document.querySelectorAll('input');

let password = document.querySelector("form input[name=password]");
let repeat = document.querySelector("form input[name=repeat]");
if (repeat)
  repeat.addEventListener("keyup",
    validateRepeat.bind(repeat, password),
    false
  );

let register = document.querySelector("form");
if (register){
  register.addEventListener("submit", validateRegister, false);
}


const patterns = {
    username:/^[a-z]{3,}$/,
    password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%_^*&-]).{8,}$/
};

function validate(field, regex){
    if(regex.test(field.value)){
        field.className = 'valid';
    } else {
        field.className = 'invalid';
    }

}

inputs.forEach((input)=> {  
    input.addEventListener('keyup', (e)=>{
        validate(e.target, patterns[e.target.attributes.name.value]); 
    });
})  

function validateRepeat(password) {
    if (this.value !== password.value) this.className = "invalid";
    else this.className = "valid";
  }

  function validateRegister(event) {
    let inputs = this.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++)
      if (inputs[i].className == "invalid") event.preventDefault();
  }
