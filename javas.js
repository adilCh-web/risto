
let db = new Localbase("db")
let submit = document.getElementById("s")

let dataTable = document.getElementById("data")
let insightTable = document.getElementById("insight")
submit.addEventListener("click",submitting)



function submitting()
{
    var currentTime = new Date()
    var timing= currentTime.toTimeString().slice(0,5)
    //defining variables
    let returnmoney = document.getElementById("return").value
    let invest = document.getElementById("invest").value
    let profitPercentage = 100*(returnmoney -invest)/invest

    // when the invest and revenue fields are filled in
    if(returnmoney!=="" && invest!=="")
    
    {
        //avoiding the large degit as 33.3333333333 so we set them to two degits after the comma
        if(profitPercentage - Math.floor(profitPercentage) !== 0)
        {
            profitPercentage=profitPercentage.toFixed(2)
        }

        //defining an array 
        letmyArray = [timing,invest,returnmoney,profitPercentage+"%"]

        //creatin a row
        let row= document.createElement("tr")
        //adding it to the table
        dataTable.appendChild(row)
        //looping through our array
        for(let i=0;i<4;i++)
        {
            //creating a cell
            let td=document.createElement("td")
            //writing in the cell its value
            td.textContent=letmyArray[i]
            //givint it a class name (exp class_2)
            td.className = "class_"+i
            //adding it to the row we create 
            row.appendChild(td)

        }

        //storing an object in our localBase
        db.collection("invest").add(
            {
                time:timing,
                invest:invest,
                return:returnmoney,
                profitPercentage:profitPercentage,
    
            }
        )
    
    
        //deleting the values after displaying/storing them
        document.getElementById("invest").value = ""
        document.getElementById("return").value = ""
    
        updateData()
    }

    

}


function updateData()
{

    //assigning variables to zero for the second tables
    let totalInvest=0;totalReturn=0;avgProfit=0;totalProfit=0;
    //defining variables by their class names
    var tInvest = document.getElementsByClassName("class_1");
    var tReturn = document.getElementsByClassName("class_2");
    var tProfit = document.getElementsByClassName("class_3");
    //looping through the lenght of the data we have
    for (var i =0; i <tInvest.length; i++) 
    {
    //maths calculations
    totalInvest=totalInvest + Number(tInvest[i].innerHTML)
    totalReturn=totalReturn + Number(tReturn[i].innerHTML)
    avgProfit=avgProfit + Number(tProfit[i].innerHTML.replace("%",""))
    totalProfit = totalProfit + Number(tReturn[i].innerHTML)-Number(tInvest[i].innerHTML)
    }
    avgProfit=avgProfit/tProfit.length
    document.getElementById("tInvest").innerHTML="£"+totalInvest.toFixed(2)
    document.getElementById("tReturn").innerHTML="£"+totalReturn.toFixed(2)
    if(avgProfit - Math.floor(avgProfit) !== 0)
    {
        document.getElementById("avgProfit").innerHTML=avgProfit.toFixed(2)+"%"
    }
    else
    {
    document.getElementById("avgProfit").innerHTML=avgProfit+"%"
    }
    if(avgProfit <0)
    {
        document.getElementById("avgProfit").style.color="red"
    }
    else
    {
        document.getElementById("avgProfit").style.color="green"
    }

    document.getElementById("totalProfit").innerHTML="£"+totalProfit.toFixed(2)
    if(totalProfit>0)
    {
        document.getElementById("totalProfit").style.color="green"
    }
    else if(totalProfit<0)
    {
        document.getElementById("totalProfit").style.color="red"
    }
        

}



function deleteDb()
{
    db.collection('invest').delete()
}

function loadData()
{
    
    dataTable.style.display = "block";
    insightTable.style.display ="block";
    insightTable.style.margin = "auto auto";
    dataTable.style.margin = "auto auto";
    dataTable.style.width ="280px"
    insightTable.style.width ="280px"

    document.getElementById("first").style.display="none"
    document.getElementById("second").style.display="none"

if (typeof db.collection("invest") !== "undefined")
{


    db.collection("invest").get().then(
        invest=>
        {
            for(let i=0;i<invest.length;i++)
                {
                    console.log("hello ",invest[i])
     
                    letmyArray = [invest[i].time,
                    invest[i].invest,
                    invest[i].return,
                    invest[i].profitPercentage+"%"]
                    var row= document.createElement("tr")
                    dataTable.appendChild(row)
                    for(let i =0;i<4;i++)
                    {
                        let td=document.createElement("td")
                        td.textContent=letmyArray[i]
                        td.className = "class_"+i
                        row.appendChild(td)
                    }

                } 
        })

    setTimeout(() => {updateData()
        
    }, 1000);  
}
document.getElementById("load").disabled = true
}



function loadGraph()
 {
    document.getElementById("first").style.display="block"
    document.getElementById("second").style.display="block"
    var values=[];
    var acumProfit=0;
    var acumReturn=0;
    var acumInvest=0
    var labels=[]
    var dataInvest = []
    var dataProfit = []
    document.getElementById("data").style.display="none"
    document.getElementById("insight").style.display="none"

    db.collection("invest").get().then(
        invest=>
        {
            for(let i=0;i<invest.length;i++)
                {
                    acumProfit=acumProfit + (Number(invest[i].return) - Number(invest[i].invest))

                    acumInvest= acumInvest + Number(invest[i].invest)
                    acumReturn = acumReturn + Number(invest[i].return)

                    dataInvest.push(Number(invest[i].invest))
                    dataProfit.push(Number(invest[i].return)-Number(invest[i].invest))
                    labels.push(i+1)
                    if(i==(invest.length-1))
                    {
                        values.push(acumProfit)
                        values.push(acumInvest)
                    }

                }

            } 
        )
    console.log(dataInvest)
    console.log([acumProfit, acumReturn, acumInvest])
    const ctx = document.getElementById('first').getContext('2d');
    const ctx_ = document.getElementById('second').getContext('2d');


    

    new Chart(ctx, {
        type: 'line',

        data: {
            labels:labels,
            datasets: [{
                label: 'Profit',
                data: dataProfit,
                borderWidth: 1,
                fill: true,
                backgroundColor: "orange",
                borderColor: "transparent"
            },
            {
                label: 'Invest',
                data: dataInvest,
                borderWidth: 1,
                fill: true,
                backgroundColor: 'blue'
            }
            ]
        },
        options: {
            scales: {
            yAxes: [{
                ticks: {
                beginAtZero: true
                }
            }]
            }
        }
        });

        var xValues = ["Profit", "Invest"];
        var barColors = [
          "#00aba9",
          "#2b5797"
        ];
        
        new Chart(ctx_, {
          type: "pie",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: barColors,
              data: values
            }]
          },
          options: {
            title: {
              display: true,
              text: "------ Total ------"
            }
          }
        });
        document.getElementById("load").disabled = false;
}