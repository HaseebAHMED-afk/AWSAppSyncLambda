type AppSyncEvent = {
    info:{
        fieldName: string
    },
    arguments: {
        product: Product
    },
    // secondArgument: {
        
    // }
}

type Product = {
    name: String
    price: Number
}

exports.handler = async (event: AppSyncEvent) => {
    const notesArray = ["note1", "note2", "note3"]

    switch(event.info.fieldName){
       
        case "addProduct":
            return event.arguments.product
        default:
            return null;
    }
}