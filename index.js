const btnel=document.getElementById("btn")
const bmiInputel=document.getElementById("bmi-result")
const weightcondel=document.getElementById("weight condition")
function calculateBMI(){
    const heightValue=document.getElementById("height").value/100
    const weightValue=document.getElementById("weight").value 
    const bmiValue=weightValue/(heightValue*heightValue)
    const x=Math.round(bmiValue * 100) / 100
    bmiInputel.value=x;
    if(bmiValue <18.5){
        weightcondel.innerText="Under Weight"

    }
    else if(bmiValue>=18.5 && bmiValue<24.9){
        weightcondel.innerText="Normal Weight"
    }
    else if (bmiValue>=25 && bmiValue<=29.9){
        weightcondel.innerText="Overweight"
    }
    else if(bmiValue>=30) {
        weightcondel.innerText="Obesity"
    }
}


btnel.addEventListener("click",calculateBMI)