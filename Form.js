class Form{
    
    constructor(){
        this.title;
        this.greeting;
        this.info;
        //this.reset = createButton("Reset");
    }
    static display(){
        this.title = createElement("h1");
        this.title.html("World Canvas");
        this.title.position(230 , 20);
        
        var input = createInput("Name");
        input.position(290,90);

        var entername = createElement("h3");
        entername.html("Name ");
        entername.position(230 , 70);

        var button = createButton("Submit");
        button.position(250 , 150);
        button.mousePressed(()=>{
            this.greeting=createElement("h2");
            this.greeting.html("Welcome. Press enter to continue.");
            this.greeting.position(250 , 90);
            input.hide();
            entername.hide();
            button.hide();
            name = input.value();
            entered = true;

        });
        

    }
    static hide(){
        this.greeting.hide();
        this.title.hide();
        
    }
    static reset(){
        var button = createButton("Reset");
        button.position(950 ,10);
        button.mousePressed(()=>{
            database.ref('names/'+name).update({position:[[0,0]] , color:[0 ], stroke:[1]});
        });
    }
}
