const btnel=document.getElementById("btn")
const bmiInputel=document.getElementById("bmi-result")
const weightcondel=document.getElementById("weight condition")
const idealweightel=document.getElementById("ideal weight")
const idealweightel2=document.getElementById("ideal weight2")
function calculateBMI(){
    const heightValue=document.getElementById("height").value/100
    const weightValue=document.getElementById("weight").value 
    const bmiValue=weightValue/(heightValue*heightValue)
    const x=Math.round(bmiValue * 100) / 100
    bmiInputel.value=x;
    if(bmiValue <18.5){
        weightcondel.innerText="Under Weight"

    }
    else if(bmiValue>=18.500 && bmiValue<24.9999){
        weightcondel.innerText="Normal Weight"
    }
    else if (bmiValue>=25 && bmiValue<=29.99999){
        weightcondel.innerText="Overweight"
    }
    else if(bmiValue>=30) {
        weightcondel.innerText="Obesity"
    }
    const y=18.500*heightValue*heightValue;
    const l=Math.round(y * 10) / 10
    const z=24.999*heightValue*heightValue;
    idealweightel.innerText=l;
    const ll=Math.round(z * 10) / 10
    idealweightel2.innerText=ll;
}


btnel.addEventListener("click",calculateBMI)