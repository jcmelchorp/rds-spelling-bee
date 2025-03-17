export const entitySelectId = 'uid';
export const entityCollectionName = 'User';
export const pluralizedEntityName = 'users';
export const entityCollectionEndPoint = pluralizedEntityName;
export interface User {
  id?: string;
  uid?: string
  customerId?: string;
  archived?: boolean;
  suspended?: boolean;
  password?: string;
  suspensionReason?: string;
  orgUnitPath?: string;
  username?:string;
  contests?:{},
  emails?: [{
    address: string,
    customType: string,
    primary: boolean,
    type: 'custom' | 'home' | 'other' | 'work'
  }];
  thumbnailPhotoUrl?: string;
  notes?: [{
    contentType: 'text_plain' | 'text_html',
    value: string
  }];

  // PERSONAL
  curp?: string;
  dob?: string;
  gender?: 'Hombre' | 'Mujer' | 'Inespecífico' | '';
  role?: string;
  isHuman?: boolean;
  // FROM AUTH
  isAdmin?: boolean;
  isNew?: boolean;
  isOnline?: boolean;
  isTeacher?: boolean;
  isVerified?: boolean;
  primaryEmail?: string;
  authPhotoUrl?: string;
  photoUrl?: string;
  displayName?: string;
  name?: {
    givenName?: string;
    familyName?: string;
    fullName?: string
  };
  creationTime?: string;
  lastLoginTime?: string;
  niev?: string;
  grade?: string;
  level?: string;
  // parents?: [
  //   {
  //     name: {
  //       fullName?: string,
  //       familyName?: string,
  //       givenName?: string
  //     }
  //     curp?: string;
  //     gender?: 'Hombre' | 'Mujer' | '',
  //     relation?: {
  //       type?: 'Madre' | 'Padre' | 'Otro',
  //       custom?: string,
  //     };
  //     phones?: [{
  //       value?: string;
  //       type?: 'Fijo' | 'Movil' | 'Trabajo';
  //       primary?: boolean;
  //       customType?: string
  //     }];
  //     email?: string;
  //     streetAddress?: string,
  //     city?: string;
  //     postalCode?: string;
  //     municipio?: string;
  //     state?: string;
  //   }
  // ];
  // currentGrades?: {};
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  // TEACHER
  rfc?: string;
  permission?: string
  phones?: [{
    value?: string;
    type?: 'Fijo' | 'Movil' | 'Trabajo';
    primary?: boolean;
    customType?: string
  }];
}