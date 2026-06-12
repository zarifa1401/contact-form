import { validateContactForm } from "@/utils/validation";
import { NextResponse } from "next/server";

const { sampleMessages } = require("@/data/messages");

const messages= [...sampleMessages];
// with get meethod we send data to the client or UI.
export async function GET(){
    return NextResponse.json({
        success: true,
        count: messages.length,
        messages: messages.slice().reverse(),

    })
    
}
// send from the UI to here.
    export async function POST(request){
        try{
            // body: things we take from UI and bring it here.
            const body = await request.json();
            const result = validateContactForm(body);
            if(!result.isValid){
                return NextResponse.json({
                    success: false,
                    message: "Validation failed",
                    errors: result.errors

                },
                {status: 400}
            )
            }
            const newMessage = {
                id: Date.now(),
                ...result.data,
                createdAt: new Date().toISOString(),
            }
            messages.push(newMessage);

            return NextResponse.json({
                success: true,
                message: "Message received successfully",
                data: newMessage,
            },
            {status: 201}
        )

        }
        catch (error){
            return NextResponse.json({
                success: false,
                message: "An error occurred while processing the request",
                error: error.message,
            },
            {status: 500}
        )

        }

        
    }