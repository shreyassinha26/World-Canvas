
var database;
var position = [];
var stroke = [];
var color = [];
var positionRef;
var strokeRef;
var colorRef;
var colorVal = 0;
var strokeVal = 3;
var keycodeVal = 67;
var name;
var value,value2;
var entered = false;
function setup(){
    createCanvas(1000,1000);
    database = firebase.database();
    positionRef = database.ref('position');
    colorRef = database.ref('color');
    strokeRef = database.ref('stroke');
    Form.display();
    value,value2 = false
}

function draw(){
    if(keyCode===13){
        value2 = true;
    }
    if(value === true && value2 === true && color!== undefined && position!== undefined && stroke!== undefined){
        background(255);
   readColor();
   readPosition();
   readStroke();
   Form.hide();
   Form.reset();
    if(keyCode === 67){
        keycodeVal = 67;
    }
    else if(keyCode === 83){
        keycodeVal = 83;
    }
    if(keycodeVal === 67){
        if(keyCode === 48){
            colorVal = 0;
        }
        else if(keyCode === 49){
            colorVal = 255*1/9;
        }
        else if(keyCode === 50){
            colorVal = 255*2/9;
        }
        else if(keyCode === 51){
            colorVal = 255*3/9;
        }
        else if(keyCode === 52){
            colorVal = 255*4/9;
        }
        else if(keyCode === 53){
            colorVal = 255*5/9;
        }
        else if(keyCode === 54){
            colorVal = 255*6/9;
        }
        else if(keyCode === 55){
            colorVal = 255*7/9;
        }
        else if(keyCode ===56 ){
            colorVal = 255*8/9;
        }
        else if(keyCode === 57){
            colorVal = 255*9/9;
        }
        
    }
    else{
        if(keyCode === 48){
            strokeVal = 1;
        }
        else if(keyCode === 49){
            strokeVal = 3;
        }
        else if(keyCode === 50){
            strokeVal = 5;
        }
        else if(keyCode === 51){
            strokeVal = 7;
        }
        else if(keyCode === 52){
            strokeVal = 9;
        }
        else if(keyCode === 53){
            strokeVal = 11;
        }
        else if(keyCode === 54){
            strokeVal = 13;
        }
        else if(keyCode === 55){
            strokeVal = 15;
        }
        else if(keyCode ===56 ){
            strokeVal = 17;
        }
        else if(keyCode === 57){
            strokeVal = 19;
        }
    }
    if(position !== null && color !== null && stroke !== null){
        for(var i = 0;i<position.length;i++){
            var a = color[i];
            fill(a);
            strokeWeight(0);
            rectMode (CENTER);
            rect(position[i][0] , position[i][1] ,stroke[i] , stroke[i]);
        }
    }
    fill(0);
    text("Press C and then a number to enter a greyScale value of the color." , 10 , 10);
    text("Press S and then a number to enter the size of the stroke." , 10 , 30);
    
    //console.log(position );
    
    drawSprites();
    }
    else if(entered === true){
        var newVal = true;
        var nameref = database.ref('name');
        var tName = undefined;
        nameref.on('value' , (data)=>{
            tName = data.val();
        } , function(){
            console.log("Error");
        });
        if(tName!==undefined){
            for(var i in tName){
                //sconsole.log(i);
                if(name === tName[i]){
                    newVal = false;
                    break;
                }
            }
            
            if(newVal === true){
                tName.push(name);
                database.ref('/').update({'name' : tName});
                console.log(name);
                database.ref('names/'+name).update({position:[[0,0]] , color:[0 ], stroke:[1]});
            }
            var a = 'names/'+name+'/position'
            positionRef = database.ref(a);
            a = 'names/'+name+'/color'
        colorRef = database.ref(a);
        a = 'names/'+name+'/stroke'
        strokeRef = database.ref(a);
        value = true;
            
            readColor();
            readPosition();
            readStroke();
        }
        
        
    }
    
}

function readPosition(){
    positionRef.on('value' , (data)=>{
        position = data.val();
    } , function(){
        console.log("Error");
    })
    
}
function readColor(){
    colorRef.on('value' , (data)=>{
        color = data.val();
    } , function(){
        console.log("Error");
    })
}
function readStroke(){
    strokeRef.on('value' , (data)=>{
        stroke = data.val();
    } , function(){
        console.log("Error");
    })
}
function writePosition(){
    var a = name+'/position'
    database.ref('names/'+name).update({'position' : position});
}
function writeColor(){
    var a = 'names/'+name+'/color'
    database.ref('names/'+name).update({'color' : color});
}
function writeStroke(){
    var a = 'names/'+name+'/stroke'
    database.ref('names/'+name).update({'stroke' : stroke});
}
function showError(){
    console.log("e");
}
function mouseDragged(){
    
    if(position !== undefined && color !==undefined && stroke !==undefined && value===true && value2===true){
        var a = [mouseX , mouseY];
    position.push(a);
    color.push(colorVal);
    stroke.push(strokeVal);
    writePosition();
    writeColor();
    writeStroke();
    }
    
}
function mouseReleased(){

}
