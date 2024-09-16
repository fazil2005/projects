//adminloginpage//
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  onValue,
  get,
  set,
  push,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
  const emailAdmin = document.getElementById("emailadmin");
  const passwordAdmin = document.getElementById("passwordadmin");
  const formAdmin = document.getElementById("formadmin");
  const errorAdmin = document.getElementById("erroradmin");

  //validation//

  formAdmin.addEventListener("submit", function (e) {
    e.preventDefault();

    let messages = [];

    if (
      emailAdmin.value !== "admin@gmail.com" ||
      passwordAdmin.value !== "1234"
    ) {
      //admin password=1234//
      messages.push("Invalid email or password");
    }

    if (messages.length > 0) {
      errorAdmin.innerText = messages.join(", ");
      emailAdmin.value = "";
      passwordAdmin.value = "";
    } else {
      window.location.href = "adminpage.html";
    }
    //validation//
  });
});

//addmemmber popup//

document.addEventListener("DOMContentLoaded", function () {
  const addMemberButton = document.getElementById("addMemberButton");
  const addMemberPopup = document.getElementById("addMemberPopup");
  const closeAddMemberPopupButton = document.getElementById("closePopup");
  const addMemberForm = document.getElementById("addMemberForm");

  addMemberButton.addEventListener("click", function () {
    // Close any open popups first
    closeUpdateMemberPopup();
    feePackagePopup.style.display = "none";
    addMemberPopup.style.display = "block";
    dietDetailsFatPopup.style.display = "none";
    dietDetailsMediumPopup.style.display = "none";
    dietDetailsSlimPopup.style.display = "none";
    dietDetailsPopup.style.display = "none";
    supplimentPopup.style.display = "none";
    BillPopup.style.display = "none";
    addstaffPopup.style.display = "none";
    staffDetailsPopup.style.display = "none";
  });

  closeAddMemberPopupButton.addEventListener("click", function () {
    addMemberPopup.style.display = "none";
  });

  addMemberForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addMemberPopup.style.display = "none";
  });

  // Function to close update member popup
  function closeUpdateMemberPopup() {
    const updateMemberPopup = document.getElementById("updatememberpopup");
    updateMemberPopup.style.display = "none";
  }

  // Update member popup
  const updateMemberButton = document.getElementById("updateMemberButton");
  const updateMemberPopup = document.getElementById("updatememberpopup");
  const closeUpdateMemberPopupButton = document.getElementById("closePopup2");

  updateMemberButton.addEventListener("click", function () {
    // Close any open popups first
    addMemberPopup.style.display = "none";
    feePackagePopup.style.display = "none";
    updateMemberPopup.style.display = "flex";
    dietDetailsFatPopup.style.display = "none";
    dietDetailsMediumPopup.style.display = "none";
    dietDetailsSlimPopup.style.display = "none";
    dietDetailsPopup.style.display = "none";
    supplimentPopup.style.display = "none";
    BillPopup.style.display = "none";
    addstaffPopup.style.display = "none";
    staffDetailsPopup.style.display = "none";
  });

  closeUpdateMemberPopupButton.addEventListener("click", function () {
    updateMemberPopup.style.display = "none";
  });

  // Initial state
  updateMemberPopup.style.display = "none";
});

const firebaseConfig = {
  apiKey: "AIzaSyCGJ4cYRm7ozGgcJs3xuzKkMkLuXjpbN3s",
  authDomain: "gymapp-265a4.firebaseapp.com",
  databaseURL: "https://gymapp-265a4-default-rtdb.firebaseio.com",
  projectId: "gymapp-265a4",
  storageBucket: "gymapp-265a4.appspot.com",
  messagingSenderId: "1047503514206",
  appId: "1:1047503514206:web:c675f147e59569761422cf",
  measurementId: "G-MRGV7GL8X4",
};

firebase.initializeApp(firebaseConfig);
const addmemeberDB = firebase.database().ref("addMember");

document
  .getElementById("addMemberForm")
  .addEventListener("submit", submitMemberForm);

function submitMemberForm(e) {
  e.preventDefault();
  var name = getElement("memberName");
  var email = getElement("memberEmail");
  var phone = getElement("memberPhone");
  var place = getElement("memberPlace");
  var password = getElement("memberPassword");
  var gender = getElement("memberGender");
  var fees = getElement("memberFees");

  saveMessages(name, email, phone, place, password, gender, fees);
  this.reset();
}

