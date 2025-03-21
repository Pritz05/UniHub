// Redirect to role selection page for login/signup
function redirectToRolePage(action) {
  localStorage.setItem("userAction", action);
  window.location.href = "role.html";
}

// Redirect to the correct form (login/signup) based on role selection
function redirectToForm(role) {
  let action = localStorage.getItem("userAction");

  if (!action) {
    alert("Please select Login or Signup first!");
    window.location.href = "basic.html";
    return;
  }

  // Admins cannot sign up
  if (role === "admin" && action === "signup") {
    alert("Admins cannot sign up. Please contact the system administrator.");
    return;
  }

  window.location.href = `${role}-${action}.html`;
}

// Handle Login and Signup Functionality
document.addEventListener("DOMContentLoaded", function () {
  ["student", "teacher", "admin"].forEach((role) => {
    let loginForm = document.getElementById(`${role}LoginForm`);

    // Handle login
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById(`${role}LoginEmail`).value;
        let password = document.getElementById(`${role}LoginPassword`).value;

        if (email && password) {
          localStorage.setItem(`${role}LoggedIn`, "true");
          window.location.href = `${role}.html`;
        } else {
          alert("Invalid login credentials!");
        }
      });
    }

    // Handle signup (only for students and teachers)
    if (role !== "admin") {
      let signupForm = document.getElementById(`${role}SignupForm`);
      if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
          event.preventDefault();
          let name = document.getElementById(`${role}Name`).value;
          let email = document.getElementById(`${role}Email`).value;
          let password = document.getElementById(`${role}Password`).value;

          if (name && email && password) {
            localStorage.setItem(`${role}LoggedIn`, "true");
            window.location.href = `${role}.html`;
          } else {
            alert("Please fill out all fields!");
          }
        });
      }
    }
  });
});

// Logout function
function logout(role) {
  localStorage.removeItem(`${role}LoggedIn`);
  window.location.href = "role.html";
}

// ========== STUDENT DASHBOARD FUNCTIONS ==========
document.addEventListener("DOMContentLoaded", function () {
  if (document.body.classList.contains("student")) {
    document.getElementById("subjects").addEventListener("click", viewSubjects);
    document
      .getElementById("attendance")
      .addEventListener("click", viewAttendance);
    document
      .getElementById("assignments")
      .addEventListener("click", viewAssignments);
    document
      .getElementById("complaints")
      .addEventListener("click", viewComplaints);
  }
});

// View Subjects
function viewSubjects() {
  window.location.href = "student-subjects.html";
}

// View Attendance
function viewAttendance() {
  window.location.href = "student-attendance.html";
}

// View Assignments
function viewAssignments() {
  window.location.href = "student-assignments.html";
}

// View Complaints
function viewComplaints() {
  window.location.href = "student-complaints.html";
}

// View Classes
function viewClasses() {
  window.location.href = "student-classes.html";
}

// Go back to Student Dashboard
function goBack() {
  window.location.href = "student.html";
}

// Handle Complaint Submission
document.addEventListener("DOMContentLoaded", function () {
  let complaintForm = document.getElementById("complaintForm");

  if (complaintForm) {
    complaintForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let complaintText = document.getElementById("complaintText").value;

      if (complaintText.trim() === "") {
        alert("Please enter a complaint.");
        return;
      }

      alert("Complaint submitted successfully!");
      document.getElementById("complaintText").value = ""; // Clear textarea
    });
  }
});

// Go back to Teacher Dashboard
function goBackToTeacher() {
  window.location.href = "teacher.html";
}

// Save Attendance Function (Mock)
function saveAttendance() {
  alert("Attendance saved successfully!");
}

// Handle Assignment Submission
document.addEventListener("DOMContentLoaded", function () {
  let assignmentForm = document.getElementById("assignmentForm");

  if (assignmentForm) {
    assignmentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let title = document.getElementById("assignmentTitle").value;
      let details = document.getElementById("assignmentDetails").value;

      if (title.trim() === "" || details.trim() === "") {
        alert("Please fill in all assignment details.");
        return;
      }

      alert("Assignment posted successfully!");
      document.getElementById("assignmentTitle").value = "";
      document.getElementById("assignmentDetails").value = "";
    });
  }
});

// Navigate to different teacher pages
function navigateTo(page) {
  window.location.href = page;
}

// Logout Function (Mock)
function logout() {
  alert("Logging out...");
  window.location.href = "role.html"; // Redirect to role page
}

// Navigate to different admin pages
function navigateTo(page) {
  window.location.href = page;
}

// Logout Function (Mock)
function logout() {
  alert("Logging out...");
  window.location.href = "role.html"; // Redirect to role page
}

// Navigate to different admin pages
function navigateTo(page) {
  window.location.href = page;
}

// Go back to Admin Dashboard
function goBackToAdmin() {
  window.location.href = "admin.html";
}

// Logout Function (Mock)
function logout() {
  alert("Logging out...");
  window.location.href = "role.html"; // Redirect to role page
}

document.addEventListener("DOMContentLoaded", function () {
  loadClasses();
});

