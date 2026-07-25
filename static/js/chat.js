let chatbox =
document.getElementById("chatbox");


let features=[];


function botMessage(text){

let div=document.createElement("div");

div.className="bot";

div.innerHTML=text;

chatbox.appendChild(div);

}


function userMessage(text){

let div=document.createElement("div");

div.className="user";

div.innerHTML=text;

chatbox.appendChild(div);

}



function buttons(list,callback){


let area=document.createElement("div");


list.forEach(x=>{


let btn=document.createElement("button");

btn.innerHTML=x;


btn.onclick=function(){

area.remove();

userMessage(x);

callback(x);

};


area.appendChild(btn);


});


chatbox.appendChild(area);


}




// Start

botMessage(
"ဝန်ထမ်းစိတ်ခံစားချက်အခြေအနေကို ခန့်မှန်းသည့် ဉာဏ်ရည်တုကို အသုံးပြုလိုပါသလား?"
);


buttons(
["အသုံးပြုမယ်","အသုံးမပြုပါ"],
start
);



function start(answer){


if(answer=="အသုံးမပြုပါ"){

botMessage(
"အသုံးပြုမှု ရပ်ဆိုင်းပါသည်။"
);

return;

}


question1();

}




function question1(){

botMessage(
"၁။ ဝန်ထမ်း၏ တာဝန်ထမ်းဆောင်မှုသည် ပုံမှန်ရုံးချိန်အတွင်း ရှိပါသလား?"
);


buttons(
["ရှိပါတယ်","မရှိပါ"],
a=>{

features.push(
a=="ရှိပါတယ်"?1:0
);

question2();

});

}




function question2(){

botMessage(
"၂။ ပင်မလုပ်ငန်းတာဝန်နှင့် ရုံးလုပ်ငန်းသာ လုပ်ဆောင်ရပါသလား?"
);


buttons(
["ဟုတ်ပါတယ်","မဟုတ်ပါ"],
a=>{

features.push(
a=="ဟုတ်ပါတယ်"?1:0
);

question3();

});

}




function question3(){

botMessage(
"၃။ အနားယူချိန်၊ လက်ဖက်ရည်သောက်ချိန်၊ ထမင်းစားချိန် လုံလောက်ပါသလား?"
);


buttons(
["လုံလောက်ပါတယ်","မလုံလောက်ပါ"],
a=>{

features.push(
a=="လုံလောက်ပါတယ်"?1:0
);

question4();

});

}




function question4(){

botMessage(
"၄။ အပြုသဘောမှတ်ချက်နှင့် အသိအမှတ်ပြုမှု ရရှိပါသလား?"
);


buttons(
["ရပါတယ်","မရပါ"],
a=>{


features.push(
a=="ရပါတယ်"?1:0
);


predict();


});

}





function predict(){


botMessage(
"<div class='loading'>ခန့်မှန်းချက် အဖြေရရန် ခေတ္တစောင့်ပါ ⏳</div>"
);



setTimeout(()=>{


fetch("/predict",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(
{
features:features
}
)

})

.then(res=>res.json())

.then(data=>{


botMessage(data.result);


restart();


});


},3000);



}




function restart(){


setTimeout(()=>{


botMessage(
"ဆက်လက်အသုံးပြုလိုပါသလား?"
);


buttons(
["အသုံးပြုလိုပါသည်",
"အသုံးမပြုလိုတော့ပါ"],

a=>{


if(a=="အသုံးပြုလိုပါသည်"){

features=[];

chatbox.innerHTML="";

location.reload();

}

else{

botMessage(
"ကျေးဇူးတင်ပါသည်။"
);

}

});


},1000);


}
