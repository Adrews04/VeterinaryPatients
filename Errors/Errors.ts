class AlreadyInDatabaseError extends Error{
    constructor(type:String){
        const message = `That ${type} is already in the data base`;
        super(message);
        this.name = "AlreadyInDatabaseError"
    }
}
class NotFoundError extends Error{
    constructor(type:String, attribute:String){
        const message = `${type} ${attribute} not found in the data base`;
        super(message);
        this.name = "NotFoundError"
    }
}
class ReadingError extends Error{
    constructor(type:String){
        const message = `Error reading ${type}`;
        super(message);
        this.name = "ReadingError"
    }
}
class NonInDatabaseError extends Error{
    constructor(type:String){
        const message = `There are no ${type} in the data base`;
        super(message);
        this.name = "NonInDatabaseError"
    }
}
class ServerError extends Error{
    constructor(){
        const message = "Server error";
        super(message);
        this.name = "ServerError"
    }
}

export {
    AlreadyInDatabaseError,
    NotFoundError,
    ReadingError,
    NonInDatabaseError,
    ServerError
}