// Function to Add Class
function addClass() {
  let className = document.getElementById("className").value.trim();
  if (className === "") {
    alert("Class name cannot be empty!");
    return;
  }

  let classes = JSON.parse(localStorage.getItem("classes")) || [];
  classes.push(className);
  localStorage.setItem("classes", JSON.stringify(classes));
  loadClasses();
  document.getElementById("className").value = ""; // Clear input
}

// Function to Load Classes
function loadClasses() {
  let classList = document.getElementById("classList");
  classList.innerHTML = "";
  let classes = JSON.parse(localStorage.getItem("classes")) || [];

  classes.forEach((className, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <span>${className}</span>
            <button onclick="editClass(${index})">Edit</button>
            <button onclick="removeClass(${index})">Remove</button>
        `;
    classList.appendChild(li);
  });
}

// Function to Edit Class
function editClass(index) {
  let classes = JSON.parse(localStorage.getItem("classes")) || [];
  let newClassName = prompt("Edit Class Name:", classes[index]);

  if (newClassName !== null && newClassName.trim() !== "") {
    classes[index] = newClassName.trim();
    localStorage.setItem("classes", JSON.stringify(classes));
    loadClasses();
  }
}

// Function to Remove Class
function removeClass(index) {
  let classes = JSON.parse(localStorage.getItem("classes")) || [];
  if (confirm("Are you sure you want to remove this class?")) {
    classes.splice(index, 1);
    localStorage.setItem("classes", JSON.stringify(classes));
    loadClasses();
  }
}

// Function to Go Back to Admin Dashboard
function goBackToAdmin() {
  window.location.href = "admin.html";
}

document.addEventListener("DOMContentLoaded", function () {
  loadSubjects();
});

// Function to Add Subject
function addSubject() {
  let subjectName = document.getElementById("subjectName").value.trim();
  if (subjectName === "") {
    alert("Subject name cannot be empty!");
    return;
  }

  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  subjects.push(subjectName);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  loadSubjects();
  document.getElementById("subjectName").value = ""; // Clear input
}

// Function to Load Subjects
function loadSubjects() {
  let subjectList = document.getElementById("subjectList");
  subjectList.innerHTML = "";
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

  subjects.forEach((subjectName, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <span>${subjectName}</span>
            <button onclick="editSubject(${index})">Edit</button>
            <button onclick="removeSubject(${index})">Remove</button>
        `;
    subjectList.appendChild(li);
  });
}

// Function to Edit Subject
function editSubject(index) {
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  let newSubjectName = prompt("Edit Subject Name:", subjects[index]);

  if (newSubjectName !== null && newSubjectName.trim() !== "") {
    subjects[index] = newSubjectName.trim();
    localStorage.setItem("subjects", JSON.stringify(subjects));
    loadSubjects();
  }
}

// Function to Remove Subject
function removeSubject(index) {
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  if (confirm("Are you sure you want to remove this subject?")) {
    subjects.splice(index, 1);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    loadSubjects();
  }
}

// Function to Go Back to Admin Dashboard
function goBackToAdmin() {
  window.location.href = "admin.html";
}

document.addEventListener("DOMContentLoaded", function () {
  loadTeachers();
});

// ✅ Store Teachers Locally
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

// ✅ Load Teachers from Local Storage
function loadTeachers() {
  let teacherTable = document.getElementById("teacherTable");
  teacherTable.innerHTML = ""; // Clear existing data

  teachers.forEach((teacher, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>
                <button class="delete-btn" onclick="deleteTeacher(${index})">❌ Remove</button>
            </td>
        `;
    teacherTable.appendChild(row);
  });

  // Save to local storage
  localStorage.setItem("teachers", JSON.stringify(teachers));
}

// ✅ Add Teacher Locally
function addTeacher() {
  const name = document.getElementById("teacherName").value.trim();
  const subject = document.getElementById("teacherSubject").value.trim();

  if (name === "" || subject === "") {
    alert("Please enter both Name and Subject.");
    return;
  }

  teachers.push({ name, subject });
  localStorage.setItem("teachers", JSON.stringify(teachers));
  loadTeachers(); // Refresh list

  alert("✅ Teacher Added Successfully!");
  document.getElementById("teacherName").value = "";
  document.getElementById("teacherSubject").value = "";
}

// ✅ Remove Teacher Locally
function deleteTeacher(index) {
  if (!confirm("Are you sure you want to remove this teacher?")) return;

  teachers.splice(index, 1);
  localStorage.setItem("teachers", JSON.stringify(teachers));
  loadTeachers(); // Refresh list

  alert("✅ Teacher Removed Successfully!");
}

// ✅ Event Listener for Adding Teacher
document.getElementById("addTeacherBtn").addEventListener("click", addTeacher);

document.getElementById("complaintForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the CKEditor content
    const complaintText = CKEDITOR.instances.complaintText.getData();

    if (complaintText.trim() === "") {
        alert("Please enter a complaint before submitting.");
        return;
    }

    // Here you can send the complaintText to the backend (if needed)
    console.log("Complaint Submitted:", complaintText);

    alert("Complaint submitted successfully!");

    // Clear CKEditor content after submission
    CKEDITOR.instances.complaintText.setData("");
});

