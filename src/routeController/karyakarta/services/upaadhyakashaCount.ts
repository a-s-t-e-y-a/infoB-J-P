export async function CountRole(role, karyakartaRoleFind) {
  let count = 0;

  if (role == 'upaadhyaksha') {
    karyakartaRoleFind.karyakarta.map((info) => {
      if (info.role == 'upaadhyaksha') {
        count++;
      }
    });
    if (count > 6) {
      return true;
    } else {
      return false;
    }
  } else if (role == 'mahamantri') {
    karyakartaRoleFind.karyakarta.map((info) => {
      if (info.role == 'mahamantri') {
        count++;
      }
    });
    if (count > 2) {
      return true;
    } else {
      return false;
    }
  } else if (role == 'mantri') {
    karyakartaRoleFind.karyakarta.map((info) => {
      if (info.role == 'mantri') {
        count++;
      }
    });
    if (count > 6) {
      return true;
    } else {
      return false;
    }
  } else if (role == 'adhyaksha') {
    karyakartaRoleFind.karyakarta.map((info) => {
      if (info.role == 'adhyaksha') {
        count++;
      }
    });
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  } else if (role == 'koshadhyaksha') {
    karyakartaRoleFind.karyakarta.map((info) => {
      if (info.role == 'koshadhyaksha') {
        count++;
      }
    });
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
}
