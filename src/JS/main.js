document.addEventListener('DOMContentLoaded', function() {
    let url = "https://jsonplaceholder.typicode.com/users";
    let userList = document.querySelector(".user__list");
    let refreshButton = document.querySelector("#refreshButton");
    let filterInput = document.querySelector("#filterInput");
    let filterButton = document.querySelector("#filterButton");

    let usersData = [];

    function getAllUsers() {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((users) => {
                usersData = users;
                displayUsers(usersData);
            })
            .catch((err) => alert(err));
    }

    function displayUsers(users) {
        userList.innerHTML = "";
        users.forEach(user => {
            const userCard = document.createElement('li');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
                <p><span><i class="fa-solid fa-user"></i></span><a href="#">${user.name}</a></p>
                <p><span><i class="fa-solid fa-envelope"></i></span><a href="mailto:${user.email}">${user.email}</a></p>
                <p><span><i class="fa-solid fa-phone"></i></span><a href="tel:${user.phone}">${user.phone}</a></p>
            `;
            userList.appendChild(userCard);
        });
    }
    function filterUsers() {
        const searchTerm = filterInput.value.toLowerCase();
        const filteredUsers = usersData.filter(user => {
            return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
        });
        displayUsers(filteredUsers);
    }
    filterButton.addEventListener('click', filterUsers);
    getAllUsers();
    refreshButton.addEventListener('click', getAllUsers);
});


