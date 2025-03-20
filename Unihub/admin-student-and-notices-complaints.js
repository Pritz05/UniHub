document.addEventListener("DOMContentLoaded", function () {
    loadStudents();
});

// ✅ Get Students from Local Storage or Start with an Empty Array
let students = JSON.parse(localStorage.getItem("students")) || [];

// ✅ Load Students from Local Storage
function loadStudents() {
    let studentTable = document.getElementById("studentTable");
    let noStudentsMsg = document.getElementById("noStudentsMsg");

    studentTable.innerHTML = ""; // Clear existing data

    if (students.length === 0) {
        noStudentsMsg.style.display = "block"; // Show "No Students" message
    } else {
        noStudentsMsg.style.display = "none"; // Hide message
    }

    students.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>
                <button class="delete-btn" onclick="deleteStudent(${index})">❌ Remove</button>
            </td>
        `;
        studentTable.appendChild(row);
    });

    // Save to local storage
    localStorage.setItem("students", JSON.stringify(students));
}

// ✅ Add Student
function addStudent() {
    const name = document.getElementById("studentName").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();

    if (name === "" || studentClass === "") {
        alert("⚠️ Please enter both Name and Class.");
        return;
    }

    students.push({ name, class: studentClass });
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents(); // Refresh list

    alert("✅ Student Added Successfully!");
    document.getElementById("studentName").value = "";
    document.getElementById("studentClass").value = "";
}

// ✅ Remove Student
function deleteStudent(index) {
    if (!confirm("Are you sure you want to remove this student?")) return;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents(); // Refresh list

    alert("✅ Student Removed Successfully!");
}

// ✅ Attach Event Listener After Page Loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addStudentBtn").addEventListener("click", addStudent);
});


// Function to Go Back to Admin Dashboard
function goBackToAdmin() {
    window.location.href = "admin.html";
}


document.addEventListener("DOMContentLoaded", function () {
    loadNotices();
});

// ✅ Get Notices from Local Storage or Start with an Empty Array
let notices = JSON.parse(localStorage.getItem("notices")) || [];

// ✅ Load Notices from Local Storage
function loadNotices() {
    let noticeTable = document.getElementById("noticeTable");
    let noNoticesMsg = document.getElementById("noNoticesMsg");

    noticeTable.innerHTML = ""; // Clear existing data

    if (notices.length === 0) {
        noNoticesMsg.style.display = "block"; // Show "No Notices" message
    } else {
        noNoticesMsg.style.display = "none"; // Hide message
    }

    notices.forEach((notice, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${notice.title}</td>
            <td>${notice.content}</td>
            <td>
                <button class="delete-btn" onclick="deleteNotice(${index})">❌ Remove</button>
            </td>
        `;
        noticeTable.appendChild(row);
    });

    // Save to local storage
    localStorage.setItem("notices", JSON.stringify(notices));
}

// ✅ Add Notice
function addNotice() {
    const title = document.getElementById("noticeTitle").value.trim();
    const content = document.getElementById("noticeContent").value.trim();

    if (title === "" || content === "") {
        alert("⚠️ Please enter both Title and Content.");
        return;
    }

    notices.push({ title, content });
    localStorage.setItem("notices", JSON.stringify(notices));
    loadNotices(); // Refresh list

    alert("✅ Notice Added Successfully!");
    document.getElementById("noticeTitle").value = "";
    document.getElementById("noticeContent").value = "";
}

// ✅ Remove Notice
function deleteNotice(index) {
    if (!confirm("Are you sure you want to remove this notice?")) return;

    notices.splice(index, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    loadNotices(); // Refresh list

    alert("✅ Notice Removed Successfully!");
}

// ✅ Attach Event Listener After Page Loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addNoticeBtn").addEventListener("click", addNotice);
});


// Function to handle complaint submission
document.getElementById("complaintForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let complaintText = document.getElementById("complaintText").value.trim();

    if (complaintText === "") return;

    let complaintsList = document.getElementById("complaintsList");
    let newRow = complaintsList.insertRow();
    
    let idCell = newRow.insertCell(0);
    let userCell = newRow.insertCell(1);
    let roleCell = newRow.insertCell(2);
    let complaintCell = newRow.insertCell(3);
    let actionCell = newRow.insertCell(4);

    idCell.textContent = complaintsList.rows.length;
    userCell.textContent = "Anonymous";  // Replace with actual user data when integrating
    roleCell.textContent = "Student";   // Replace with actual role data when integrating
    complaintCell.textContent = complaintText;
    
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function() { deleteComplaint(this); };
    actionCell.appendChild(deleteButton);

    document.getElementById("complaintText").value = "";
    document.getElementById("noComplaintsMsg").style.display = "none";
});

// Function to delete a complaint
function deleteComplaint(button) {
    let row = button.parentElement.parentElement;
    row.remove();

    let complaintsList = document.getElementById("complaintsList");
    if (complaintsList.rows.length === 0) {
        document.getElementById("noComplaintsMsg").style.display = "block";
    }
}

// Function to go back to the previous page
function goBackToAdmin() {
    window.location.href = "admin.html";
}