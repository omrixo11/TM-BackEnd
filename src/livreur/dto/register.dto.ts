export interface RegisterLivreurDTO {
   
    password: string;
    
    firstname: string

    lastname: string;

    age: number;
 
    email: string;
  
    dateOfBirth: Date;

    profileImage: string;
  
    isVerified: boolean;
   
    verificationToken: string;

    reviews: { type: string[], default: [] };
  
    lastConnexion: Date;
  

  }