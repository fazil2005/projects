// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, child, get, set, push, update, remove } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnbX2WB8hpxd46wPlop0aXMsU4bVqcAZc",
    authDomain: "teacherstudentbooking.firebaseapp.com",
    databaseURL: "https://teacherstudentbooking-default-rtdb.firebaseio.com",
    projectId: "teacherstudentbooking",
    storageBucket: "teacherstudentbooking.appspot.com",
    messagingSenderId: "704160360811",
    appId: "1:704160360811:web:f221415bf3f71ac805442e",
    measurementId: "G-Q5WXBMHL3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// References
const addTeacherDB = ref(db, 'addTeacher');
const tbody = document.getElementById("tbodytr");
const successPopup = document.getElementById("successPopup");
const successOkayButton = document.querySelector(".buttonokay");
const mainButtonMenu = document.getElementById("menubuttons");
const addTeacherPopup = document.getElementById("adminaddrow");
const updateOrDeleteTeacherPopup = document.getElementById("adminupdatedeletetrrow");
const studentRegistrationPopup = document.getElementById("studentsregistrationsrow");

// Event Listeners
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("addTeacherButton").addEventListener("click", () => {
        addTeacherPopup.style.display = 'flex';
        mainButtonMenu.style.display = "none";
    });

    document.getElementById("closeButton").addEventListener("click", () => {
        addTeacherPopup.style.display = "none";
        mainButtonMenu.style.display = "flex";
    });

    document.getElementById("updateOrDeleteTeacherButton").addEventListener("click", async () => {
        mainButtonMenu.style.display = "none";
        updateOrDeleteTeacherPopup.style.display = "block";
        await selectDataOnce(); // Ensure data is loaded when opening update/delete section
    });

    document.getElementById("closeButton2").addEventListener("click", () => {
        updateOrDeleteTeacherPopup.style.display = "none";
        mainButtonMenu.style.display = "flex";
    });

    document.getElementById("studentsRegistrationButton").addEventListener("click", () => {
        mainButtonMenu.style.display = "none";
        studentRegistrationPopup.style.display = "flex";
        loadPendingStudents();
    });

    document.getElementById("studentRegClose").addEventListener("click", () => {
        studentRegistrationPopup.style.display = "none";
        mainButtonMenu.style.display = "flex";
    });

    // add teacher///

    document.getElementById("addTeacherForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const TeacherName = document.getElementById("TeacherName").value;
        const TeacherSubject = document.getElementById("Subject").value;
        const TeacherAge = document.getElementById("TeacherAge").value;
        const TeacherPhone = document.getElementById("TeacherPhone").value;
        const TeacherPassword = document.getElementById("TeacherPassword").value;

        try {
            await SaveMessages(TeacherName, TeacherSubject, TeacherAge, TeacherPhone, TeacherPassword);
            e.target.reset();
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });
});

async function SaveMessages(TeacherName, TeacherSubject, TeacherAge, TeacherPhone, TeacherPassword) {
    try {
        const newTeacherDetails = push(addTeacherDB);
        await set(newTeacherDetails, {
            TeacherName,
            TeacherSubject,
            TeacherAge,
            TeacherPhone,
            TeacherPassword
        });
        console.log('Teacher added successfully');
        addTeacherPopup.style.display = "none";
        successPopup.style.display = "flex";
    } catch (error) {
        console.error("Error saving message:", error);
    }
}

successOkayButton.addEventListener("click", () => {
    successPopup.style.display = "none";
    mainButtonMenu.style.display = "flex";
});

