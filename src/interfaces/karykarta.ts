export enum CustomRole {
    karyakarta = 'karyakarta',
    adhyaksha = 'adhyaksha',
    koshadhyaksha = 'koshadhyaksha',
    mahamantri = 'mahamantri',
    mantri = 'mantri',
    upaadhyaksha = 'upaadhyaksha',
    adhyakshaBooth = 'adhyakshaBooth',
    shaktikendraSanyojak = 'shaktikendraSanyojak',
    shaktikendraprabhari = 'shaktikendraprabhari',
  }
  
  export interface KarykartaInput {
    name: string;
    address: string;
    mobileNumber: string;
    dob: string;
    religion: string;
    gender: string;
    previousParty?: string;
    mundalId?: string;
    sectorId?: number;
    poolingBoothId?: number;
    role: CustomRole;
  }