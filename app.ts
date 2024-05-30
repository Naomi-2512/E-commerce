

class DisplayItems{
    order?:Partial<Items>;
    identity!: string;
    

    imageUpload = document.querySelector('#uploadImage') as HTMLInputElement;
    productUpload = document.querySelector('#uploadProduct') as HTMLInputElement;
    descriptionUpload = document.querySelector('#uploadDescription') as HTMLInputElement;
    amountUpload = document.querySelector('#uploadAmount') as HTMLInputElement;
    createButton = document.querySelector('#create') as HTMLButtonElement;
    viewAllButton = document.querySelector('#viewAll') as HTMLButtonElement;
    // viewOneButton = document.querySelector('.viewOneButton') as HTMLButtonElement;
    container = document.querySelector('.container') as HTMLDivElement;
    updater = document.querySelector('.updater') as HTMLDivElement;
    
    imageStorage = document.querySelector('#uploaderImage') as HTMLInputElement;
    productStorage =document.querySelector('#uploaderProduct') as HTMLInputElement;
    descriptionStorage = document.querySelector('#uploaderDescription') as HTMLInputElement;
    amountStorage = document.querySelector('#uploaderAmount') as HTMLInputElement;
    closeButton =document.querySelector('#close') as HTMLButtonElement;
    saveButton =document.querySelector('#save') as HTMLButtonElement;

    constructor (){
        this.displayItems();
        this.viewAllButton.addEventListener('click',(event) =>{

            console.log('view');
            event.preventDefault();
            this.displayItems();

            
        })
        this.createButton.addEventListener('click',(event) =>{
            this.displayItems();
            event.preventDefault();
            let productInput = this.productUpload.value;
            let descriptionInput = this.descriptionUpload.value;
            let amountInput = this.amountUpload.value;
            let imageInput =this.imageUpload.value;
    
            let detailsValid = productInput !== '' && amountInput !== '' && descriptionInput !== '' && imageInput !== '';
            if (detailsValid) {
                let dateString = `${Date.now()}`

                this.order = {
                id :dateString,
                image: imageInput,
                productName:productInput,
                description:descriptionInput,
                amount:amountInput,
               } 

               Display.createItems(this.order);
            }

            else{
               this.productUpload.setAttribute('placeholder', '!! Enter the products name');
               this.amountUpload.setAttribute('placeholder', '!! Enter the producs amount');
               this.descriptionUpload.setAttribute('placeholder', 'Give your product a description' );
               this.imageUpload.setAttribute('placeholder', 'Enter the link to your image' );
               
               setTimeout(() => {
                this.productUpload.setAttribute('placeholder','');
                this.amountUpload.setAttribute('placeholder','');
                this.descriptionUpload.setAttribute('placeholder','');
                this.imageUpload.setAttribute('placeholder','');
               }, 2000);
            }
        })

    }
    
    removeProducts(){
        let remover = document.querySelectorAll('.container .displayer');
        remover.forEach(item =>{
            item.remove();
        })
    }

