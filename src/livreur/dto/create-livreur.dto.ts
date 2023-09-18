export class CreateLivreurDto {

    firstname: string


    lastname: string
  

    age: number
  
    tele: number
 
    email: string
  
 
    password: string
  
 
    dateOfBirth: Date
  

    profileImage: string
  
    isVerified: boolean
  
   
    verificationToken: string

    reviews: { type: string[], default: [] }
  
    lastConnexion: Date
  



}
