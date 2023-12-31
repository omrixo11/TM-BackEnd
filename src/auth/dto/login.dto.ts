export interface LoginDTO {
   
    password: string;
    firstname: string


    lastname: string;
  
    age: number;
  
    email: string;
  
    dateOfBirth: Date;
  
    
    companyName: string;
    
    companyAdress: string;
    
    matriculeFiscale: string;
   
    assujettieTVA: string;
  
    patente: string;
  
   
    RNE: string;
  

    profileImage: string;
  
    isVerified: boolean;
  
   
    verificationToken: string;
  
    resetPasswordToken: string;
  
   
    resetPasswordExpire: string;
  
 
    favoriteList: { type: string[], default: [] };
  
    
    adressLivraison: { type: string[], default: [] };
  
 
    historyOrder: { type: string[], default: [] };
  

    reviews: { type: string[], default: [] };
  
   
    newsletter: boolean;
    isActive:boolean;
  
    lastConnexion: Date;
  

  }