const saveMessages = (name, email, phone, place, password, gender, fees) => {
  var newMemberDetails = addmemeberDB.push();

  newMemberDetails.set({
    name: name,
    email: email,
    phone: phone,
    place: place,
    password: password,
    gender: gender,
    fees: fees,
  });
};

const getElement = (id) => {
  return document.getElementById(id).value;
};

const app = initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", () => {
  const db = getDatabase();
  let employelist = [];
  let sno = 0;
  let tbody = document.getElementById("tbody1");

  const addSingleRecord = (
    key,
    name,
    email,
    phone,
    place,
    password,
    fees,
    gender
  ) => {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    let td9 = document.createElement("td");
    let td10 = document.createElement("td"); // New td for Delete button
    let updateButton = document.createElement("button");
    let deleteButton = document.createElement("button"); // Create Delete button

    td1.textContent = ++sno;
    td2.innerHTML = `<input type="text" id="name-${key}" value="${name}">`;
    td3.innerHTML = `<input type="text" id="email-${key}" value="${email}">`;
    td4.innerHTML = `<input type="text" id="phone-${key}" value="${phone}">`;
    td5.innerHTML = `<input type="text" id="place-${key}" value="${place}">`;
    td6.innerHTML = `<input type="text" id="password-${key}" value="${password}">`;
    td7.innerHTML = `<input type="text" id="fees-${key}" value="${fees}">`;
    td8.innerHTML = `<input type="text" id="gender-${key}" value="${gender}">`;
    updateButton.textContent = "Update";
    deleteButton.textContent = "Delete"; // Set text for Delete button

    // Add click event listener to the update button
    updateButton.addEventListener("click", () => {
      const newName = document.getElementById(`name-${key}`).value;
      const newEmail = document.getElementById(`email-${key}`).value;
      const newPhone = document.getElementById(`phone-${key}`).value;
      const newPlace = document.getElementById(`place-${key}`).value;
      const newPassword = document.getElementById(`password-${key}`).value;
      const newFees = document.getElementById(`fees-${key}`).value;
      const newGender = document.getElementById(`gender-${key}`).value;

      updateRecord(
        key,
        newName,
        newEmail,
        newPhone,
        newPlace,
        newPassword,
        newFees,
        newGender
      );
    });

    // Add click event listener to the delete button
    deleteButton.addEventListener("click", () => {
      deleteRecord(key);
    });

    td9.appendChild(updateButton);
    td10.appendChild(deleteButton); // Append Delete button to the new td

    trow.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10);
    tbody.appendChild(trow);
  };

  const updateRecord = (
    key,
    newName,
    newEmail,
    newPhone,
    newPlace,
    newPassword,
    newFees,
    newGender
  ) => {
    const dbRef = ref(db);
    const employeeRef = child(dbRef, `addMember/${key}`);
    update(employeeRef, {
      name: newName,
      email: newEmail,
      phone: newPhone,
      place: newPlace,
      password: newPassword,
      fees: newFees,
      gender: newGender,
    })
      .then(() => {
        console.log("Record updated in Firebase");
      })
      .catch((error) => {
        console.error("Error updating record: ", error);
      });
  };

  const deleteRecord = (key) => {
    const dbRef = ref(db);
    const employeeRef = child(dbRef, `addMember/${key}`);
    remove(employeeRef)
      .then(() => {
        console.log("Record deleted from Firebase");
        selectAllDataOnce(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("Error deleting record: ", error);
      });
  };

  const selectAllDataOnce = () => {
    const dbRef = ref(db);
    get(child(dbRef, "addMember"))
      .then((snapshot) => {
        employelist = [];
        snapshot.forEach((childSnapshot) => {
          employelist.push({
            key: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        allRecords();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const allRecords = () => {
    sno = 0;
    tbody.innerHTML = "";
    employelist.forEach((employee) => {
      addSingleRecord(
        employee.key,
        employee.name,
        employee.email,
        employee.phone,
        employee.place,
        employee.password,
        employee.fees,
        employee.gender
      );
    });
  };

  selectAllDataOnce();
});

//feepackages//

const feePackagePopup = document.getElementById("feepackages");
const feePackageCloseButton = document.getElementById("feepackageclose");
const feePackageButton = document.getElementById("FeeButton");
const addMemberPopup = document.getElementById("addMemberPopup");
const updateMemberPopup = document.getElementById("updatememberpopup");
feePackageButton.addEventListener("click", () => {
  feePackagePopup.style.display = "block";
  addMemberPopup.style.display = "none";
  updateMemberPopup.style.display = "none";
  dietDetailsFatPopup.style.display = "none";
  dietDetailsMediumPopup.style.display = "none";
  dietDetailsSlimPopup.style.display = "none";
  dietDetailsPopup.style.display = "none";
  supplimentPopup.style.display = "none";
  BillPopup.style.display = "none";
  addstaffPopup.style.display = "none";
  staffDetailsPopup.style.display = "none";
});

feePackageCloseButton.addEventListener("click", () => {
  feePackagePopup.style.display = "none";
});

//dietDetails//

const dietDetailsButton = document.getElementById("viewdietdetails");
const dietDetailsPopup = document.getElementById("dietdetailspopup");
const dietDetailsSlimPopup = document.getElementById("dietdetailsslim");
const dietDetailsMediumPopup = document.getElementById("dietdetailsmedium");
const dietDetailsFatPopup = document.getElementById("dietdetailsfat");
const closeTagInPopup = document.getElementById("closetagpopup");
const slimButton = document.getElementById("slimDetails");
const mediumButton = document.getElementById("mediumDetails");
const fatButton = document.getElementById("fatDetails");
const slimCloseButton = document.getElementById("closetagslim");
const mediumCloseButton = document.getElementById("closetagmedium");
const fatCloseButton = document.getElementById("closetagfat");

dietDetailsButton.addEventListener("click", () => {
  dietDetailsPopup.style.display = "flex";
  updateMemberPopup.style.display = "none";
  addMemberPopup.style.display = "none";
  feePackagePopup.style.display = "none";
  supplimentPopup.style.display = "none";
  BillPopup.style.display = "none";
});
closeTagInPopup.addEventListener("click", () => {
  dietDetailsPopup.style.display = "none";
});

slimButton.addEventListener("click", () => {
  dietDetailsSlimPopup.style.display = "flex";
  dietDetailsPopup.style.display = "none";
  supplimentPopup.style.display = "none";
  slimCloseButton.addEventListener("click", () => {
    dietDetailsSlimPopup.style.display = "none";
  });
});
mediumButton.addEventListener("click", () => {
  dietDetailsMediumPopup.style.display = "flex";
  dietDetailsPopup.style.display = "none";
  mediumCloseButton.addEventListener("click", () => {
    dietDetailsMediumPopup.style.display = "none";
  });
});

fatButton.addEventListener("click", () => {
  dietDetailsFatPopup.style.display = "flex";
  dietDetailsPopup.style.display = "none";
  fatCloseButton.addEventListener("click", () => {
    dietDetailsFatPopup.style.display = "none";
  });
});

//suppliment//

const supplimentPopup = document.getElementById("supplimentstorepopup");
const supplimentButton = document.getElementById("suppliementButton");
const supplimentClose = document.getElementById("supplimentClose");

supplimentButton.addEventListener("click", () => {
  supplimentPopup.style.display = "grid";
  addMemberPopup.style.display = "none";
  updateMemberPopup.style.display = "none";
  dietDetailsFatPopup.style.display = "none";
  dietDetailsMediumPopup.style.display = "none";
  dietDetailsSlimPopup.style.display = "none";
  dietDetailsPopup.style.display = "none";
  feePackagePopup.style.display = "none";
  BillPopup.style.display = "none";
  addstaffPopup.style.display = "none";
  staffDetailsPopup.style.display = "none";

  supplimentClose.addEventListener("click", () => {
    supplimentPopup.style.display = "none";
  });
});

const createBillButton = document.getElementById("createBillButton");
const BillPopup = document.getElementById("createbills");
const closeBillPopup = document.getElementById("closetagbill");

createBillButton.addEventListener("click", () => {
  BillPopup.style.display = "flex";
  supplimentPopup.style.display = "none";
  addMemberPopup.style.display = "none";
  updateMemberPopup.style.display = "none";
  dietDetailsFatPopup.style.display = "none";
  dietDetailsMediumPopup.style.display = "none";
  dietDetailsSlimPopup.style.display = "none";
  dietDetailsPopup.style.display = "none";
  feePackagePopup.style.display = "none";
  addstaffPopup.style.display = "none";
  staffDetailsPopup.style.display = "none";

  closeBillPopup.addEventListener("click", () => {
    BillPopup.style.display = "none";
    document.getElementById("PlaceInput").value = "";
    document.getElementById("FeesInput").value = "";
    document.getElementById("PhoneInput").value = "";
    document.getElementById("NameInput").value = "";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const datebill = document.getElementById("datebill");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  datebill.innerHTML = formattedDate;

  const createBillButton = document.getElementById("createBill");
  createBillButton.addEventListener("click", () => {
    window.print(); // Trigger the print dialog
  });
});

// createbill//

const database = getDatabase(app);
// Event listener for search button
document
  .getElementById("searchButton")
  .addEventListener("click", async function () {
    const name = document.getElementById("NameInput").value.trim();

    if (name) {
      try {
        const dbRef = ref(database, "addMember");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          let found = false;

          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();

            if (data.name === name) {
              document.getElementById("PlaceInput").value = data.place || "";
              document.getElementById("FeesInput").value = data.fees || "";
              document.getElementById("PhoneInput").value = data.phone || "";
              found = true;
              return true; // Exit loop
            }
          });

          if (!found) {
            alert("No data found for the given name.");
          }
        } else {
          alert("No data available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      alert("Please enter a name to search.");
    }
  });

//addstaff//

document
  .getElementById("addstaffForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get the form values
    const name = document.getElementById("namestaff").value;
    const age = document.getElementById("agestaff").value;
    const phone = document.getElementById("phonestaff").value;
    const timing = document.getElementById("timeingtaff").value;
    const place = document.getElementById("placestaff").value;
    const password = document.getElementById("passwordstaff").value;

    if (name && age && phone && timing && place && password) {
      // Create a new unique key for the new staff member
      const newStaffRef = ref(database, "newstaff");
      const newStaffKey = push(newStaffRef).key;

      // Set the data in Firebase Realtime Database
      try {
        await set(ref(database, "newstaff/" + newStaffKey), {
          name: name,
          age: age,
          phone: phone,
          timing: timing,
          place: place,
          password: password,
        });
        console.log("Staff stored in Firebase");

        // Reset form fields
        document.getElementById("addstaffForm").reset();

        // Optionally hide the form popup if you have one
        const addstaffPopup = document.getElementById("addstaffPopup");
        if (addstaffPopup) {
          addstaffPopup.style.display = "none";
        }

        // Optionally refresh the staff list if needed
        selectAllStaffDataOnce();
      } catch (error) {
        console.error("Error adding staff member:", error);
      }
    } else {
      alert("Please fill out all fields.");
    }
  });

const addstaffButton = document.getElementById("addstaffButton");
const addstaffPopup = document.getElementById("addstaffpopup");
const closeStaffPopup = document.getElementById("closestaffpopup");

addstaffButton.addEventListener("click", () => {
  addstaffPopup.style.display = "flex";
  feePackagePopup.style.display = "none";
  addMemberPopup.style.display = "none";
  updateMemberPopup.style.display = "none";
  dietDetailsFatPopup.style.display = "none";
  dietDetailsMediumPopup.style.display = "none";
  dietDetailsSlimPopup.style.display = "none";
  dietDetailsPopup.style.display = "none";
  supplimentPopup.style.display = "none";
  BillPopup.style.display = "none";
  staffDetailsPopup.style.display = "none";

  closeStaffPopup.addEventListener("click", () => {
    addstaffPopup.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const db = getDatabase();
  let staffsno = 0;
  let stafflist = [];
  let tbodystaff = document.getElementById("tbodystaff");

  const addSingleRecordStaff = (key, name, timing, phone, place, password) => {
    let trowStaff = document.createElement("tr");
    let td1Staff = document.createElement("td");
    let td2Staff = document.createElement("td");
    let td3Staff = document.createElement("td");
    let td4Staff = document.createElement("td");
    let td5Staff = document.createElement("td");
    let td6Staff = document.createElement("td");
    let td7Staff = document.createElement("td");
    let td8Staff = document.createElement("td"); // New td for Delete button

    let updateStaffButton = document.createElement("button");
    let deleteStaffButton = document.createElement("button"); // Create Delete button

    td1Staff.textContent = ++staffsno;
    td2Staff.innerHTML = `<input type="text" id="name-${key}" value="${name}">`;
    td3Staff.innerHTML = `<input type="text" id="timing-${key}" value="${timing}">`;
    td4Staff.innerHTML = `<input type="text" id="phone-${key}" value="${phone}">`;
    td5Staff.innerHTML = `<input type="text" id="place-${key}" value="${place}">`;
    td6Staff.innerHTML = `<input type="text" id="password-${key}" value="${password}">`;

    updateStaffButton.textContent = "Update";
    deleteStaffButton.textContent = "Delete"; // Set text for Delete button

    updateStaffButton.addEventListener("click", () => {
      const newStaffName = document.getElementById(`name-${key}`).value;
      const newStaffTiming = document.getElementById(`timing-${key}`).value;
      const newStaffPhone = document.getElementById(`phone-${key}`).value;
      const newStaffPlace = document.getElementById(`place-${key}`).value;
      const newStaffPassword = document.getElementById(`password-${key}`).value;

      updateStaffRecord(key,newStaffName,newStaffTiming,newStaffPhone, newStaffPlace, newStaffPassword );
    });

    deleteStaffButton.addEventListener("click", () => {
      deleteStaffRecord(key);
    });

    td8Staff.appendChild(deleteStaffButton);
    td7Staff.appendChild(updateStaffButton);
    trowStaff.append(td1Staff, td2Staff,td3Staff,  td4Staff, td5Staff, td6Staff,  td7Staff,  td8Staff  );
    tbodystaff.appendChild(trowStaff);
  };

  const updateStaffRecord = ( key, newStaffName, newStaffTiming,newStaffPhone,newStaffPlace, newStaffPassword) => {
    const dbRef = ref(db);
    const staffRef = child(dbRef, `newstaff/${key}`);

    update(staffRef, {
      name: newStaffName,
      timing: newStaffTiming,
      phone: newStaffPhone,
      place: newStaffPlace,
      password: newStaffPassword,
    })
      .then(() => {
        console.log("Record updated in Firebase");
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };

  const deleteStaffRecord = (key) => {
    const dbRef = ref(db);
    const staffRef = child(dbRef, `newstaff/${key}`);

    remove(staffRef)
      .then(() => {
        console.log("Record deleted from Firebase");
        selectAllStaffDataOnce(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  const selectAllStaffDataOnce = () => {
    const dbRef = ref(db);
    get(child(dbRef, "newstaff"))
      .then((snapshot) => {
        stafflist = [];
        snapshot.forEach((childSnapshot) => {
          stafflist.push({
            key: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        allStaffRecords();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const allStaffRecords = () => {
    staffsno = 0;
    tbodystaff.innerHTML = "";

    stafflist.forEach((staffs) => {
      addSingleRecordStaff(
        staffs.key,
        staffs.name,
        staffs.timing,
        staffs.phone,
        staffs.place,
        staffs.password
      );
    });
  };

  selectAllStaffDataOnce();
});

const staffDetailsButton = document.getElementById("updatestaffButton");
const staffDetailsPopup = document.getElementById("staffdetails");
const closeStaffDetailsPopup = document.getElementById("closestaffdetails");

staffDetailsButton.addEventListener("click", () => {
  staffDetailsPopup.style.display = "flex";
  addMemberPopup.style.display = "none";
  feePackagePopup.style.display = "none";
  updateMemberPopup.style.display = "none";
  dietDetailsFatPopup.style.display = "none";
  dietDetailsMediumPopup.style.display = "none";
  dietDetailsSlimPopup.style.display = "none";
  dietDetailsPopup.style.display = "none";
  supplimentPopup.style.display = "none";
  BillPopup.style.display = "none";
  addstaffPopup.style.display = "none";
  
});

closeStaffDetailsPopup.addEventListener("click", () => {
  staffDetailsPopup.style.display = "none";
});

// Function to be called on button click

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.getElementById("navbutton");
  const navpopup = document.getElementById("menubutton");
  const updateMemberButton = document.getElementById("updateMemberButton");

  navButton.addEventListener("click", () => {
    navpopup.style.left = "-1%";
    staffDetailsPopup.style.display = "none";
    addMemberPopup.style.display = "none";
    feePackagePopup.style.display = "none";
    updateMemberPopup.style.display = "none";
    dietDetailsFatPopup.style.display = "none";
    dietDetailsMediumPopup.style.display = "none";
    dietDetailsSlimPopup.style.display = "none";
    dietDetailsPopup.style.display = "none";
    supplimentPopup.style.display = "none";
    BillPopup.style.display = "none";
    addstaffPopup.style.display = "none";
  });
  addMemberButton.addEventListener("click", () => {
    navpopup.style.left = "-50%";
  });
  updateMemberButton.addEventListener("click", () => {
    navpopup.style.left = "-50%";
  });
  feePackageButton.addEventListener("click", () => {
    navpopup.style.left = "-50%";
  });
  createBillButton.addEventListener("click", () => {
    navpopup.style.left = "-50%";
  });
  supplimentButton.addEventListener("click", () => {
    navpopup.style.left = "-50%";
  });
  dietDetailsButton.addEventListener("click", () => {
    navpopup.style.left = "-50%";
  });
  staffDetailsButton.addEventListener("click",()=>{
    navpopup.style.left="-50%"
  })
  addstaffButton.addEventListener("click",()=>{
    navpopup.style.left="-50%"
  })
});
