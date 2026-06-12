export function validateContactform(values){
    const errors = {};
    const name = String(values?.name || "").trim();
    const email = String(values?.email || "").trim();
    const message = String(values?.message || "").trim();
    const subject = String(values?.subject || "").trim();

    if(!name){
        errors.name = "Name is required";

    } else if(name.length < 3){
        errors.name = "Name must be at least 3 characters long";

    }
    if(!email){
        errors.email = "Email is required";

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
        errors.email = "Invalid email address";

    }

    if (!subject){
        errors.subject = "Subject is required";

    } else if (subject.length < 5){
        errors.subject = "subject must be at least 5 characters long";  

    }
    if (!message){
        errors.message = "Message is required"; 
    } else if (message.length < 10){
        errors.message = "Message must be at least 10 characters long";
    }

    return {
        isvalid: Object.keys(errors).length === 0,
        errors,
        data: {name, email, subject, message},
    };

}