    async displayItems(){
        try {
            let displayArray = await Display.fetchProducts();
            console.log(displayArray);
            
            this.removeProducts();

            displayArray.forEach((element, index) =>{
                let myId = element.id;

                let displayer = document.createElement('div');
                displayer.className = 'displayer';

                let inputImage = document.createElement('div');
                inputImage.className = 'inputImage';

                let inputDetails = document.createElement('div');
                inputDetails.className = 'inputDetails';

                let inputButton = document.createElement('div');
                inputButton.className = 'inputButton';

                let imageHolder = document.createElement('img');
                imageHolder.setAttribute('src',`${element.image}`);
                imageHolder.className = 'imageHolder';

                let inputProduct = document.createElement('h2');
                inputProduct.textContent = `${element.productName}`;

                let inputDescription = document.createElement('h2');
                inputDescription.textContent = `${element.description}`;

                let inputAmount = document.createElement('h2');
                inputAmount.textContent = `ksh ${element.amount}`;
                
                let updateButton = document.createElement('button');
                updateButton.textContent = 'update';
                updateButton.className = 'updateButton';

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'delete';
                deleteButton.className = 'deleteButton';

                let viewOneButton = document.createElement('button');
                viewOneButton.textContent = 'view one';
                viewOneButton.className = 'viewOneButton';

                this.container.appendChild(displayer);
                displayer.appendChild(inputImage);
                displayer.appendChild(inputDetails);
                displayer.appendChild(inputButton);
                inputImage.appendChild(imageHolder);
                inputDetails.appendChild(inputProduct);
                inputDetails.appendChild(inputDescription);
                inputDetails.appendChild(inputAmount);
                inputButton.appendChild (updateButton);
                inputButton.appendChild (viewOneButton);
                inputButton.appendChild (deleteButton);

                viewOneButton.addEventListener('click', (event) =>{
                    let myIdentity = index;
                    let myName = element.productName as string;
                    console.log(myName);
                    this.displayItemsByName(myName, myIdentity);
                })
                deleteButton.addEventListener('click', (event) =>{
                    let deleteId = myId;
                    Display.deleteItems(deleteId);
                    // this.displayItems();
                })
                updateButton.addEventListener('click',()=>{
                    this.identity = myId;
                    this.updater.innerHTML = `
                        <div class="image-container">
                            <label for="imageUpload" class="uploadLabel">Image</label>
                            <input type="text" value ='${element.image}'  class="upload" id="uploaderImage" accept="image/*" >
                        </div>
                        <div class="product-container">
                            <label for="productName" class="uploadLabel">productName</label>
                            <input type="text" value = '${element.productName}' class="upload" id="uploaderProduct">
                        </div>
                        <div class="description-container">
                            <label for="description" class="uploadLabel">description</label>
                            <input type="text" value = '${element.description}' class="upload" id="uploaderDescription">
                        </div>
                        <div class="amount-container">
                            <label for="amount" class="uploadLabel">amount</label>
                            <input type="text" value = '${element.amount}' cost" class="upload" id="uploaderAmount">
                        </div>
                        <div class="button-container">
                            <button id="save" style= 'width:35%;'>save</button>
                            <button id="close" style= 'width:35%;'>close</button>
                        </div>
                    `
                    this.updater.style.display='block';
                    this.updater.style.display='flex';

                    this.imageStorage = document.querySelector('#uploaderImage') as HTMLInputElement;
                    this.productStorage = document.querySelector('#uploaderProduct') as HTMLInputElement;
                    this.descriptionStorage = document.querySelector('#uploaderDescription') as HTMLInputElement;
                    this.amountStorage =document.querySelector('#uploaderAmount') as HTMLInputElement;

                    console.log(this.imageStorage.value + this.productStorage.value + this.descriptionStorage.value + this.amountStorage.value);
                    

                    this.closeButton =document.querySelector('#close') as HTMLButtonElement;
                    this.saveButton =document.querySelector('#save') as HTMLButtonElement;
    
                    this.closeButton.addEventListener('click', ()=>{
                        console.log('closed Up');
                        
                        this.updater.style.display='none';
                    });

                    this.updaterFunction();
                    
                });
                // let closeButton =document.querySelector('#close') as HTMLButtonElement;
                // let saveButton =document.querySelector('#save') as HTMLButtonElement;

                // closeButton.addEventListener('click', ()=>{
                //     console.log('closed Up');
                    
                //     this.updater.style.display='none';
                // })

            })
        } catch (error) {
            // console.error('error in displaying', error);
        }

    }
    async displayItemsByName(name:string, myIdentity:number){
        try {
            let returnArray = await Display.getItemsByproductName(name);
            let displayedObject = returnArray[myIdentity]
            console.log(returnArray);
            
            this.removeProducts();
            // returnArray.forEach(prody =>{

                let displayer = document.createElement('div');
                displayer.className = 'displayer';

                let inputImage = document.createElement('div');
                inputImage.className = 'inputImage';

                let inputDetails = document.createElement('div');
                inputDetails.className = 'inputDetails';

                let inputButton = document.createElement('div');
                inputButton.className = 'inputButton';

                let imageHolder = document.createElement('img');
                imageHolder.setAttribute('src',`${displayedObject.image}`);
                imageHolder.className = 'imageHolder';

                let inputProduct = document.createElement('h2');
                inputProduct.textContent = `${displayedObject.productName}`;

                let inputDescription = document.createElement('h2');
                inputDescription.textContent = `${displayedObject.description}`;

                let inputAmount = document.createElement('h2');
                inputAmount.textContent = `${displayedObject.amount}`;
                
                let updateButton = document.createElement('button');
                updateButton.textContent = 'update';
                updateButton.className = 'updateButton';

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'delete';
                deleteButton.className = 'deleteButton';

                let viewOneButton = document.createElement('button');
                viewOneButton.textContent = 'view one';
                viewOneButton.className = 'viewOneButton';

                this.container.appendChild(displayer);
                displayer.appendChild(inputImage);
                displayer.appendChild(inputDetails);
                displayer.appendChild(inputButton);
                inputImage.appendChild(imageHolder);
                inputDetails.appendChild(inputProduct);
                inputDetails.appendChild(inputDescription);
                inputDetails.appendChild(inputAmount);
                inputButton.appendChild (updateButton);
                inputButton.appendChild (viewOneButton);
                inputButton.appendChild (deleteButton);
            // })
        } catch (error) {
            
        }
    }

    async updaterFunction(){
        try {
            this.saveButton.addEventListener('click',async()=>{
                let imageCont = this.imageStorage.value;
                let productCont = this.productStorage.value;
                let descriptionCont = this.descriptionStorage.value;
                let amountCont = this.amountStorage.value;

                let updatedOrder:Partial<Items> ={
                    id: this.identity,
                    image:imageCont,
                    productName:productCont,
                    description:descriptionCont,
                    amount:amountCont,
                }

                console.log(updatedOrder);
                
                await Display.updateItems(this.identity,updatedOrder);
                this.displayItems();
                this.updater.style.display = 'none';
            })
        } catch (error) {
            
        }
    }
}
let displaying = new DisplayItems();
displaying.displayItems();