// const API_URL = 'http://localhost:8000';

// // Theme toggle functionality
// document.getElementById('theme-toggle').addEventListener('change', function() {
//     document.body.classList.toggle('light-theme');
//     // Note: You would need to add light theme CSS variables if you want a full theme switcher
// });

// // Load users when page loads
// document.addEventListener('DOMContentLoaded', () => {
//     fetchUsers();
// });

// // Fetch all users
// async function fetchUsers() {
//     try {
//         const response = await fetch(`${API_URL}/users/`);
//         if (!response.ok) throw new Error('Failed to fetch users');
        
//         const usersData = await response.json();
//         const users = Object.values(usersData);
        
//         const usersList = document.getElementById('users-list');
//         usersList.innerHTML = '';
        
//         if (users.length === 0) {
//             usersList.innerHTML = `
//                 <div class="empty-state">
//                     <i class="fas fa-user-friends"></i>
//                     <p>No users found</p>
//                     <button class="secondary" onclick="fetchUsers()"><i class="fas fa-sync-alt"></i> Refresh</button>
//                 </div>
//             `;
//             return;
//         }
        
//         users.forEach(user => {
//             const userCard = document.createElement('div');
//             userCard.className = 'card fade-in';
//             userCard.innerHTML = `
//                 <h3>${user.username}</h3>
//                 <p>${user.email}</p>
//                 <div class="card-meta">
//                     <span>ID: ${user.id}</span>
//                 </div>
//                 <div class="card-actions">
//                     <button class="secondary" onclick="fetchUserTasks('${user.id}')"><i class="fas fa-tasks"></i> View Tasks</button>
//                     <button class="danger" onclick="deleteUser('${user.id}')"><i class="fas fa-trash"></i> Delete</button>
//                 </div>
//             `;
//             usersList.appendChild(userCard);
//         });
        
//         populateUserSelect(users);
        
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to load users. Please try again.',
//         });
//     }
// }

// // Populate user dropdown
// function populateUserSelect(users) {
//     const select = document.getElementById('user-select');
//     select.innerHTML = '<option value="">Select User</option>';
    
//     users.forEach(user => {
//         const option = document.createElement('option');
//         option.value = user.id;
//         option.textContent = user.username;
//         select.appendChild(option);
//     });
// }

// // Create a new user
// async function createUser() {
//     const username = document.getElementById('username').value.trim();
//     const email = document.getElementById('email').value.trim();
    
//     if (!username || !email) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Validation Error',
//             text: 'Please fill in all fields',
//         });
//         return;
//     }
    
//     try {
//         const response = await fetch(`${API_URL}/users/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username,
//                 email
//             }),
//         });
        
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || 'Failed to create user');
//         }
        
//         Swal.fire({
//             icon: 'success',
//             title: 'Success',
//             text: 'User created successfully!',
//         });
        
//         document.getElementById('username').value = '';
//         document.getElementById('email').value = '';
        
//         fetchUsers();
        
//     } catch (error) {
//         console.error('Error creating user:', error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: error.message || 'Failed to create user',
//         });
//     }
// }

// // Create a new task
// async function createTask() {
//     const userId = document.getElementById('user-select').value;
//     const title = document.getElementById('task-title').value.trim();
//     const description = document.getElementById('task-desc').value.trim();
//     const dueDate = document.getElementById('task-due').value;
    
//     if (!userId || !title || !dueDate) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Validation Error',
//             text: 'Please select a user and fill in required fields',
//         });
//         return;
//     }
    
//     try {
//         const response = await fetch(`${API_URL}/tasks/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title,
//                 description,
//                 due_date: dueDate,
//                 status: 'pending',
//                 user_id: userId
//             }),
//         });
        
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || 'Failed to create task');
//         }
        
//         Swal.fire({
//             icon: 'success',
//             title: 'Success',
//             text: 'Task created successfully!',
//         });
        
//         document.getElementById('task-title').value = '';
//         document.getElementById('task-desc').value = '';
//         document.getElementById('task-due').value = '';
        
//         fetchUserTasks(userId);
        
//     } catch (error) {
//         console.error('Error creating task:', error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: error.message || 'Failed to create task',
//         });
//     }
// }

// // Fetch tasks for a specific user
// async function fetchUserTasks(userId = null) {
//     if (!userId) {
//         userId = document.getElementById('user-select').value;
//         if (!userId) return;
//     }
    
