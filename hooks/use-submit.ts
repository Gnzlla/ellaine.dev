import { supabase } from "@/lib/supabase/client";
import { Schema } from "@/app/footer/page";

export type Contact = {
  contact_id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export function useSubmit(contact: Contact){
 const submitContact = async (values: Schema) =>{
    const {data: ContactInfo, error: ContactError} = await supabase
    .from("contact")
    .insert({name:values.name, email:values.email, message:values.message})
    .select("contact_id").single();

    if (ContactError) {
      console.error("Contact error:", ContactError);
      throw ContactError;
    }

     if (!ContactInfo) throw new Error("No contact data returned");
 };

 return  {submitContact} 
} 