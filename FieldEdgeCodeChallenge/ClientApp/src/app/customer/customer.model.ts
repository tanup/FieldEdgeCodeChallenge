export interface Customer {
  id: string,
  salutation: string,
  initials: string,
  firstname: string,
  firstname_Ascii: string,
  gender: string,
  firstname_Country_Rank: string,
  firstname_Country_Frequency: string,
  lastname: string,
  lastname_Ascii: string,
  lastname_Country_Rank: string,
  lastname_Country_Frequency: string,
  email: string,
  password: string,
  country_Code: string,
  country_Code_Alpha: string,
  country_Name: string,
  primary_Language_Code: string,
  primary_Language: string,
  balance: number,
  phone_Number: string,
  currency: string
  [key: string]: string | number;
}

