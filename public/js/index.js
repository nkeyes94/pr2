/* eslint-disable prettier/prettier */
$(document).ready(function(){
// Get references to page elements
var $userEmail = $("#userEmail");
var $userPassword = $("#userPassword");
var $submitBtn = $("#submit");
var $loginSubmit = $("#loginSubmit");
var $exampleList = $("#example-list");
var $favoriteButton = $("#favBtn")

// The API object contains methods for each kind of request we'll make
var API = {
    saveExample: function(example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/signup",
            data: JSON.stringify(example)
        });
    },
    logExample: function(example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/login",
            data: JSON.stringify(example)
        });
    }
};


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
    event.preventDefault();
    console.log('hi');
    var example = {
        email: $userEmail.val().trim(),
        password: $userPassword.val().trim()
    };

    console.log(example);

    if (!(example.email && example.password)) {
        alert("You must enter an email and password!");
        return;
    }

    API.saveExample(example).then(function(){
        window.location.href="/profile";
    })

    $userEmail.val("");
    $userPassword.val("");
};

var handleLoginSubmit = function(event){
    event.preventDefault();
    console.log("loginHandler");
    var example = {
        email: $userEmail.val().trim(),
        password: $userPassword.val().trim()
    }

    console.log(example);

    if(!(example.email && example.password)){
        alert("Enter that junk");
        return;
    };

    API.logExample(example).then(function(){
        window.location.href="/profile";
    });

    $userEmail.val();
    $userPassword.val()
}

$loginSubmit.on("submit", function(event){
    console.log("login hi");
    event.preventDefault();
    console.log(event);
    var userData = {
        email: $userEmail.val().trim(),
        password: $userPassword.val().trim()
    };

    if(!userData.email || !userData.password){
        return;
    };

    loginUser(email, password)
    $userEmail.val("");
    $userPassword.val("");
});

function loginUser(email, password){
    $.post("/api/login", {
        email: email,
        password: password
    }).then(function(){
        window.location.replace("/profile")
    }).catch(function(err){
        console.log(err);
    })
}

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteExample(idToDelete).then(function() {
        refreshExamples();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$loginSubmit.on("click", handleLoginSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

});