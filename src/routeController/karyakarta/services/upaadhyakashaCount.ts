export async function CountRole(role, karyakartaRoleFind) {
  let count = 0;

  if (role == 'upaadhyaksha') {
    karyakartaRoleFind.karyakarta.map((info) => {
      if (info.role == 'upaadhyaksha') {
        count++;
      }
    });
    if (count > 3) {
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
    if (count > 1) {
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
    if (count > 3) {
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