//     try {
//         const response = await fetch(`${API_URL}/users/${userId}/tasks`);
//         if (!response.ok) throw new Error('Failed to fetch tasks');
        
//         const tasks = await response.json();
        
//         const tasksList = document.getElementById('tasks-list');
//         tasksList.innerHTML = '';
        
//         if (tasks.length === 0) {
//             tasksList.innerHTML = `
//                 <div class="empty-state">
//                     <i class="fas fa-clipboard-list"></i>
//                     <p>No tasks found for this user</p>
//                     <button class="secondary" onclick="fetchUserTasks('${userId}')"><i class="fas fa-sync-alt"></i> Refresh</button>
//                 </div>
//             `;
//             return;
//         }
        
//         tasks.forEach(task => {
//             const taskCard = document.createElement('div');
//             taskCard.className = 'card fade-in';
//             taskCard.innerHTML = `
//                 <h3>${task.title}</h3>
//                 <p>${task.description || 'No description provided'}</p>
//                 <div class="card-meta">
//                     <span>Due: ${task.due_date}</span>
//                     <span class="status ${task.status}">${task.status.replace('_', ' ')}</span>
//                 </div>
//                 <div class="card-actions">
//                     <select id="status-${task.id}" onchange="updateTaskStatus('${task.id}', this.value)" class="status-select">
//                         <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
//                         <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
//                         <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
//                         <option value="cancelled" ${task.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
//                     </select>
//                     <button class="danger" onclick="deleteTask('${task.id}')"><i class="fas fa-trash"></i></button>
//                 </div>
//             `;
//             tasksList.appendChild(taskCard);
//         });
        
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to load tasks. Please try again.',
//         });
//     }
// }

// // Update task status
// async function updateTaskStatus(taskId, newStatus) {
//     try {
//         const response = await fetch(`${API_URL}/tasks/${taskId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 new_status: newStatus  // Match the backend expectation
//             }),
//         });
        
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || 'Failed to update task status');
//         }
        
//         // Update the UI
//         const statusElement = document.querySelector(`#status-${taskId}`).parentElement.querySelector('.status');
//         statusElement.className = `status ${newStatus}`;
//         statusElement.textContent = newStatus.replace('_', ' ');
        
//         // Show success message
//         Swal.fire({
//             icon: 'success',
//             title: 'Status Updated',
//             text: `Task status changed to ${newStatus}`,
//             timer: 2000,
//             showConfirmButton: false
//         });
        
//     } catch (error) {
//         console.error('Error updating task status:', error);
        
//         // Show actual error message instead of [object Object]
//         Swal.fire({
//             icon: 'error',
//             title: 'Update Failed',
//             text: error.message || 'Failed to update task status',
//         });
        
//         // Revert the select to previous value
//         const select = document.getElementById(`status-${taskId}`);
//         const previousStatus = select.dataset.previousValue;
//         if (previousStatus) {
//             select.value = previousStatus;
//         }
//     }
// }



// // Delete a user
// async function deleteUser(userId) {
//     const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     });
    
//     if (!result.isConfirmed) return;
    
//     try {
//         const response = await fetch(`${API_URL}/users/${userId}`, {
//             method: 'DELETE',
//         });
        
//         if (!response.ok) {
//             throw new Error('Failed to delete user');
//         }
        
//         Swal.fire(
//             'Deleted!',
//             'User has been deleted.',
//             'success'
//         );
        
//         fetchUsers();
        
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to delete user',
//         });
//     }
// }

// // Delete a task
// async function deleteTask(taskId) {
//     const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     });
    
//     if (!result.isConfirmed) return;
    
//     try {
//         const response = await fetch(`${API_URL}/tasks/${taskId}`, {
//             method: 'DELETE',
//         });
        
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || 'Failed to delete task');
//         }
        
//         Swal.fire(
//             'Deleted!',
//             'Task has been deleted.',
//             'success'
//         );
        
//         // Remove the task card from UI
//         const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
//         if (taskCard) {
//             taskCard.classList.add('fade-out');
//             setTimeout(() => taskCard.remove(), 300);
//         }
        
//     } catch (error) {
//         console.error('Error deleting task:', error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: error.message || 'Failed to delete task',
//         });
//     }
// }

// document.querySelectorAll('.status-select').forEach(select => {
//     select.dataset.previousValue = select.value;
//     select.addEventListener('change', function() {
//         this.dataset.previousValue = this.value;
//         updateTaskStatus(this.id.replace('status-', ''), this.value);
//     });
// });