async function selectDataOnce() {
    try {
        const snapshot = await get(child(ref(db), 'addTeacher'));
        const teacherList = [];
        snapshot.forEach((childSnapshot) => {
            teacherList.push({
                key: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        console.log('Fetched teacherList:', teacherList);
        allRecords(teacherList);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function allRecords(teacherList) {
    tbody.innerHTML = '';
    teacherList.forEach((teacher, index) => {
        addSingleRecord(teacher.key, teacher.TeacherName, teacher.TeacherSubject, teacher.TeacherAge, teacher.TeacherPhone, teacher.TeacherPassword, index + 1);
    });

    // No need to bind event handlers here; they will be bound inside addSingleRecord
}

async function updateRecord(key, newTeacherName, newTeacherSubject, newTeacherAge, newTeacherPhone, newTeacherPassword) {
    try {
        const teacherRef = ref(db, `addTeacher/${key}`);
        await update(teacherRef, {
            TeacherName: newTeacherName,
            TeacherSubject: newTeacherSubject,
            TeacherAge: newTeacherAge,
            TeacherPhone: newTeacherPhone,
            TeacherPassword: newTeacherPassword
        });

        console.log("Record updated in Firebase");
    } catch (error) {
        console.error("Error updating record:", error);
    }
}

async function deleteRecord(key) {
    try {
        const teacherRef = ref(db, `addTeacher/${key}`);
        await remove(teacherRef);

        console.log("Record deleted from Firebase");
        await selectDataOnce();
    } catch (error) {
        console.error("Error deleting record:", error);
    }
}

function addSingleRecord(key, TeacherName, TeacherSubject, TeacherAge, TeacherPhone, TeacherPassword, sno) {
    const trow = document.createElement("tr");

    trow.innerHTML = `
        <td>${sno}</td>
        <td><input type="text" id="TeacherName-${key}" value="${TeacherName}"></td>
        <td><input type="text" id="TeacherSubject-${key}" value="${TeacherSubject}"></td>
        <td><input type="text" id="TeacherAge-${key}" value="${TeacherAge}"></td>
        <td><input type="text" id="TeacherPhone-${key}" value="${TeacherPhone}"></td>
        <td><input type="text" id="TeacherPassword-${key}" value="${TeacherPassword}"></td>
        <td><button class="update-btn" data-key="${key}">Update</button></td>
        <td><button class="delete-btn" data-key="${key}">Delete</button></td>
    `;

    tbody.appendChild(trow);

    // Bind update and delete buttons here
    trow.querySelector(".update-btn").addEventListener("click", async () => {
        const newTeacherName = document.getElementById(`TeacherName-${key}`).value;
        const newTeacherSubject = document.getElementById(`TeacherSubject-${key}`).value;
        const newTeacherAge = document.getElementById(`TeacherAge-${key}`).value;
        const newTeacherPhone = document.getElementById(`TeacherPhone-${key}`).value;
        const newTeacherPassword = document.getElementById(`TeacherPassword-${key}`).value;

        try {
            await updateRecord(key, newTeacherName, newTeacherSubject, newTeacherAge, newTeacherPhone, newTeacherPassword);
            await selectDataOnce(); // Refresh the list after update
        } catch (error) {
            console.error("Error updating record:", error);
        }
    });

    trow.querySelector(".delete-btn").addEventListener("click", async () => {
        const key = trow.querySelector(".delete-btn").getAttribute("data-key");

        try {
            await deleteRecord(key);
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    });
}

async function loadPendingStudents() {
    try {
        const pendingStudentsRef = ref(db, 'pendingStudents');
        const snapshot = await get(pendingStudentsRef);
        const list = document.getElementById('pendingList');

        if (snapshot.exists()) {
            list.innerHTML = ''; // Clear any existing content
            snapshot.forEach(childSnapshot => {
                const student = childSnapshot.val();
                const studentId = childSnapshot.key;
                const listItem = document.createElement('li');
                listItem.innerHTML = `STUDENTNAME : "${student.name}"
                    <button class="studentbutton" onclick="approveStudents('${studentId}')">Approve</button>`;
                list.appendChild(listItem);
            });
        } else {
            list.innerHTML = '<p class="pending">No pending students.</p>';
        }
    } catch (error) {
        console.error("Error loading pending students:", error);
    }
}

window.approveStudents = async function(studentId) {
    console.log(`approveStudents called for studentId: ${studentId}`);
    try {
        const studentRef = ref(db, 'pendingStudents/' + studentId);
        const snapshot = await get(studentRef);

        if (snapshot.exists()) {
            const studentData = snapshot.val();
            console.log('Student data:', studentData);

            // Move student to approvedStudents
            await set(ref(db, `approvedStudents/${studentId}`), studentData);

            // Remove student from pendingStudents
            await remove(studentRef);

            console.log(`Student ${studentId} approved and moved to approvedStudents.`);
            await loadPendingStudents();
        } else {
            console.log(`Student ${studentId} not found in pendingStudents.`);
        }
    } catch (error) {
        console.error("Error approving student:", error);
    }
};



// login student//


// Function to authenticate a student
const authenticateStudent = (username, password) => {
    const dbref = ref(db);
    const studentRef = child(dbref, 'approvedStudents');

    get(studentRef)
        .then((snapshot) => {
            let isAuthenticated = false; // Fixed variable name for readability
            snapshot.forEach((studentSnapshot) => {
                const studentData = studentSnapshot.val();

                if (studentData.name === username && studentData.password === password) {
                    isAuthenticated = true; // Updated to correct variable
                    // Redirect only if authentication is successful
                    window.location.href = "studentpage.html";
                    return;
                }
            });

            if (!isAuthenticated) { // Fixed variable name here
                document.getElementById("errorstudent").textContent = "Invalid username or password";
            }
        })
        .catch((error) => {
            console.error("Error fetching student data:", error); // Updated log message for clarity
        });
}

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("studentLogin");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("studentregname").value;
        const password = document.getElementById("studentregpassword").value;

        authenticateStudent(username, password);
    });
});
